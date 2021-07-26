const { pool } = require('../conn');

class Family_details {

    constructor(options) {
        this.id = options.id || null;
        this.ml_id = options.ml_id || null;
        this.name = options.name || null;
        this.relation = options.relation || null;
        this.age = options.age || null;
    }

    static getAll(callback) {
        pool.connect(function (err, client, done) {
            if (err) {
                callback(err, null);
            } else {
                const sql = 'SELECT * FROM family_details';
                client.query(sql, function (err, result) {
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

    fetchById(callback) {
        pool.connect(function (err, client, done) {
            if (err) {
                callback(err, null);
            } else {
                const sql = `SELECT * FROM family_details WHERE id = '${this.id}';`;
                client.query(sql, function (err, result) {
                    done();
                    if (err) {
                        callback(err, null);
                    } else {
                        this.id = result.rows[0].id;
                        this.ml_id = result.rows[0].ml_id;
                        this.name = result.rows[0].name;
                        this.relation = result.rows[0].relation;
                        this.age = result.rows[0].age;
                        callback(null, result.rows[0]);
                    }
                });
            }
        });
    }

    save(callback) {
        pool.connect(function (err, client, done) {
            if (err) {
                callback(err, null);
            } else {
                const sql = `
                    INSERT INTO family_details (ml_id, name, relation, age) VALUES ('${this.ml_id}', '${this.name}', '${this.relation}', '${this.age}');
                `;
                client.query(sql, function (err, result) {
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
        pool.connect(function (err, client, done) {
            if (err) {
                callback(err, null);
            } else {
                const sql = `UPDATE family_details SET name = '${this.name}', relation = '${this.relation}', age = '${this.age}' WHERE id = '${this.id}';`;
                client.query(sql, function (err, result) {
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
        pool.connect(function (err, client, done) {
            if (err) {
                callback(err, null);
            } else {
                const sql = `DELETE FROM family_details WHERE id = '${this.id}';`;
                client.query(sql, function (err, result) {
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

module.exports = Family_details;