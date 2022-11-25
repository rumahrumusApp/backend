const multer = require("multer");
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./storages/");
  },
  filename: (req, file, cb) => {
    const [prefix] = file.mimetype.split("/");
    const filename = file.originalname.split(".");
    const extension = filename.pop();
    const fileName = `${prefix}-${Date.now()}.${extension}`;

    cb(null, fileName);

    if (!req[`uploaded_${file.fieldname}`])
      req[`uploaded_${file.fieldname}`] = [];
    req[`uploaded_${file.fieldname}`].push(fileName);
  }, 
});

const uploaded = multer({storage: storage});

module.exports = multer({ storage });