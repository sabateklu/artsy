DROP DATABASE IF EXISTS art;

CREATE DATABASE art;

USE art;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS art;
DROP TABLE IF EXISTS userfavs;

CREATE TABLE users (
  userid INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(60),
  password CHAR(120),
  PRIMARY KEY (userid)
);

CREATE TABLE art (
  objectid INT NOT NULL,
  primaryImage VARCHAR(200),
  department VARCHAR(150),
  title VARCHAR(500),
  culture VARCHAR(150),
  objectDate VARCHAR(150),
  medium VARCHAR(200),
  region VARCHAR(200),
  country VARCHAR(200),
  artist VARCHAR(200),
  artistBio VARCHAR(1000),
  PRIMARY KEY (objectid)
);

CREATE TABLE userfavs (
  userid INT NOT NULL,
  objectid INT NOT NULL,
  FOREIGN KEY (userid) REFERENCES users(userid),
  FOREIGN KEY (objectid) REFERENCES art(objectid)
);
