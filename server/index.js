const express = require('express')
const app = express()
const cors = require('cors');
const fs = require('fs');
const port = 3001

app.use(cors());

app.get('/', (req, res) => res.send('Hi there!'));

const toursFilePath = './activities.json';

// Endpoint to get all tours
app.get('/tours', (req, res) => {
  fs.readFile(toursFilePath, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    } else {
      setTimeout(() => {
      
      const tours = JSON.parse(data);
      res.send(tours);
    }, 900);
    }
  });
});

// Endpoint to get a single tour by id
app.get('/tours/:id', (req, res) => {
  const id = parseInt(req.params.id);
  fs.readFile(toursFilePath, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    } else {
      const tours = JSON.parse(data).tours;
      const tour = tours.find(t => t.id === id);
      if (tour) {
        res.send(tour);
      } else {
        res.status(404).send('Tour not found');
      }
    }
  });
});

const server = app.listen(port, () => {
  console.log(`Server listening on port ${server.address().port}`);
});
