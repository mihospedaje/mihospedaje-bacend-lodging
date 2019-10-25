'use strict';

const express = require('express');
const LodgingImg = require('../controllers/v1/lodging_image');
const { wrapper } = require('../middleware/error');
const { check, validationResult } = require('express-validator/check');

module.exports = function (app) {
    app.get('/api/v1/lodging_image', (req, res) => {
        LodgingImg.getlodgingimg((err, data) => {
            res.status(200).json(data);
        });
    });
    app.get('/api/v1/lodging_image/:lodging_image_id', (req, res) => {
        const lodgingImgData = {
            lodging_image_id: parseInt(req.params.lodging_image_id)
            };
        LodgingImg.getlodgingimgcode(lodgingImgData,(err, data) => {
            res.status(200).json({
                lodging_image_id: data[0].lodging_image_id,
                lodging_id: data[0].lodging_id,
                url: data[0].url
            });
        });
    });
    app.post('/api/v1/lodging_image',/*[
        check('country').isString(),
        check('city').isString(),
        check('state').isString()
    ],*/ (req, res) => {
        const lodgingImgData = {
            lodging_image_id: null,
            lodging_id: req.body.lodging_id,
            url: req.body.url
            //created_at: new Date(),
            //updated_at: new Date()
        };
        console.log(lodgingImgData);
        LodgingImg.insertlodgingimg(lodgingImgData, (err, data) => {
            if (data && data.insertId) {
                res.status(201).json({
                    lodging_image_id: data.insertId,
                    lodging_id: lodgingImgData.lodging_id,
                    url: lodgingImgData.url
                })
            } else {
                res.status(500).json({
                    success: false,
                    data: data.message
                })
            }
        })
    });

    app.put('/api/v1/lodging_image/:lodging_image_id',/*[
        check('country').isString(),
        check('city').isString(),
        check('state').isString()
    ],*/(req, res) => {
        const lodgingImgData = {
            lodging_image_id: parseInt(req.params.lodging_image_id),
            url: req.body.url
            //created_at: new Date(),
            //updated_at: new Date()
        };

        LodgingImg.updatelodgingimg(lodgingImgData, (err, data) => {
            if (data && data.message) {
                res.status(201).json({
                    lodging_image_id: lodgingImgData.lodging_image_id,
                    lodging_id: lodgingImgData.lodging_id,
                    url: lodgingImgData.url
                })
            } else {
                res.status(500).json({
                    success: false,
                    msg: 'Error'
                })
            }
        })
    });

    app.delete('/api/v1/lodging_image/:lodging_image_id', (req, res) => {
        LodgingImg.deletelodgingimg(parseInt(req.params.lodging_image_id), (err, data) => {
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
