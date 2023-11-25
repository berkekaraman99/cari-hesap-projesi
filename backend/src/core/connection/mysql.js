const mysql = require("mysql2");

// const connection = mysql.createConnection({
//   host: "localhost",
//   port: "3306",
//   user: "root",
//   database: "caritestdb",
//   password: "Skodal9901*",
// });

// const connectSql = async () => {
//   try {
//     await connection.connect((err) => {
//       if (err) {
//         console.error("Veritabanına bağlanılamadı");
//       } else {
//         console.log("Bağlantı başarılı");
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// module.exports = connectSql;

const pool = mysql.createPool({
  host: process.env.HOST,
  port: process.env.DB_PORT,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
});

module.exports = pool.promise();
