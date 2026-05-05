let multer = require("multer");

let storage = multer.memoryStorage();

let upload = multer({ storage });

module.exports = upload;
