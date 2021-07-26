const Router = require('express').Router();
const Vehicle_loan = require('../models/vehicle_loan.model');

Router.post('/add', (req, res) => {
    const vehicle_loan = new Vehicle_loan(req.body);
    vehicle_loan.save((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({
                status: true,
                data
            });
        }
    });
});

Router.post('/update', (req, res) => {
    var vehicle_loan = new Vehicle_loan(req.body);
    vehicle_loan.fetchById(() => {});
    vehicle_loan.rc = req.body.rc;
    vehicle_loan.quotation = req.body.quotation;
    vehicle_loan.insurance_docs = req.body.insurance_docs;
    vehicle_loan.ac_payee_cheque = req.body.ac_payee_cheque;
    vehicle_loan.save((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({
                status: true,
                data
            });
        }
    });
});

Router.post('/delete', (req, res) => {
    const vehicle_loan = new Vehicle_loan(req.body);
    vehicle_loan.delete((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({
                status: true,
                data
            });
        }
    });
});

Router.get('/getAll', (req, res) => {
    Vehicle_loan.getAll((err, result) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.json({
                status: true,
                result
            });
        }
    });
});

Router.get('/get/:id', (req, res) => {
    const vehicle_loan = new Vehicle_loan({loan_id: req.params.id});
    vehicle_loan.fetchByID((err, result)=>{
        if(err) {
            res.status(500).send(err);
        }else{
            res.json({
                status: true,
                data: result
            });
        }
    });
});


module.exports = Router;