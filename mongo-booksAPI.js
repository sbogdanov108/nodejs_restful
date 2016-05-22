
/** books indexes **/
db.getCollection("books").ensureIndex({
  "_id": NumberInt(1)
},[
  
]);

/** books records **/
db.getCollection("books").insert({
  "_id": ObjectId("57415685f2d9560019000029"),
  "title": "The Lightning Thief",
  "author": "Rick Riordan",
  "genre": "fantasy",
  "read": true
});
db.getCollection("books").insert({
  "_id": ObjectId("57415695f2d956001900002a"),
  "title": "The Sea of Monsters",
  "author": "Rick Riordan",
  "genre": "fantasy",
  "read": true
});
db.getCollection("books").insert({
  "_id": ObjectId("57415703f2d9568424000029"),
  "title": "Анна Каренина",
  "genre": "Художественный роман",
  "author": "Лев Николаевич Толстой",
  "read": false
});
db.getCollection("books").insert({
  "_id": ObjectId("5741571bf2d956842400002a"),
  "title": "Путешествие к Центру Земли",
  "genre": "Фантастика",
  "author": "Жюль Верн",
  "read": false
});
db.getCollection("books").insert({
  "_id": ObjectId("57415f78464d13702e64f471"),
  "title": "Книга",
  "genre": "Фантастика",
  "author": "Жюль Верн",
  "read": true,
  "__v": NumberInt(0)
});
db.getCollection("books").insert({
  "_id": ObjectId("5741a228357bea4813682d54"),
  "title": "Преступление и наказание",
  "genre": "Художественный роман",
  "author": "Фёдор Михайлович Достоевский",
  "read": false,
  "__v": NumberInt(0)
});
