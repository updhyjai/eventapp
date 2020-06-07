/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const mockData = require("./mockData");

const { events } = mockData;
const dbData = JSON.stringify({ events });
const filepath = path.join(__dirname, "db.json");

fs.writeFile(filepath, dbData, function (err) {
  err ? console.log(err) : console.log("Mock DB created.");
});
