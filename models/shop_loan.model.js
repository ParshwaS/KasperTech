const { pool } = require('../conn');

class Shop_loan {
    
    constructor(options) {
        this.loan_id = options.loan_id || null;
        this.ac_payee_cheque = options.ac_payee_cheque || null;
        this.satakhat = options.satakhat || null;
    }

    static getAll(callback) {
        pool.connect((err, client, done) => {
            if (err) {
                callback(err, null);

            } else {
                client.query('SELECT * FROM shop_loan', (err, result) => {
                    done();

                    if (err) {
                        callback(err, null);

                    } else {
                        callback(null, result.rows);
                    }
                });
            }
        });
    }

    save(callback) {
        pool.connect((err, client, done) => {
            if (err) {
                callback(err, null);

            } else {
                const sql = `INSERT INTO shop_loan (loan_id, ac_payee_cheque, satakhat) VALUES ('${this.loan_id}', '${this.ac_payee_cheque}', '${this.satakhat}');`;
                client.query(sql ,(err, result) => {
                    done();

                    if (err) {
                        callback(err, null);

                    } else {
                        callback(null, result);
                    }
                });
            }
        });
    }

    update(callback) {
        pool.connect((err, client, done) => {
            if (err) {
                callback(err, null);

            } else {
                const sql = `
                    UPDATE shop_loan SET ac_payee_cheque = '${this.ac_payee_cheque}', satakhat = '${this.satakhat}' WHERE loan_id = '${this.loan_id}';
                `;
                client.query(sql, (err, result) => {
                    done();
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, result);
                    }
                });
            }
        });
    }

    fetchByID(callback) {
        pool.connect((err, client, done) => {
            if (err) {
                callback(err, null);

            } else {
                const sql = `SELECT * FROM shop_loan WHERE loan_id = '${this.loan_id}';`;
                client.query(sql, (err, result) => {
                    done();

                    if (err) {
                        console.log(err);
                        callback(err, null);
                    } else {
                        this.ac_payee_cheque = result.rows[0].ac_payee_cheque;
                        this.satakhat = result.rows[0].satakhat;
                        callback(null, result.rows[0]);
                    }
                });
            }
        });
    }

    delete(callback) {
        pool.connect((err, client, done) => {
            if(err){
                callback(err, null);
            }else{
                const sql = `DELETE FROM shop_loan WHERE loan_id = '${this.loan_id}';`;
                client.query(sql, (err, result) => {
                    done();
                    if(err){
                        console.log(err);
                        callback(err, null);
                    }else{
                        callback(null, true);
                    }
                });
            }
        });
    }
}

module.exports = Shop_loan;