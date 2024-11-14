const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connect = require('./connect');
const urlRoutes = require('./routes/url');
const URL = require('./models/url')
require ('dotenv').config();
const cors = require('cors')
const port = process.env.PORT || 3000;

connect().then(() => {
    console.log('Connected to MongoDB');
    }
    ).catch((e) => {
    console.error('Connection error', e.message);
    }
);

app.use(express.json());
app.use("/url",urlRoutes)
app.use(cors());

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    try {

      const item = await URL.findOneAndUpdate(
        { shortId },
        { $push: { visitHistory: { timestamp: Date.now() } } },
        { new: true } 
      );
  

      if (!item) {
        return res.status(404).send('Shortened URL not found');
      }
  

      res.redirect(item.redirectURL);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    }); 