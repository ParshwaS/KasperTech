const Router = require('express').Router();
const Loan = require('../models/loan.model');
const Home_loan = require('../models/home_loan.model');
const Mortgage_loan = require('../models/mortgage_loan.model');
const Machinary_loan = require('../models/machinary_loan.model');
const Running_loans = require('../models/running_loans.model');
const Od_oc_loan = require('../models/od_oc_loan.model');

Router.get('/homeLoans', (req, res) => {
    Home_loan.getAll((err, data) => {
        if(err) {
            res.status(500).send(err);
        }else{
            res.json({
                status: true,
                data
            });
        }
    });
});

Router.get('/mortgageLoans', (req, res) => {
    Mortgage_loan.getAll((err, data) => {
        if(err) {
            res.status(500).send(err);
        }else{
            res.json({
                status: true,
                data
            });
        }
    });
});

Router.get('/machinaryLoans', (req, res) => {
    Machinary_loan.getAll((err, data) => {
        if(err) {
            res.status(500).send(err);
        }else{
            res.json({
                status: true,
                data
            });
        }
    });
});

Router.get('/runningLoans', (req, res) => {
    Running_loans.getAll((err, data) => {
        if(err) {
            res.status(500).send(err);
        }else{
            res.json({
                status: true,
                data
            });
        }
    });
});

Router.get('/Od_ocLoans', (req, res) => {
    Od_oc_loan.getAll((err, data) => {
        if(err) {
            res.status(500).send(err);
        }else{
            res.json({
                status: true,
                data
            });
        }
    });
});

Router.post('/add', (req, res) => {
    const loan = new Loan(req.body);
    loan.save((err, loan) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json({
                status: true,
                message: "Added Successfully"
            });
        }
    });
});

Router.get('/get/:id', (req, res)=> {
    var loan = new Loan({id: req.params.id});
    loan.fetchById((err, data) => {
        if(!err){
            res.json(data);
        }else{
            res.status(500).send(err);
        }
    })
});

Router.post('/update', (req, res) => {
    const loan = new Loan(req.body);
    loan.update((err, loan) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json({
                status: true,
                message: "Updated Successfully"
            });
        }
    });
});

module.exports = Router;