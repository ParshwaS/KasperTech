const Router = require('express').Router();
const Shop_loan = require('../models/shop_loan.model');

Router.post('/add', (req, res) => {
    const shop_loan = new Shop_loan(req.body);
    shop_loan.save((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({
                status: true,
                data,
            });
        }
    });
});

Router.post('/update', (req, res) => {
    var shop_loan = new Shop_loan(req.body);
    shop_loan.fetchByID(()=>{});
    shop_loan.ac_payee_cheque = req.body.ac_payee_cheque;
    shop_loan.satakhat = req.body.satakhat;
    shop_loan.update((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({
                status: true,
                data,
            });
        }
    });
});

Router.post('/delete', (req, res) => {
    var shop_loan = new Shop_loan(req.body);
    shop_loan.delete((err, data) => {
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

Router.get('/getAll', (req, res) => {
    Shop_loan.getAll((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({
                status: true,
                data,
            });
        }
    });
});

Router.get('/get/:id', (req, res) => {
    const shop_loan = new Shop_loan({loan_id: req.params.id});
    shop_loan.fetchByID((err, result)=>{
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