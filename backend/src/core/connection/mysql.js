import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  database: "sys",
  password: "Skodal9901*",
});

const createDatabaseQuery = "CREATE DATABASE IF NOT EXISTS caritakip";

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }
  console.log("Connected to MySQL as id " + connection.threadId);

  // Veritabanı oluşturma sorgusunu gönderme
  connection.query(createDatabaseQuery, (err, results, fields) => {
    if (err) {
      console.error("Error creating database: " + err.stack);
      return;
    }
    console.log("New database created successfully");

    // Bağlantıyı kapat
    connection.end();
  });
});

const createTableConnection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  database: "caritakip",
  password: "Skodal9901*",
});

// Tablo oluşturma sorguları
const createTableUsersQuery = `
CREATE TABLE IF NOT EXISTS users (
  id varchar(255) NOT NULL,
  company_name varchar(255) NOT NULL,
  user_name varchar(45) NOT NULL,
  tax_number varchar(11) NOT NULL,
  tax_administration varchar(45) NOT NULL,
  tax_administration_city varchar(45) NOT NULL,
  hashed_password varchar(255) NOT NULL,
  created_at varchar(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY id_UNIQUE (id),
  UNIQUE KEY user_name_UNIQUE (user_name),
  UNIQUE KEY tax_number_UNIQUE (tax_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
`;

const createTableCustomersQuery = `
  CREATE TABLE IF NOT EXISTS customers (
  customer_id varchar(255) NOT NULL,
  customer_name varchar(255) NOT NULL,
  tax_number varchar(11) NOT NULL,
  tax_administration varchar(255) DEFAULT NULL,
  tax_administration_city varchar(255) DEFAULT NULL,
  customer_type varchar(45) NOT NULL,
  created_at varchar(255) NOT NULL,
  is_deleted tinyint unsigned NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

`;

const createTableReceiptsQuery = `
CREATE TABLE IF NOT EXISTS receipts (
  receipt_id varchar(255) NOT NULL,
  customer_id varchar(255) NOT NULL,
  user_id varchar(255) NOT NULL,
  description varchar(1024) NOT NULL,
  document_no varchar(255) NOT NULL,
  price float unsigned NOT NULL,
  receipt_type tinyint unsigned NOT NULL,
  created_date varchar(255) NOT NULL,
  is_deleted tinyint unsigned NOT NULL DEFAULT '0',
  payment_method varchar(45) NOT NULL,
  PRIMARY KEY (receipt_id),
  UNIQUE KEY receipt_id_UNIQUE (receipt_id),
  UNIQUE KEY document_no_UNIQUE (document_no)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
`;

createTableConnection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }
  console.log("Connected to MySQL as id " + createTableConnection.threadId);

  // Tablo oluşturma sorgularını gönderme
  createTableConnection.query(createTableUsersQuery, (err, results, fields) => {
    if (err) {
      console.error("Error creating table: " + err.stack);
      return;
    }
    console.log("Table created successfully");
  });

  createTableConnection.query(createTableCustomersQuery, (err, results, fields) => {
    if (err) {
      console.error("Error creating table: " + err.stack);
      return;
    }
    console.log("Table created successfully");
  });

  createTableConnection.query(createTableReceiptsQuery, (err, results, fields) => {
    if (err) {
      console.error("Error creating table: " + err.stack);
      return;
    }
    console.log("Table created successfully");

    // Bağlantıyı kapat
    createTableConnection.end();
  });
});

// Ana connection oluşturulur ve exportlanır
export const db = mysql
  .createPool({
    host: "localhost",
    port: "3306",
    user: "root",
    database: process.env.DATABASE ?? "caritestdb",
    password: "Skodal9901*",
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  })
  .promise();
