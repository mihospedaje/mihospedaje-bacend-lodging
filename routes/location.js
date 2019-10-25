'use strict';

const express = require('express');
const Location = require('../controllers/v1/location');
const { wrapper } = require('../middleware/error');
const { check, validationResult } = require('express-validator/check');

module.exports = function (app) {
    app.get('/api/v1/location', (req, res) => {
        Location.getlocation((err, data) => {
            res.status(200).json(data);
        });
    });
    app.get('/api/v1/location/:location_id', (req, res) => {
        const locationData = {
            location_id: parseInt(req.params.location_id)};
        Location.getlocationcode(locationData,(err, data) => {
            res.status(200).json({
                location_id: data[0].location_id,
                country: data[0].country,
                city: data[0].city,
                state: data[0].state
            });
        });
    });
    app.post('/api/v1/location',[
        check('country').isString(),
        check('city').isString(),
        check('state').isString()
    ], (req, res) => {
        const locationData = {
            location_id: null,
            country: req.body.country,
            city: req.body.city,
            state: req.body.state
            //created_at: new Date(),
            //updated_at: new Date()
        };
        console.log(locationData);
        Location.insertlocation(locationData, (err, data) => {
            if (data && data.insertId) {
                res.status(201).json({
                    location_id: data.insertId,
                    country: locationData.country,
                    city: locationData.city,
                    state: locationData.state
                })
            } else {
                res.status(500).json({
                    success: false,
                    data: data.message
                })
            }
        })
    });

    app.put('/api/v1/location/:location_id',[
        check('country').isString(),
        check('city').isString(),
        check('state').isString()
    ],(req, res) => {
        console.log(req.body)
        const locationData = {
            location_id: parseInt(req.params.location_id),
            country: req.body.country,
            city: req.body.city,
            state: req.body.state
            //created_at: new Date(),
            //updated_at: new Date()
        };

        Location.updatelocation(locationData, (err, data) => {
            if (data && data.message) {
                res.status(201).json({
                    location_id: locationData.location_id,
                    country: locationData.country,
                    city: locationData.city,
                    state: locationData.state
                })
            } else {
                res.status(500).json({
                    success: false,
                    msg: 'Error'
                })
            }
        })
    });

    app.delete('/api/v1/location/:location_id', (req, res) => {
        Location.deletelocation(parseInt(req.params.location_id), (err, data) => {
            if (data && data.message == 'deleted' || data.message == 'not exists') {
                res.json({
                    success: true,
                    data
                })
            }else{
                res.status(500).json({
                    message: "error"
                })
            }
        })
    });

}
