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
            lodging_id: parseInt(req.params.lodging_id)
        };
        Lodging.getlodgingcode(lodgingData, (err, data) => {
            res.status(200).json({
                lodging_id: data[0].lodging_id,
                host_id: data[0].host_id,
                lodging_name: data[0].lodging_name,
                phone_number: data[0].phone_number,
                lodging_type: data[0].lodging_type,
                lodging_class: data[0].lodging_class,
                is_exclusive: data[0].is_exclusive,
                is_company: data[0].is_company,
                guest_number: data[0].guest_number,
                rooms_number: data[0].rooms_number,
                beds_number: data[0].beds_number,
                bathrooms_number: data[0].bathrooms_number,
                location_id: data[0].location_id,
                address: data[0].address,
                extra_address: data[0].extra_address,
                time_before_guest: data[0].time_before_guest,
                time_arrive_start: data[0].time_arrive_start,
                time_arrive_end: data[0].time_arrive_end,
                with_wifi: data[0].with_wifi,
                with_cable_tv: data[0].with_cable_tv,
                with_air_conditioning: data[0].with_air_conditioning,
                with_phone: data[0].with_phone,
                with_kitchen: data[0].with_kitchen,
                with_cleaning_items: data[0].with_cleaning_items,
                price_per_person_and_nigth: data[0].price_per_person_and_nigth,
                lodging_description: data[0].lodging_description,
                lodging_provide: data[0].lodging_provide
            });
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
                    res.status(201).json({
                        lodging_id: data.insertId,
                        host_id: lodgingData.host_id,
                        lodging_name: lodgingData.lodging_name,
                        phone_number: lodgingData.phone_number,
                        lodging_type: lodgingData.lodging_type,
                        lodging_class: lodgingData.lodging_class,
                        is_exclusive: lodgingData.is_exclusive,
                        is_company: lodgingData.is_company,
                        guest_number: lodgingData.guest_number,
                        rooms_number: lodgingData.rooms_number,
                        beds_number: lodgingData.beds_number,
                        bathrooms_number: lodgingData.bathrooms_number,
                        location_id: lodgingData.location_id,
                        address: lodgingData.address,
                        extra_address: lodgingData.extra_address,
                        time_before_guest: lodgingData.time_before_guest,
                        time_arrive_start: lodgingData.time_arrive_start,
                        time_arrive_end: lodgingData.time_arrive_end,
                        with_wifi: lodgingData.with_wifi,
                        with_cable_tv: lodgingData.with_cable_tv,
                        with_air_conditioning: lodgingData.with_air_conditioning,
                        with_phone: lodgingData.with_phone,
                        with_kitchen: lodgingData.with_kitchen,
                        with_cleaning_items: lodgingData.with_cleaning_items,
                        price_per_person_and_nigth: lodgingData.price_per_person_and_nigth,
                        lodging_description: lodgingData.lodging_description,
                        lodging_provide: lodgingData.lodging_provide
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
            } else {
                res.status(500).json({
                    message: "error"
                })
            }
        })
    });

}