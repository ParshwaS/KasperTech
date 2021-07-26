const { pool } = require('../conn');

class Running_loans {

    constructor(data) {
        this.loan_id = data.loan_id || null;
        this.acc_statement = data.acc_statement || null;
        this.noc = data.noc || null;
        this.sanction_letter = data.sanction_letter || null;
    }

    static getAll(callback) {
        pool.connect(function(err, client, done) {
            if (err) {
                callback(err, null);
            } else {
                const sql = `
                SELECT * FROM running_loans;
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
                SELECT * FROM running_loans WHERE loan_id = '${this.loan_id}';
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
                            this.acc_statement = result.rows[0].acc_statement;
                            this.noc = result.rows[0].noc;
                            this.sanction_letter = result.rows[0].sanction_letter;
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
                INSERT INTO running_loans (loan_id, acc_statement, noc, sanction_letter) VALUES ('${this.loan_id}', '${this.acc_statement}', '${this.noc}', '${this.sanction_letter}');
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
                UPDATE running_loans SET acc_statement = '${this.acc_statement}', noc = '${this.noc}', sanction_letter = '${this.sanction_letter}' WHERE loan_id = '${this.loan_id}';
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
                DELETE FROM running_loans WHERE loan_id = '${this.loan_id}';
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

module.exports = Running_loans;