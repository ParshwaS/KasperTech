const { pool } = require('../conn');

class Od_oc_loan {

    constructor(data) {
        this.loan_id = data.loan_id || null;
        this.sales_deed = data.sales_deed || null;
    }

    static getAll(callback) {
        pool.connect(function(err, client, done) {
            if (err) {
                callback(err, null);
            } else {
                const sql = `
                SELECT * FROM od_oc_loan;
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
                SELECT * FROM od_oc_loan WHERE loan_id = '${this.loan_id}';
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
                            this.sales_deed = result.rows[0].sales_deed;
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
                INSERT INTO od_oc_loan (loan_id, sales_deed) VALUES ('${this.loan_id}', '${this.sales_deed}');
                `
                client.query(sql, function(err, result) {
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
        pool.connect(function(err, client, done) {
            if (err) {
                callback(err, null);
            } else {
                const sql = `
                UPDATE od_oc_loan SET sales_deed = '${this.sales_deed}' WHERE loan_id = '${this.loan_id}';
                `
                client.query(sql, function(err, result) {
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

    delete(callback) {
        pool.connect(function(err, client, done) {
            if (err) {
                callback(err, null);
            } else {
                const sql = `
                DELETE FROM od_oc_loan WHERE loan_id = '${this.loan_id}';
                `
                client.query(sql, function(err, result) {
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
}

module.exports = Od_oc_loan;