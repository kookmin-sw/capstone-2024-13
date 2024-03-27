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
  var createdAt, updatedAt;
  
  createdAt = updatedAt = new Date();
  var user = db.users.insertOne({ nickname, email, createdAt, updatedAt });
  var userId = user.insertedId;

  for (let j = 0; j < 10; j++) {
	var title = "title0" + j;
	var content = "content0" + j;

	createdAt = updatedAt = new Date();
    db.diaries.insertOne({ userId, title, content, createdAt, updatedAt });
  }
}
  
EOF