const express = require('express');

let Package = require('../models/package');
var packageRoutes = express.Router();

packageRoutes.route('/').get(function(req, res) {
    Package.find(function(err, package) {
        if (err) {
            console.log(err);
        } else {
            res.json(package);
        }
    });
});

packageRoutes.route('/delete/:id').delete(function(req, res) {

    console.log(req.params.id)
    let id = req.params.id;
    
    Package.findByIdAndRemove(id, (err, result) => {
      if(err) {
        return res.status(500).send(err);
      }

      return res.status(200).send('Package ' + result._id + ' Deleted');
    });
    
});

packageRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Package.findById(id, function(err, package) {
        res.json(package);
    });
});

packageRoutes.route('/add').post(function(req, res) {
    console.log(req.body)
    let package = new Package(req.body);
    package.save()
        .then(package => {
            res.status(200).json({'package': 'Package added successfully', 'obj': req.body});
        })
        .catch(err => {
            res.status(400).send('Adding new package failed');
        });
});

module.exports = packageRoutes;