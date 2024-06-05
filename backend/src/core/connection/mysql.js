import mysql from "mysql2";

const connection = mysql.createConnection({
  host: process.env.HOST ?? "localhost",
  port: process.env.DB_PORT ?? "3306",
  user: process.env.USER ?? "root",
  database: process.env.SYS_DATABASE ?? "sys",
  password: process.env.DATABASE ?? "Skodal9901*",
});

const createDatabaseQuery = "CREATE DATABASE IF NOT EXISTS " + process.env.DATABASE ?? "caritakipdb";

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }
  console.log("Connected to MySQL as id " + connection.threadId);

  connection.query(createDatabaseQuery, (err, results, fields) => {
    if (err) {
      console.error("Error creating database: " + err.stack);
      return;
    }
    console.log("New database created successfully");

    connection.end();
  });
});

const createTableConnection = mysql.createConnection({
  host: process.env.HOST ?? "localhost",
  port: process.env.DB_PORT ?? "3306",
  user: process.env.ROOT ?? "root",
  database: process.env.DATABASE ?? "caritakipdb",
  password: process.env.PASSWORD ?? "Skodal9901*",
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
  address varchar(255) DEFAULT NULL,
  email varchar(255) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY id_UNIQUE (id),
  UNIQUE KEY user_name_UNIQUE (user_name),
  UNIQUE KEY tax_number_UNIQUE (tax_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
`;

const createTableCustomersQuery = `
  CREATE TABLE IF NOT EXISTS customers (
  customer_id varchar(255) NOT NULL,
  user_id varchar(255) NOT NULL,
  customer_name varchar(255) NOT NULL,
  tax_number varchar(11) NOT NULL,
  tax_administration varchar(255) DEFAULT NULL,
  tax_administration_city varchar(255) DEFAULT NULL,
  customer_type varchar(45) NOT NULL,
  created_at varchar(255) NOT NULL,
  is_deleted tinyint unsigned NOT NULL DEFAULT '0',
  address varchar(255) DEFAULT NULL,
  email varchar(255) DEFAULT NULL,
  PRIMARY KEY(customer_id)
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

const createProcGetReceiptById = `
CREATE PROCEDURE IF NOT EXISTS get_receipt_by_id(IN receiptid VARCHAR(255))
BEGIN
  SELECT document_no, receipts.description, price, receipt_type, receipts.created_date, payment_method, customer_name, customers.tax_number customer_tax, customers.tax_administration customer_tax_a, customers.tax_administration_city customer_tax_ac, customer_type, customers.address customer_address,
  users.address user_address, users.company_name, users.tax_number user_tax, users.tax_administration user_tax_a, users.tax_administration_city user_tax_ac
  FROM receipts LEFT JOIN customers ON receipts.customer_id = customers.customer_id LEFT JOIN users ON receipts.user_id = users.id 
  WHERE receipts.receipt_id = receiptid;
END 
`;

createTableConnection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }
  console.log("Connected to MySQL as id " + createTableConnection.threadId);

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
  });

  createTableConnection.query(createProcGetReceiptById, (err, results, fields) => {
    if (err) {
      console.error("Error creating table: " + err.stack);
      return;
    }
    console.log("Procedure created successfully");

    createTableConnection.end();
  });
});

export const db = mysql
  .createPool({
    host: process.env.HOST ?? "localhost",
    port: process.env.DB_PORT ?? "3306",
    user: process.env.ROOT ?? "root",
    database: process.env.DATABASE ?? "caritakipdb",
    password: process.env.DATABASE ?? "Skodal9901*",
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  })
  .promise();
