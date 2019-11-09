const mysql = require('mysql');


connection = mysql.createConnection({
    host            : process.env.DATABASE_HOST,
    port            : process.env.MYSQL_PORT,
    user            : process.env.MYSQL_USER,
    password        : process.env.MYSQL_PASSWORD,
    database        : process.env.MYSQL_DATABASE
});
/*var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'lodging'
  });*/

let Lodging_Model = {};
Lodging_Model.getlodging = (callback) => {
    if (connection) {
        connection.query(
            'SELECT * FROM lodging ORDER BY lodging_id',
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

Lodging_Model.getlodgingname = (find,callback) => {
    if (connection) {
        connection.query(
            'SELECT * FROM lodging where lodging_name like ?',"%"+find+"%",
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

Lodging_Model.getlodgingcode = (lodgingData,callback) => {
    if (connection) {
        connection.query(
            'SELECT * FROM lodging where lodging_id=?',lodgingData.lodging_id,
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
Lodging_Model.insertlodging = (lodgingData, callback) => {
    if (connection) {
        connection.query(
            'INSERT INTO lodging SET ?', lodgingData,
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

Lodging_Model.updatelodging = (lodgingData, callback) => {
    if (connection) {
        const sql = `
        UPDATE lodging SET 
		lodging_name = ${connection.escape(lodgingData.lodging_name)},
		phone_number= ${connection.escape(lodgingData.phone_number)},
        lodging_type = ${connection.escape(lodgingData.lodging_type)},
        lodging_class = ${connection.escape(lodgingData.lodging_class)},
        is_exclusive = ${connection.escape(lodgingData.is_exclusive)},
        is_company = ${connection.escape(lodgingData.is_company)},
        guest_number = ${connection.escape(lodgingData.guest_number)},
        rooms_number = ${connection.escape(lodgingData.rooms_number)},
        beds_number = ${connection.escape(lodgingData.beds_number)},
        bathrooms_number = ${connection.escape(lodgingData.bathrooms_number)},
        location_id = ${connection.escape(lodgingData.location_id)},
        address = ${connection.escape(lodgingData.address)},
        extra_address = ${connection.escape(lodgingData.extra_address)},
        time_before_guest = ${connection.escape(lodgingData.time_before_guest)},
        time_arrive_start = ${connection.escape(lodgingData.time_arrive_start)},
        time_arrive_end = ${connection.escape(lodgingData.time_arrive_end)},
        with_wifi = ${connection.escape(lodgingData.with_wifi)},
        with_cable_tv = ${connection.escape(lodgingData.with_cable_tv)},
        with_air_conditioning = ${connection.escape(lodgingData.with_air_conditioning)},
        with_phone = ${connection.escape(lodgingData.with_phone)},
        with_kitchen = ${connection.escape(lodgingData.with_kitchen)},
        with_cleaning_items = ${connection.escape(lodgingData.with_cleaning_items)},
        price_per_person_and_nigth = ${connection.escape(lodgingData.price_per_person_and_nigth)},
        lodging_description = ${connection.escape(lodgingData.lodging_description)},
        lodging_provide = ${connection.escape(lodgingData.lodging_provide)}
        WHERE lodging_id = ${connection.escape(lodgingData.lodging_id)}`;

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

Lodging_Model.deletelodging = (id, callback) => {
    if (connection) {
        let sql = `
        SELECT * FROM lodging WHERE lodging_id = ${connection.escape(id)}`;
        connection.query(sql, (err, row) => {
            if (row) {
                let sql = `DELETE FROM lodging WHERE lodging_id = ${id}`;
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

module.exports = Lodging_Model; 