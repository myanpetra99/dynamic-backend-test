require('dotenv').config();


const express = require('express');
const bodyParser = require('body-parser');
const Item = require('./models/item');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


// CRUD Operations
app.post('/items', async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.json(item);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/items', async (req, res) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/items/:id', async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).send('Item not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.put('/items/:id', async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (item) {
      await item.update(req.body);
      res.json(item);
    } else {
      res.status(404).send('Item not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete('/items/:id', async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (item) {
      await item.destroy();
      res.status(204).send();
    } else {
      res.status(404).send('Item not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
