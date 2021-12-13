const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');
const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// if (process.env.NODE_ENV === 'production') {
  //     // Serve any static files
  //     app.use(express.static(path.join(__dirname, 'client/build')));
  
//     // Handle React routing, return all requests to React app
//     app.get('*', function (req, res) {
//         res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//     });
// }
app.use(cors());
app.use('/api', routes);
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Hello there! Server listening on ${5000}`);
});

