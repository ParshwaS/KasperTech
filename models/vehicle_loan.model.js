const { pool } = require('../conn');

class Vehicle_loan {

    constructor(options){
        this.loan_id = options.loan_id || null;
        this.rc = options.rc || null;
        this.quotation = options.quotation || null;
        this.insurance_docs = options.insurance_docs || null;
        this.ac_payee_cheque = options.ac_payee_cheque || null;
    }

    static getAll(callback){
        pool.connect(function(err, client, done){
            if(err) {
                callback(err, null);
            } else {
                const sql = 'SELECT * FROM vehicle_loan';
                client.query(sql, function(err, result){
                    done();
                    if(err) {
                        callback(err, null);
                    } else {
                        callback(null, result.rows);
                    }
                });
            }
        });
    }

    fetchById(callback){
        pool.connect(function(err, client, done){
            if(err) {
                callback(err, null);
            } else {
                const sql = `SELECT * FROM vehicle_loan WHERE loan_id = '${this.loan_id}';`;
                client.query(sql, function(err, result){
                    done();
                    if(err) {
                        callback(err, null);
                    } else {
                        this.loan_id = result.rows[0].loan_id;
                        this.rc = result.rows[0].rc;
                        this.quotation = result.rows[0].quotation;
                        this.insurance_docs = result.rows[0].insurance_docs;
                        this.ac_payee_cheque = result.rows[0].ac_payee_cheque;
                        callback(null, result.rows[0]);
                    }
                });
            }
        });
    }

    save(callback){
        pool.connect(function(err, client, done){
            if(err) {
                callback(err, null);
            } else {
                const sql = `
                    INSERT INTO vehicle_loan (loan_id, rc, quotation, insurance_docs, ac_payee_cheque) VALUES ('${this.loan_id}', '${this.rc}', '${this.quotation}', '${this.insurance_docs}', '${this.ac_payee_cheque}');
                `;
                client.query(sql, function(err, result){
                    done();
                    if(err) {
                        callback(err, null);
                    } else {
                        callback(null, result);
                    }
                });
            }
        });
    }

    update(callback){
        pool.connect(function(err, client, done){
            if(err) {
                callback(err, null);
            } else {
                const sql = `
                    UPDATE vehicle_loan SET rc = '${this.rc}', quotation = '${this.quotation}', insurance_docs = '${this.insurance_docs}', ac_payee_cheque = '${this.ac_payee_cheque}' WHERE loan_id = '${this.loan_id}';
                `;
                client.query(sql, function(err, result){
                    done();
                    if(err) {
                        callback(err, null);
                    } else {
                        callback(null, result);
                    }
                });
            }
        });
    }

    delete(callback){
        pool.connect(function(err, client, done){
            if(err) {
                callback(err, null);
            } else {
                const sql = `DELETE FROM vehicle_loan WHERE loan_id = '${this.loan_id}';`;
                client.query(sql, function(err, result){
                    done();
                    if(err) {
                        callback(err, null);
                    } else {
                        callback(null, result);
                    }
                });
            }
        });
    }
}

module.exports = Vehicle_loan;