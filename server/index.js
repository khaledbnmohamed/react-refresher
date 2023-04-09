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

// Endpoint to add a new tour
app.post('/tours', (req, res) => {
  const newTour = req.body;
  fs.readFile(toursFilePath, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    } else {
      const tours = JSON.parse(data).tours;
      const maxId = Math.max(...tours.map(t => t.id));
      newTour.id = maxId + 1;
      tours.push(newTour);
      fs.writeFile(toursFilePath, JSON.stringify({ tours }), err => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal server error');
        } else {
          res.send(newTour);
        }
      });
    }
  });
});

// Search route
app.get('/search', (req, res) => {
  // Parse search query params from URL
  const { q, minPrice, maxPrice, minRating, isSpecialOffer } = req.query;

  // Filter tours based on search criteria
  const filteredTours = tours.tours.filter((tour) => {
    let meetsCriteria = true;

    if (q && !tour.title.toLowerCase().includes(q.toLowerCase())) {
      meetsCriteria = false;
    }

    if (minPrice && tour.price < parseFloat(minPrice)) {
      meetsCriteria = false;
    }

    if (maxPrice && tour.price > parseFloat(maxPrice)) {
      meetsCriteria = false;
    }

    if (minRating && tour.rating < parseFloat(minRating)) {
      meetsCriteria = false;
    }

    if (
      isSpecialOffer !== undefined &&
      tour.isSpecialOffer !== JSON.parse(isSpecialOffer)
    ) {
      meetsCriteria = false;
    }

    return meetsCriteria;
  });

  res.send(filteredTours);
});

const server = app.listen(port, () => {
  console.log(`Server listening on port ${server.address().port}`);
});
