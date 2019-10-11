const mysql = require('mysql');


connection = mysql.createConnection({
    host            : process.env.DATABASE_HOST,
    port            : process.env.MYSQL_PORT,
    user            : process.env.MYSQL_USER,
    password        : process.env.MYSQL_PASSWORD,
    database        : process.env.MYSQL_DATABASE
});

let LocationModel = {};
LocationModel.getlocation = (callback) => {
    if (connection) {
        connection.query(
            'SELECT * FROM location ORDER BY location_id',
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

LocationModel.getlocationcode = (locationData,callback) => {
    if (connection) {
        connection.query(
            'SELECT * FROM location where location_id=?',locationData.location_id,
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
LocationModel.insertlocation = (locationData, callback) => {
    if (connection) {
        connection.query(
            'INSERT INTO location SET ?', locationData,
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

LocationModel.updatelocation = (locationData, callback) => {
    if (connection) {
        const sql = `
        UPDATE location SET 
		country = ${connection.escape(locationData.country)},
		city= ${connection.escape(locationData.city)},
		state = ${connection.escape(locationData.state)}
        WHERE location_id = ${connection.escape(locationData.location_id)}`;

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

LocationModel.deletelocation = (id, callback) => {
    if (connection) {
        let sql = `
        SELECT * FROM location WHERE location_id = ${connection.escape(id)}`;
        connection.query(sql, (err, row) => {
            if (row) {
                let sql = `DELETE FROM location WHERE location_id = ${id}`;
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

module.exports = LocationModel; 