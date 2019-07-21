const express = require('express');

let Module = require('../models/module');
var moduleRoutes = express.Router();

moduleRoutes.route('/').get(function(req, res) {
    Module.find(function(err, module) {
        if (err) {
            console.log(err);
        } else {
            res.json(module);
        }
    });
});

moduleRoutes.route('/delete/:id').delete(function(req, res) {

    console.log(req.params.id)
    let id = req.params.id;
    
    Module.findByIdAndRemove(id, (err, result) => {
      if(err) {
        return res.status(500).send(err);
      }

      return res.status(200).send('Module ' + result._id + ' Deleted');
    });
    
});

moduleRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Module.findById(id, function(err, module) {
        res.json(module);
    });
});

moduleRoutes.route('/add').post(function(req, res) {
    console.log(req.body)
    let module = new Module(req.body);
    module.save()
        .then(module => {
            res.status(200).json({'module': 'Module added successfully', 'obj': req.body});
        })
        .catch(err => {
            res.status(400).send('Adding new module failed');
        });
});

module.exports = moduleRoutes;