const { pool } = require('../conn');

class Machinary_loan {

    constructor(data) {
        this.loan_id = data.loan_id || null;
        this.experience = data.experience || null;
        this.rubber_stamp = data.rubber_stamp || null;
    }

    static getAll(callback) {
        pool.connect(function(err, client, done) {
            if (err) {
                callback(err, null);
            } else {
                const sql = `
                SELECT * FROM machinary_loan;
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
                SELECT * FROM machinary_loan WHERE loan_id = '${this.loan_id}';
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
                            this.experience = result.rows[0].experience;
                            this.rubber_stamp = result.rows[0].rubber_stamp;
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
                INSERT INTO machinary_loan (experience, rubber_stamp) VALUES ('${this.experience}', '${this.rubber_stamp}');
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
                UPDATE machinary_loan SET experience = '${this.experience}', rubber_stamp = '${this.rubber_stamp}' WHERE loan_id = '${this.loan_id}';
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
                DELETE FROM machinary_loan WHERE loan_id = '${this.loan_id}';
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

module.exports = Machinary_loan;