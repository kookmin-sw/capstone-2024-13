set -e

mongosh << EOF

use $MONGO_INITDB_DATABASE
db.createUser({
  user:  '$MONGO_INITDB_ROOT_USERNAME',
  pwd: '$MONGO_INITDB_ROOT_PASSWORD',
  roles: [{
    role: 'readWrite',
    db: '$MONGO_INITDB_DATABASE'
  }]
})

for (let i = 0; i < 100; i++) {
  var id = (i < 10) ? "0" + i : i;
  var nickname = "test" + id;
  var email = nickname + "@test.com";
  var profileImageId = null;

  var diaries = [];
  for (let j = 0; j < 10; j++) {
	var title = "title0" + j;
	var content = "content0" + j;
	var createdAt, updatedAt;
	createdAt = updatedAt = new Date();
    var diary = db.diaries.insertOne({ title, content, createdAt, updatedAt });
	diaries.push(diary.insertedId);
  }
  var createdAt, updatedAt;
  createdAt = updatedAt = new Date();
  db.users.insertOne({ nickname, email, profileImageId, diaries, createdAt, updatedAt });
}
  
EOF