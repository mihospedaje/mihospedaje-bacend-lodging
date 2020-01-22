const mysql = require('mysql');


connection = mysql.createConnection({
    host            : process.env.DATABASE_HOST,
    port            : process.env.MYSQL_PORT,
    user            : process.env.MYSQL_USER,
    password        : process.env.MYSQL_PASSWORD,
    database        : process.env.MYSQL_DATABASE
});
/*
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'lodging'
  });*/

let LodgingImgModel = {};
LodgingImgModel.getlodgingimg = (callback) => {
    if (connection) {
        connection.query(
            'SELECT * FROM lodging_image ORDER BY lodging_image_id',
            (err, rows) => {
                if (err) {
                    throw err
                } else {
                    callback(null, rows)
                }
            }
        )
    }
}
LodgingImgModel.getimagelodging= (lodging_id,callback) => {
    if (connection) {
        connection.query(
            'SELECT * FROM lodging_image where lodging_id=?',lodging_id,
            (err, rows) => {
                if (err) {
                    throw err
                } else {
                    callback(null, rows)
                }
            }
        )
    }
}

LodgingImgModel.getlodgingimgcode = (lodgingImgData,callback) => {
    if (connection) {
        connection.query(
            'SELECT * FROM lodging_image where lodging_image_id=?',lodgingImgData.lodging_image_id,
            (err, rows) => {
                if (err) {
                    throw err
                } else {
                    callback(null, rows)
                }
            }
        )
    }
}

LodgingImgModel.insertlodgingimg = (lodgingImgData, callback) => {
    if (connection) {
        connection.query(
            'INSERT INTO lodging_image SET ?', lodgingImgData,
            (err, result) => {
                if (err) {
                    throw err
                } else {
                    callback(null, {
                        'insertId': result.insertId
                    })
                }
            }
        )}}

LodgingImgModel.updatelodgingimg = (lodgingImgData, callback) => {
    if (connection) {
        const sql = `
        UPDATE lodging_image SET 
		url = ${connection.escape(lodgingImgData.url)}
        WHERE lodging_image_id = ${connection.escape(lodgingImgData.lodging_image_id)}`;

        connection.query(sql, (err, result) => {
            if (err) {
                throw err
            } else {
                callback(null, {
                    "message": "success"
                })
            }
        })
    };
}

LodgingImgModel.deletelodgingimg = (id, callback) => {
    if (connection) {
        let sql = `
        SELECT * FROM lodging_image WHERE lodging_image_id = ${connection.escape(id)}`;
        connection.query(sql, (err, row) => {
            if (row) {
                let sql = `DELETE FROM lodging_image WHERE lodging_image_id = ${id}`;
                connection.query(sql, (err, result) => {
                    if (err) {
                        throw err
                    } else {
                        callback(null, {
                            "message": "deleted"
                        })
                    }
                })
            } else {
                callback(null, {
                    "message": "not exists"
                })
            }
        })
    }
}

module.exports = LodgingImgModel; 