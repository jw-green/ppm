const express = require('express');
const mongoose = require('mongoose');

let FunctionItem = require('../models/function');
var functionRoutes = express.Router();

// =============================================================================
// Create Routes
// =============================================================================

functionRoutes.route('/add').post(function(req, res) {
    let funct = new FunctionItem(req.body);
    funct.save()
        .then(funct => {
            res.status(200).json({'function': 'Function added successfully', 'obj': req.body});
        })
        .catch(err => {
            res.status(400).send('Adding new function failed');
        });
});

// =============================================================================
// Read Routes
// =============================================================================

functionRoutes.route('/').get(function(req, res) {
    FunctionItem.find(function(err, funct) {
        if (err) {
            console.log(err);
        } else {
            res.json(funct);
        }
    });
});

functionRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    FunctionItem.findById(id, function(err, funct) {
        res.json(funct);
    });
});

functionRoutes.route('/find/:id').get(function(req, res) {
    FunctionItem.find({package: req.params.id}, function(err, functs) {
        res.json(functs);
    });
});

// =============================================================================
// Update Routes
// =============================================================================

functionRoutes.route('/update/:id').post(function(req, res) {
    FunctionItem.findById(req.params.id, function(err, funct) {
        if (!funct || funct === 'undefined')
            res.status(404).send("Data Not Found");
        else
            console.log(funct);
            funct.is_favorite = req.body.is_favorite;
            funct.save().then(funct => {
                res.json('Function updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

functionRoutes.route('/edit/:id').post(function(req, res) {
    FunctionItem.findById(req.params.id, function(err, funct) {
        if (!funct || funct === 'undefined')
            res.status(404).send("Data Not Found");
        else
            console.log(funct);
            funct.code = req.body.code;
            funct.save().then(funct => {
                res.json('Function updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

// =============================================================================
// Delete Routes
// =============================================================================

functionRoutes.route('/delete/:id').delete(function(req, res) {
    let id = req.params.id;
    
    FunctionItem.findByIdAndRemove(id, (err, result) => {
      if(err) {
        return res.status(500).send(err);
      }
      return res.status(200).send('Function ' + result._id + ' Deleted');
    });
});

module.exports = functionRoutes;