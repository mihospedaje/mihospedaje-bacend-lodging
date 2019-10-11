CREATE DATABASE IF NOT EXISTS lodging;
USE lodging;

CREATE TABLE IF NOT EXISTS location
(
location_id int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
country varchar(255) NOT NULL,
city varchar(255) NOT NULL,
state varchar(255) NOT NULL
)ENGINE=InnoDB DEFAULT CHARACTER SET = utf8;
Describe location;

CREATE TABLE IF NOT EXISTS lodging
(
lodging_id int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
host_id int(10) NOT NULL,
lodging_name varchar(255) NOT NULL,
phone_number int(13) NOT NULL,
lodging_type int(2) NOT NULL,
lodging_class int(2) NOT NULL,
is_exclusive boolean NOT NULL,
is_company boolean NOT NULL,
guest_number int(2) NOT NULL,
rooms_number int(2) NOT NULL,
beds_number int(2) NOT NULL,
bathrooms_number int(2) NOT NULL,
location_id int(10) NOT NULL,
address varchar(255) NOT NULL,
extra_address varchar(255) NOT NULL,
time_before_guest int(2) NOT NULL,
time_arrive_start int(10) NOT NULL,
time_arrive_end int(10) NOT NULL,
with_wifi boolean NOT NULL,
with_cable_tv boolean NOT NULL,
with_air_conditioning boolean NOT NULL,
with_phone boolean NOT NULL,
with_kitchen boolean NOT NULL,
with_cleaning_items boolean NOT NULL,
price_per_person_and_nigth float NOT NULL,
lodging_description varchar(1024) NOT NULL,
lodging_provide int(2) NOT NULL,
FOREIGN KEY (location_id)
        REFERENCES location(location_id)
        ON DELETE CASCADE
        ON UPDATE NO ACTION
)ENGINE=InnoDB DEFAULT CHARACTER SET = utf8;
DESCRIBE lodging;

CREATE TABLE IF NOT EXISTS lodging_image
(
	lodging_image_id int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    lodging_id int(10) NOT NULL,
    url varchar(255),
    FOREIGN KEY (lodging_id)
        REFERENCES lodging(lodging_id)
        ON DELETE CASCADE
        ON UPDATE NO ACTION
)ENGINE=InnoDB DEFAULT CHARACTER SET = utf8;
DESCRIBE lodging_image;

ALTER USER 'mysql'@'%' IDENTIFIED WITH mysql_native_password BY '1234';
FLUSH PRIVILEGES; 