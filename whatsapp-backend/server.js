import Express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from "cors";
// import { ChangeStream } from "mongodb";

// app config
const app = Express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1630727",
  key: "c88958e4ab9f523f31ce",
  secret: "491199d90df652343206",
  cluster: "ap2",
  useTLS: true
});

// middleware
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cors());

// DB config
const db = mongoose.connection;
const connection_url =
  "mongodb+srv://admin:ydvfYFaZYsUhAqnk@cluster0.knmnyih.mongodb.net/whatsappdb?retryWrites=true&w=majority";
mongoose.connect(connection_url)
//  .then(() => console.log("Connected to DB"));
db.once("open", () => {
  console.log("Connected to DB");

const msgCollection = db.collection("messagecontents");
const changeStream = msgCollection.watch();

changeStream.on("change", (change)=>{ 
  console.log("A Change occured", change);

  if  (change.operationType === "insert") {
    const messageDetails = change.fullDocument;
    pusher.trigger("messages", "inserted",{
      name: messageDetails.name,
      message: messageDetails.message,
      timestamp: messageDetails.timestamp,
      received: messageDetails.received
    });
  } else {
    console.log("Error triggering Pusher");
  }
});
 });

// api routes
// app.get("/", (req, res) => res.status(200).send("Hello from the server!"));
// app.post("/messages/new", (req, res) => {
//   const dbMessages = req.body;
//   let message = new Messages(dbMessages)
//   message.save().then(() => {
//     console.log("message saved");
//     return res.status(201).send("message saved")
//   }).catch(e => {
//     console.log(e);
//     return res.status(500).send("message not saved")
//   });
// });

app.get("/", (req, res) => res.status(200).send("Hello from the server!"));

app.get("/messages/sync", (req,res) => {
  const dbMessage = req.body;
  Messages.find(dbMessage)
  .then(()=> {
    console.log("Message Created");
    res.send("Message created")
  })
  .catch(err => console.log(err));
});


app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;
  console.log(req.body);
  Messages.create(dbMessage)
  .then(()=> {
    console.log("Created");
    res.send("Created")
  })
  .catch(err => console.log(err));

});

  // listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));
