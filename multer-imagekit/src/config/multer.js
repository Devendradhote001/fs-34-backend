import multer from "multer";

let storage = multer.memoryStorage();

let upload = multer({ storage });

export default upload;
