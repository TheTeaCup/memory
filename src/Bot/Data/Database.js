/* Database */
const enmap = require('enmap');
const enmapSQLite = require('enmap-sqlite');

module.exports = Bumper => {
  console.log("(Bot) Database Up!");
let Memory = Bumper;
  
Memory.userParagraphs = new enmap({ name: "userParagraphs" });
Memory.queuePara = new enmap({ name: "queued" });
Memory.paragraphs = new enmap({ name: "para" });
Memory.paraUsers = new enmap({ name: "users" });
  
};