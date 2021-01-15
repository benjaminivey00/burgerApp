const express = require('express');
const burger = require('../models/burger');

const router = express.Router(); 



//Get route
router.get('/', (req, res) => {
  burger.select(data => {
    const hbsObject = {
      burgers: data
    };
    res.render("index", hbsObject);
  });
});

//Post route
router.post('/api/burgers', (req, res) => {
  burger.insert(
    ["burger_name", "devoured"],
    [req.body.burger_name, req.body.devoured],
    (result) => {
      //send back ID of the new burger
      res.json({ id: result.insertId });
    }
  );
});

//Put route
router.put('/api/burgers/:id', (req, res) => {
  let condition = "id = " + req.params.id;
  
  burger.update(
    { devoured: req.body.devoured },
    condition,
    (result) => {
      if (result.changedRows === 0) {
        //if no rows were changed, the ID must not exist. return 404 err
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
});


module.exports = router; 