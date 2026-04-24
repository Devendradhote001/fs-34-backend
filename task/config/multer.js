let multer = require("multer");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    return cb(null, Date.now() + file.originalname);
  },
});

let upload = multer({ storage });
module.exports = upload;
