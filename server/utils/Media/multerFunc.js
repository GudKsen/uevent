import multer from "multer";

export const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (req.body.full_name) {
      cb(null, "../server/public/avatars/");
    } else {
      cb(null, "../server/public/images/");
    }
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    if (req.body.full_name) {
      cb(null, `${req.body.email}_${new Date().getTime()}.${ext}`);
    } else {
      cb(null, `${new Date().getTime()}.${ext}`);
    }
  },
});

export const multerStorageCompany = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../server/public/company/");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];

    cb(null, `${req.params.id}_${new Date().getTime()}.${ext}`);
  },
});

export const multerStorageUser = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../server/public/avatars/");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];

    cb(null, `user_${req.params.id}_${new Date().getTime()}.${ext}`);
  },
});

export const multerFilter = (req, file, cb) => {
  if (
    file.mimetype.split("/")[1] === "png" ||
    file.mimetype.split("/")[1] === "jpg" ||
    file.mimetype.split("/")[1] === "jpeg" ||
    file.mimetype.split("/")[1] === "gif"
  ) {
    cb(null, true);
  } else {
    console.log("tyt");
    cb(new Error("Not a png or jpg File!!"), false);
  }
};
