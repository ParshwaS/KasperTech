const { pool } = require('../conn');

class Home_loan {

    constructor(data) {
        this.loan_id = data.loan_id || null;
        this.hl_type = data.hl_type || null;
        this.satkhat = data.satkhat || null;
        this.transfer_documents = data.transfer_documents || null;
        this.sales_deed = data.sales_deed || null;
        this.ac_payee_cheque = data.ac_payee_cheque || null;
    }

    static getAll(callback) {
        pool.connect(function(err, client, done) {
            if (err) {
                callback(err, null);
            } else {
                const sql = `
                SELECT * FROM home_loan;
                `
                client.query(sql, function(err, result) {
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

    fetchByID(callback) {
        pool.connect(function(err, client, done) {
            if (err) {
                callback(err, null);
            } else {
                const sql = `
                SELECT * FROM home_loan WHERE loan_id = '${this.loan_id}';
                `
                client.query(sql, function(err, result) {
                    done();
                    if (err) {
                        callback(err, null);
                    } else {
                        if (result.rows.length === 0) {
                            callback(null, null);
                        } else {
                            this.loan_id = result.rows[0].loan_id;
                            this.hl_type = result.rows[0].hl_type;
                            this.satkhat = result.rows[0].satkhat;
                            this.transfer_documents = result.rows[0].transfer_documents;
                            this.sales_deed = result.rows[0].sales_deed;
                            this.ac_payee_cheque = result.rows[0].ac_payee_cheque;
                            callback(null, result.rows[0]);
                        }
                    }
                });
            }
        });
    }

    save(callback) {
        pool.connect(function(err, client, done) {
            if (err) {
                callback(err, null);
            } else {
                const sql = `
                INSERT INTO home_loan (loan_id, hl_type, satkhat, transfer_documents, sales_deed, ac_payee_cheque) VALUES ('${this.loan_id}', '${this.hl_type}', '${this.satkhat}', '${this.transfer_documents}', '${this.sales_deed}', '${this.ac_payee_cheque}');
                `
                client.query(sql, function(err, result) {
                    done();
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, result.insertId);
                    }
                });
            }
        });
    }

    update(callback) {
        pool.connect(function(err, client, done) {
            if (err) {
                callback(err, null);
            } else {
                const sql = `
                UPDATE home_loan SET hl_type = '${this.hl_type}', satkhat = '${this.satkhat}', transfer_documents = '${this.transfer_documents}', sales_deed = '${this.sales_deed}', ac_payee_cheque = '${this.ac_payee_cheque}' WHERE loan_id = '${this.loan_id}';
                `
                client.query(sql, function(err, result) {
                    done();
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, result.affectedRows);
                    }
                });
            }
        });
    }

    delete(callback) {
        pool.connect(function(err, client, done) {
            if (err) {
                callback(err, null);
            } else {
                const sql = `
                DELETE FROM home_loan WHERE loan_id = '${this.loan_id}';
                `
                client.query(sql, function(err, result) {
                    done();
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, result.affectedRows);
                    }
                });
            }
        });
    }
}

module.exports = Home_loan;