const fs = require('fs');
const path = require('path');
const multer = require('multer');
const ServerError = require('../errors/ServerError');
const env = process.env.NODE_ENV || 'development';
const { DEV_FILES_PATH } = require('../constants');

const devImagesPath = path.resolve(DEV_FILES_PATH, 'images');
const devContestsPath = path.resolve(DEV_FILES_PATH, 'contests');

const imagePath = env === 'production'
  ? '/var/www/html/images/'
  : devImagesPath;

const contestsPath = env === 'production'
  ? '/var/www/html/contests/'
  : devContestsPath;

if (!fs.existsSync(imagePath)) {
  fs.mkdirSync(imagePath, {
    recursive: true,
  });
}

if (!fs.existsSync(contestsPath)) {
  fs.mkdirSync(contestsPath, {
    recursive: true,
  });
}

const storageImagesFiles = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, imagePath);
  },
  filename(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const storageContestFiles = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, contestsPath);
  },
  filename(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const multerImagesInstance = multer({ storage: storageImagesFiles });
const multerContestsInstance = multer({ storage: storageContestFiles });


module.exports.uploadAvatar = multerImagesInstance.single('file');

module.exports.uploadContestFiles = multerContestsInstance.array(
  'files', 3);

module.exports.updateContestFile = multerContestsInstance.single(
  'file');

module.exports.uploadLogoFiles = multerContestsInstance.single(
  'offerData');

