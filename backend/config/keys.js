let config = {};

if (process.env.NODE_ENV !== "production") {
  config = {
    dbhost: "35.199.95.35",
    dbuser: "main",
    dbpassword: "eocc2019",
    dbname: "gameduc",
    jwtsecret: "abcd1234"
  };
} else {
  config = {
    dbhost: process.env.DB_HOST,
    dbuser: process.env.DB_USER,
    dbpassword: process.env.DB_PASSWORD,
    dbname: process.env.DB_DATABASE,
    jwtsecret: process.env.JWT_SECRET
  };
}

module.exports = config;
