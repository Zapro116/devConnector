const { decodeBase64 } = require('bcryptjs');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app=express();
const port=5000||process.env.PORT;


app.use(bodyParser.urlencoded(
  { extended:false }
));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose
  .connect(db,{ useNewUrlParser: true,useUnifiedTopology: true })
  .then(()=> console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// passport
app.use(passport.initialize());

// passport config
require('./config/passport')(passport);

app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);



app.listen(port,()=> console.log(`Server listening to ${port} port`));