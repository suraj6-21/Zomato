const multer = require("multer");


const MAX_VIDEO_SIZE = 100 * 1024 * 1024;


const videoFileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("video")) {
        cb(null, true);
    } else {
        cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "File type not supported. Please upload a video."
        ), false);
    }
};

// Configure multer
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: MAX_VIDEO_SIZE
    },
    fileFilter: videoFileFilter
});

module.exports = upload;