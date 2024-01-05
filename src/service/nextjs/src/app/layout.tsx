import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode, useContext } from "react";
import "./globals.css";
import "./font.css";
import style from "@/style/app/layout.module.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ContextProviders from "@/context";
import Device from "./device";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "아니 근데 오늘 진짜",
    description: "AI 대화형 일기 서비스",
};

export default function RootLayout(props: { children: ReactNode }) {
    const { children } = props;

    return (
        <html lang="en">
            <body className={inter.className}>
                <ContextProviders>
                    <Device>{children}</Device>
                </ContextProviders>
            </body>
        </html>
    );
}
