// let defaultRelay = [
//   {
//     emotion: "loneliness",
//     response: "When I moved into a new city and my boxes were still unpacked, and I also felt"
//   },
//   {
//     emotion: "hope",
//     response: "When I finally saw the morning light through my curtains, and I also felt"
//   }
// ];

// -----------------------------
//  SETUP THE SERVER
// -----------------------------
//  let express = require('express');
//  let app = express();

//step 23 update the express import from require
import express from 'express';
//step 21 load lowdb using import keyword
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

// step 24 Initialize a lowdb json database and commment out the defaultRelay array
const defaultData = { relay: [] };
const adapter = new JSONFile('db.json');
const db = new Low(adapter, defaultData);

const app = express();

///ROUTE 1 Deliver the front-end files.///

 // Serve static files
app.use(express.static('public'));

/////

// Step 14 Add json parse middleware so the server can properly read json data
app.use(express.json());

// Set port and start server
let port = 3000;
app.listen(port, () => {
  console.log('Server listening on localhost:', port);
});


///ROUTE 2 Receive and store new user data.///

// Step 13 : create ab app.post() route to listen for the new message data. 
app.post('/new-data', (req, res) => {
  console.log('Received:', req.body);

  db.read().then(() => {

  //Step 15 in the callback funtion of the app.post() route, update the message date with a timestamp
  let newEntry = req.body;
  newEntry.time = Date();

  //Step 16 store the new message data in the existing data array
  //dafaultData.relay.push(newEntry);

  //step 25 write a new entry to the databse, not the defaultData array, in the app.post route
  db.data.relay.push(newEntry);
  db.write().then(() => { 
  //send a message back to the client

  //Step 17 send a response obeject back to the client with a success message
  res.json({ msg: 'Success' });
  });
  });
});

///////

///ROUTE 3 Serve stored data back to users///

//Step 5 create the route to serve the data
app.get('/data', (req, res) => {
  //step 26 read the entry from the database, not the defaultRelay array, in the app.get route
  db.read().then(() => {
    res.json(db.data.relay);
  });
});
