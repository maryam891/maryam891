const { request } = require("express");
const express = require("express");
const sql = require("mssql");
const app = express();
const isbn = "9";
sql.input("isbn", sql.VarChar, isbn);
const connectionsetting = {
  server: "localhost",
  database: "Bokhandel",
  user: "Maryam",
  password: "Maaryam8@",
  options: {
    trustedConnection: true,
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};
app.get("/", async (req, res) => {
  try {
    const connection = await sql.connect(connectionsetting);
    const result = await connection
      .request()
      .query(
        "select böcker.Titel,böcker.ISBN13,författare.Förnamn,böcker.Pris from böcker INNER JOIN författare ON böcker.FörfattareID=författare.ID where isbn=@isbn%9%"
      );
    console.log(result);
    try {
      res.render("böcker.pug", { böcker: result.recordset });
    } catch (ex) {
      console.log(ex);
    }
  } catch (ex) {
    console.log(ex);
  }
});
app.get("/book/:isbn", async (req, res) => {
  var isbn = req.params["isbn"];
  try {
    const connection = await sql.connect(connectionsetting);
    const result = await connection
      .request()
      .query(
        "select Titel,ISBN13,Språk,Pris,Utgivningsdatum from böcker where ISBN13=" +
          isbn
      );
    console.log(result);
    try {
      res.render("bok.pug", { böcker: result.recordset });
    } catch (ex) {
      console.log(ex);
    }
  } catch (ex) {
    console.log(ex);
  }
});
app.listen(3000, () => {
  console.log("server is listening on port: 3000...");
});
