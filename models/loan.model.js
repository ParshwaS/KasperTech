const { pool } = require('../conn');

class Loan {

    constructor(options) {
        this.id = options.id || null;
        this.application_date = options.application_date || null;
        this.amount = options.amount || null;
        this.interest = options.interest || null;
        this.tenure = options.tenure || null;
        this.processing_fee = options.processing_fee || null;
        this.due_amount = options.due_amount || null;
        this.due_date = options.due_date || null;
        this.occupation = options.occupation || null;
        this.status = options.status || null;
        this.user_id = options.user_id || null;
        this.l_type = options.l_type || null;
        this.personal = options.personal || null;
        this.firm_id = options.firm_id || null;
        this.occ_doc = options.occ_doc || null;
    }

    save(callback) {
        const loan = this;
        const sql = `INSERT INTO loan (application_date, amount, interest, tenure, processing_fee, due_amount, due_date, occupation, status, user_id, l_type, personal, firm_id, occ_doc) VALUES (${loan.application_date}, ${loan.amount}, ${loan.interest}, ${loan.tenure}, ${loan.processing_fee}, ${loan.due_amount}, ${loan.due_date}, ${loan.occupation}, ${loan.status}, ${loan.user_id}, ${loan.l_type}, ${loan.personal}, ${loan.firm_id}, ${loan.occ_doc})`;
        pool.connect((err, client, done) => {
            if (err) {
                return callback(err);
            }
            client.query("BEGIN").then((res) => {
                console.log(sql);
                client.query(sql).then((result) => {
                    client.query("COMMIT").then((res) => {
                        callback(null, result);
                    }).catch((err) => {
                        client.end();
                        callback(err);
                    });
                }).catch((err) => {
                    client.end();
                    callback(err);
                });
            }).catch((err) => {
                callback(err);
                client.end();
            });
            done();
        });
    }

    update(callback) {
        const loan = this;
        const sql = `UPDATE loan SET application_date=${loan.application_date}, amount=${loan.amount}, interest=${loan.interest}, tenure='${loan.tenure}', processing_fee=${loan.processing_fee}, due_amount=${loan.due_amount}, due_date=${loan.due_date}, occupation='${loan.occupation}', status='${loan.status}', user_id='${loan.user_id}', l_type='${loan.l_type}', personal='${loan.personal}', firm_id=${loan.firm_id}, occ_doc='${loan.occ_doc}' WHERE id='${loan.id}'`;
        pool.connect((err, client, done) => {
            if (err) {
                return callback(err);
            }
            client.query("BEGIN").then((res) => {
                client.query(sql).then((result) => {
                    client.query("COMMIT").then((res) => {
                        callback(null, result);
                        client.end();
                    }).catch((err) => {
                        client.end();
                        callback(err);
                    });
                }).catch((err) => {
                    client.end();
                    callback(err);
                });
            }).catch((err) => {
                client.end();
                callback(err);
            });
            done();
        });
    }

    fetchById(callback) {
        const sql = `SELECT * FROM loan WHERE id='${this.id}'`;
        const params = [this.id];
        pool.connect((err, client, done) => {
            if (err) {
                return callback(err);
            }
            client.query(sql).then((result) => {
                this.application_date = result.rows[0].application_date;
                this.amount = result.rows[0].amount;
                this.interest = result.rows[0].interest;
                this.tenure = result.rows[0].tenure;
                this.processing_fee = result.rows[0].processing_fee;
                this.due_amount = result.rows[0].due_amount;
                this.due_date = result.rows[0].due_date;
                this.occupation = result.rows[0].occupation;
                this.status = result.rows[0].status;
                this.user_id = result.rows[0].user_id;
                this.l_type = result.rows[0].l_type;
                this.personal = result.rows[0].personal;
                this.firm_id = result.rows[0].firm_id;
                this.occ_doc = result.rows[0].occ_doc;
                callback(null, result.rows[0]);
            }).catch((err) => {
                callback(err);
            });
            done();
        });
    }

    static getAll() {
        const sql = `SELECT * FROM loan`;
        pool.connect((err, client, done) => {
            if (err) {
                return callback(err);
            }
            client.query(sql).then((result) => {
                callback(null, result.rows);
                client.end();
            }).catch((err) => {
                client.end();
                callback(err);
            });
            done();
        });
    }
}

module.exports = Loan;