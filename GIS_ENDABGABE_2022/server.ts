//server.js muss mit Node.js ausgeführt werden, Aufbau dieser Seite basiert auf einer Teilaufgabe aus dem letzten Semester (Aufgabe_3.4)
import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";


const mongoUrl: string = "mongodb+srv://User3:Ananas123@tabea.fzpsx.mongodb.net/tabea";

let contentCollection: Mongo.Collection;

let port: number = Number(process.env.PORT);
if (!port)
    port = 8100; 

console.log("Starting Gefrierschrank");

let server: Http.Server = Http.createServer();
server.addListener("request", handleRequest);
server.listen(port);

connectToDatabase(mongoUrl);

async function connectToDatabase(_url: string): Promise<void> {
    let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

    let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
    await mongoClient.connect();

    contentCollection = mongoClient.db("Gefrierschrank").collection("Schrankinhalt");
}

async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
    console.log("handleRequest");
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.setHeader("Access-Control-Allow-Origin", "*");
    console.log("HeaderSet");

    if (_request.url) {
        
        let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
        let pathname: String | null = url.pathname;

        if (pathname == "/addItem") { //Item der DB hinzufügen
            
            let itime: Date = new Date();
            
            
            if (url.query.id != undefined) {
                contentCollection.replaceOne({ "_id": new Mongo.ObjectID(<string>url.query.id) }, { name: url.query.name, note: url.query.note, ablaufDatum: url.query.ablaufDatum, time: itime.toLocaleDateString(), kategorie: url.query.kategorie });
            } else {
                contentCollection.insertOne({ name: url.query.name, note: url.query.note, ablaufDatum: url.query.ablaufDatum, time: itime.toLocaleDateString(), kategorie: url.query.kategorie });
            } 

            connectToDatabase(mongoUrl);
        }
        if (pathname == "/getItems") { 
            _response.write(JSON.stringify(await (contentCollection.find().toArray())));

        }
        if (pathname == "/removeItem") {
            contentCollection.deleteOne({ "_id": new Mongo.ObjectID(<string>url.query.id) });
            connectToDatabase(mongoUrl);
        }

    }
    _response.end();
}
