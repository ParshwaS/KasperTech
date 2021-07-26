const { Pool } = require('pg');

var config = {
    host: 'brb2lc6xikbxn2q9lkcd-postgresql.services.clever-cloud.com',
    port: '5432',
    user: 'u8jxusafsjjwxpfmoc77',
    password: 'fi3ifMXwsAVCbGWtfyIz',
    database: 'brb2lc6xikbxn2q9lkcd',
}

const pool = new Pool(config);
// pool.connect((err, client, done)=>{
//     if(err){
//         console.log("Reached!");
//     }else{
//         client.query(`
//         CREATE TABLE IF NOT EXISTS family_details(
//             id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
//             ml_id uuid,
//             name varchar(100),
//             age int,
//             relation varchar(100),
//             FOREIGN KEY (ml_id) REFERENCES machinary_loan(loan_id)
//         );
//         `).then((result) => {
//             console.log(result);
//             client.end();
//         });
//         console.log("Yeah!!");
//     }
// });

module.exports = { pool };