var express = require('express');
var app = express();
var cors = require('cors');
var dal = require('./dal.js');
const path = require('path');

// used to serve static files from public directory in development
// app.use(express.static('public'));
app.use(cors());

// create user account
app.get('/account/create/:name/:email/:password/:balance', function (req, res) {
  // check if account exists
  dal.find(req.params.email).then((users) => {
    // if user exists, return error message
    if (users.length > 0) {
      console.log('User already in exists');
      res.send('User already in exists');
    } else {
      // else create user
      const balance = req.params.balance;
      dal
        .create(
          req.params.name,
          req.params.email,
          req.params.password,
          Number(balance)
        )
        .then((user) => {
          console.log(user);
          res.send(user);
        });
    }
  });
});

// login user
app.get('/account/login/:email/:password', function (req, res) {
  dal.find(req.params.email).then((user) => {
    // if user exists, check password
    if (user.length > 0) {
      if (user[0].password === req.params.password) {
        res.send(user[0]);
      } else {
        res.send('Login failed: wrong password');
      }
    } else {
      res.send('Login failed: user not found');
    }
  });
});

// find user account
app.get('/account/find/:email', function (req, res) {
  dal.find(req.params.email).then((user) => {
    console.log(user);
    res.send(user);
  });
});

// find one user by email - alternative to find
app.get('/account/findOne/:email', function (req, res) {
  dal.findOne(req.params.email).then((user) => {
    console.log(user);
    res.send(user);
  });
});

// update - deposit/withdraw amount
app.get('/account/update/:email/:amount', function (req, res) {
  var amount = Number(req.params.amount);
  dal.update(req.params.email, amount).then((response) => {
    console.log(response);
    res.send(response);
  });
});

// Create Field - add new key value to user
app.get('/account/createField/:email/:key/:value', function (req, res) {
  const key = req.params.key;
  const value = req.params.value;

  dal.createField(req.params.email, key, value).then((response) => {
    console.log(response);
    res.send(response);
  });
});

// all accounts
app.get('/account/all', function (req, res) {
  dal.all().then((docs) => {
    console.log(docs);
    res.send(docs);
  });
});

//delete user collection
app.get('/account/deleteUser/:email', function (req, res) {
  if (!req.params.email) {
    res.sendStatus(404).send('Email Not Provided');
  } else {
    dal.deleteUser(req.params.email).then((docs) => {
      console.log(docs);
      res.send(docs);
    });
  }
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

var port = process.env.PORT || 3001;
app.listen(port);
console.log('Running on port: ' + port);
