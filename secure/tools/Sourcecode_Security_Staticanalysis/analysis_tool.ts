// MongoDB 쿼리 및 인증 문제 검사: MongoDB 쿼리 또는 인증 관련 코드를 찾아, 보안 문제가 발생할 수 있는 부분을 찾기
// Nosql Injection 검사: NoSQL 쿼리에서 발생할 수 있는 인젝션 공격을 찾아, 보안 문제가 발생할 수 있는 부분을 찾기
// 미사용 변수 검사: 선언되었지만 사용되지 않는 변수를 찾기
// 매직 넘버 검사: 코드 내에서 직접 사용된 숫자 리터럴(상수)를 찾아, 상수로 대체할 것을 권장
// 암시적 any 검사: 명시적인 타입 선언 없이 파라미터가 any 타입으로 암시적으로 사용되는 경우를 찾기

import * as ts from "typescript";
import * as fs from "fs";
import * as path from "path";

class CodeAnalyzer {
  private static readSourceFile(filePath: string): ts.SourceFile {
    const fileContent = fs.readFileSync(filePath, "utf8");
    return ts.createSourceFile(filePath, fileContent, ts.ScriptTarget.ESNext, true);
  }

  private static analyzeSourceFile(sourceFile: ts.SourceFile): string[] {
    let issues: string[] = [];
    issues = issues.concat(this.detectNoSQLInjection(sourceFile));
    issues = issues.concat(this.detectMongoDBIssues(sourceFile));
    issues = issues.concat(this.checkForUnusedVariables(sourceFile));
    issues = issues.concat(this.checkForMagicNumbers(sourceFile));
    issues = issues.concat(this.checkForImplicitAny(sourceFile));
    return issues;
  }

  private static detectNoSQLInjection(sourceFile: ts.SourceFile): string[] {
    const issues: string[] = [];
    const fileContent = sourceFile.getFullText();
    const injectionPatterns = [
      /\$where\s*:/g,
      /\$ne\s*:/g,
      /\$regex\s*:/g,
      /\$expr\s*:/g,
      /\$mod\s*:/g,
      /\$text\s*:/g,
      /\$geoWithin\s*:/g,
      /\$geoIntersects\s*:/g,
      /\$near\s*:/g,
      /\$nearSphere\s*:/g,
      /\$all\s*:/g,
      /\$elemMatch\s*:/g,
      /\$size\s*:/g,
      /\$type\s*:/g,
      /\$not\s*:/g,
      /\$nor\s*:/g,
      /\$exists\s*:/g,
      /\$in\s*:/g,
    ];

    injectionPatterns.forEach((pattern) => {
      if (pattern.test(fileContent)) {
        issues.push(
          `[${sourceFile.fileName}] Potential NoSQL Injection detected using pattern ${pattern}.`
        );
      }
    });
    return issues;
  }

  private static detectMongoDBIssues(sourceFile: ts.SourceFile): string[] {
    const issues: string[] = [];
    const fileContent = sourceFile.getFullText();

    const queryPatterns = [
      /(db\.|collection\.).*\.(find|insertOne|insertMany|updateOne|updateMany|deleteOne|deleteMany)\s*\(/g,
      /mongoClient\.connect\('mongodb:\/\/username:password@localhost:27017\/database'\)/,
    ];

    const validationPatterns = [
      /\bfind|insertOne|insertMany|updateOne|updateMany|deleteOne|deleteMany\b.*\)/g,
    ];

    queryPatterns.forEach((pattern) => {
      if (pattern.test(fileContent)) {
        issues.push(
          `[${sourceFile.fileName}] Potential MongoDB query/authentication issues detected.`
        );
      }
    });

    validationPatterns.forEach((pattern) => {
      const queryMatches = fileContent.matchAll(pattern);
      const matchesArray = Array.from(queryMatches);
      for (const match of matchesArray) {
        if (!match[0].includes("validate") && !match[0].includes("sanitize")) {
          issues.push(
            `[${sourceFile.fileName}] No input validation/sanitization in MongoDB operation: ${match[0]}`
          );
        }
      }
    });

    return issues;
  }

  private static checkForUnusedVariables(sourceFile: ts.SourceFile): string[] {
    const issues: string[] = [];
    const delcarations: ts.Identifier[] = [];
    const usages: ts.Identifier[] = [];

    function collectNode(node: ts.Node) {
      if (ts.isVariableDeclaration(node) && node.name.kind === ts.SyntaxKind.Identifier) {
        delcarations.push(node.name);
      }
      if (ts.isIdentifier(node)) {
        usages.push(node);
      }
    }

    sourceFile.forEachChild((node) => ts.forEachChild(node, collectNode));

    const usedNames = new Set(usages.map((node) => node.text));
    delcarations.forEach((decl) => {
      if (!usedNames.has(decl.text)) {
        issues.push(
          `[${sourceFile.fileName}] Unused variable '${decl.text}' at ${decl.getStart(
            sourceFile
          )}:${decl.getEnd()}`
        );
      }
    });

    return issues;
  }

  private static checkForMagicNumbers(sourceFile: ts.SourceFile): string[] {
    const issues: string[] = [];

    function checkNode(node: ts.Node) {
      if (ts.isNumericLiteral(node) && !node.parent) {
        issues.push(
          `[${sourceFile.fileName}] Magic number '${node.text}' at ${node.getStart(
            sourceFile
          )}:${node.getEnd()}`
        );
      }
    }

    sourceFile.forEachChild((node) => ts.forEachChild(node, checkNode));
    return issues;
  }

  private static checkForImplicitAny(sourceFile: ts.SourceFile): string[] {
    const issues: string[] = [];

    function checkNode(node: ts.Node) {
      if (ts.isParameter(node) && !node.type) {
        issues.push(
          `[${
            sourceFile.fileName
          }] Parameter '${node.name.getText()}' implicitly has an 'any' type at ${node.getStart(
            sourceFile
          )}:${node.getEnd()}`
        );
      }
    }

    sourceFile.forEachChild((node) => ts.forEachChild(node, checkNode));
    return issues;
  }

  public static analyzeFoldersAndSaveResults(folders: string[], outputFileName: string) {
    const allIssues: string[] = [];

    folders.forEach((folder) => {
      this.findAllTSFiles(folder).forEach((file) => {
        const sourceFile = this.readSourceFile(file);
        const issues = this.analyzeSourceFile(sourceFile);
        if (issues.length) {
          allIssues.push(`${file}:\n${issues.join("\n")}`);
        }
      });
    });

    if (allIssues.length) {
      fs.writeFileSync(outputFileName, allIssues.join("\n"), "utf8");
      console.log(`Issues were saved to ${outputFileName}`);
    } else {
      console.log("No issues found.");
    }
  }

  private static findAllTSFiles(dir: string, allFiles: string[] = []): string[] {
    fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
      const entryPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        this.findAllTSFiles(entryPath, allFiles);
      } else if (entry.isFile() && entry.name.endsWith(".ts")) {
        allFiles.push(entryPath);
      }
    });
    return allFiles;
  }
}

const foldersToAnalyze = ["./nestjs", "./nextjs"]; // target folders
const resultsFileName = "analysis_results.txt";
CodeAnalyzer.analyzeFoldersAndSaveResults(foldersToAnalyze, resultsFileName);
