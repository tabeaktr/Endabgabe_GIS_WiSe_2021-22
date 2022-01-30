"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//server.js muss mit Node.js ausgeführt werden, Aufbau dieser Seite basiert auf einer Teilaufgabe aus dem letzten Semester (Aufgabe_3.4)
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
const mongoUrl = "mongodb+srv://User3:Ananas123@tabea.fzpsx.mongodb.net/tabea";
let contentCollection;
let port = Number(process.env.PORT);
if (!port)
    port = 8100;
console.log("Starting Gefrierschrank");
let server = Http.createServer();
server.addListener("request", handleRequest);
server.listen(port);
connectToDatabase(mongoUrl);
async function connectToDatabase(_url) {
    let options = { useNewUrlParser: true, useUnifiedTopology: true };
    let mongoClient = new Mongo.MongoClient(_url, options);
    await mongoClient.connect();
    contentCollection = mongoClient.db("Gefrierschrank").collection("Schrankinhalt");
}
async function handleRequest(_request, _response) {
    console.log("handleRequest");
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.setHeader("Access-Control-Allow-Origin", "*");
    console.log("HeaderSet");
    if (_request.url) {
        let url = Url.parse(_request.url, true);
        let pathname = url.pathname;
        if (pathname == "/addItem") { //Item der DB hinzufügen
            let itime = new Date();
            if (url.query.id != undefined) {
                contentCollection.replaceOne({ "_id": new Mongo.ObjectID(url.query.id) }, { name: url.query.name, note: url.query.note, ablaufDatum: url.query.ablaufDatum, time: itime.toLocaleDateString(), kategorie: url.query.kategorie });
            }
            else {
                contentCollection.insertOne({ name: url.query.name, note: url.query.note, ablaufDatum: url.query.ablaufDatum, time: itime.toLocaleDateString(), kategorie: url.query.kategorie });
            }
            connectToDatabase(mongoUrl);
        }
        if (pathname == "/getItems") {
            _response.write(JSON.stringify(await (contentCollection.find().toArray())));
        }
        if (pathname == "/removeItem") {
            contentCollection.deleteOne({ "_id": new Mongo.ObjectID(url.query.id) });
            connectToDatabase(mongoUrl);
        }
    }
    _response.end();
}
//# sourceMappingURL=server.js.map