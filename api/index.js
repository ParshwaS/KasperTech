const Router = require('express').Router();

Router.use('/loan', require('./loan.api'));
Router.use('/shopLoan', require('./shop_loan.api'));

module.exports = Router;