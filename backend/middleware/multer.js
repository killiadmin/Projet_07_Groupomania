const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename : function (req, file, cb) {
        cb(null, useFileName(req, file));
    }});

    function useFileName(req, file) {
        const fileName = `${Date.now()}-${file.originalname}`.replace(/\s/g, "-")
        file.fileName = fileName;
        return fileName;
    };

const uploadImage = multer({ storage: storage});

module.exports = { uploadImage };