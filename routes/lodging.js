'use strict';

const express = require('express');
const Lodging = require('../controllers/v1/lodging');
const { wrapper } = require('../middleware/error');
const { check, validationResult } = require('express-validator/check');

module.exports = function (app) {
    app.get('/api/v1/lodging', (req, res) => {
        Lodging.getlodging((err, data) => {
            res.status(200).json(data);
        });
    });
    app.get('/api/v1/lodging/:lodging_id', (req, res) => {
        const lodgingData = {
            lodging_id: parseInt(req.params.lodging_id)};
        Lodging.getlodgingcode(lodgingData,(err, data) => {
            res.status(200).json(data);
        });
    });
    app.post('/api/v1/lodging',/*[
        check('country').isString(),
        check('city').isString(),
        check('state').isString()
    ],*/ (req, res) => {
        const lodgingData = {
            lodging_id: null,
            host_id: req.body.host_id,
            lodging_name: req.body.lodging_name,
            phone_number: req.body.phone_number,
            lodging_type: req.body.lodging_type,
            lodging_class: req.body.lodging_class,
            is_exclusive: req.body.is_exclusive,
            is_company: req.body.is_company,
            guest_number: req.body.guest_number,
            rooms_number: req.body.rooms_number,
            beds_number: req.body.beds_number,
            bathrooms_number: req.body.bathrooms_number,
            location_id: req.body.location_id,
            address: req.body.address,
            extra_address: req.body.extra_address,
            time_before_guest: req.body.time_before_guest,
            time_arrive_start: req.body.time_arrive_start,
            time_arrive_end: req.body.time_arrive_end,
            with_wifi: req.body.with_wifi,
            with_cable_tv: req.body.with_cable_tv,
            with_air_conditioning: req.body.with_air_conditioning,
            with_phone: req.body.with_phone,
            with_kitchen: req.body.with_kitchen,
            with_cleaning_items: req.body.with_cleaning_items,
            price_per_person_and_nigth: req.body.price_per_person_and_nigth,
            lodging_description: req.body.lodging_description,
            lodging_provide: req.body.lodging_provide
            //created_at: new Date(),
            //updated_at: new Date()
        };
        console.log(lodgingData);
        Lodging.insertlodging(lodgingData, (err, data) => {
            if (data && data.insertId) {
                res.json({
                    success: true,
                    data: lodgingData
                })
            } else {
                res.status(500).json({
                    success: false,
                    data: data.message
                })
            }
        })
    });

    app.put('/api/v1/lodging/:lodging_id',/*[
        check('country').isString(),
        check('city').isString(),
        check('state').isString()
    ],*/(req, res) => {
        const lodgingData = {
            lodging_id: parseInt(req.params.lodging_id),
            lodging_name: req.body.lodging_name,
            phone_number: req.body.phone_number,
            lodging_type: req.body.lodging_type,
            lodging_class: req.body.lodging_class,
            is_exclusive: req.body.is_exclusive,
            is_company: req.body.is_company,
            guest_number: req.body.guest_number,
            rooms_number: req.body.rooms_number,
            beds_number: req.body.beds_number,
            bathrooms_number: req.body.bathrooms_number,
            location_id: req.body.location_id,
            address: req.body.address,
            extra_address: req.body.extra_address,
            time_before_guest: req.body.time_before_guest,
            time_arrive_start: req.body.time_arrive_start,
            time_arrive_end: req.body.time_arrive_end,
            with_wifi: req.body.with_wifi,
            with_cable_tv: req.body.with_cable_tv,
            with_air_conditioning: req.body.with_air_conditioning,
            with_phone: req.body.with_phone,
            with_kitchen: req.body.with_kitchen,
            with_cleaning_items: req.body.with_cleaning_items,
            price_per_person_and_nigth: req.body.price_per_person_and_nigth,
            lodging_description: req.body.lodging_description,
            lodging_provide: req.body.lodging_provide
            //created_at: new Date(),
            //updated_at: new Date()
        };

        Lodging.updatelodging(lodgingData, (err, data) => {
            if (data && data.message) {
                res.json({
                    success: true,
                    data: lodgingData
                })
            } else {
                res.status(500).json({
                    success: false,
                    msg: 'Error'
                })
            }
        })
    });

    app.delete('/api/v1/lodging/:lodging_id', (req, res) => {
        Lodging.deletelodging(parseInt(req.params.lodging_id), (err, data) => {
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