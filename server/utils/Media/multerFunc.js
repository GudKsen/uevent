import multer from "multer";

export const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      if (req.body.login) {
        cb(null, "./uploads/avatars/");
      }
      else {
        cb(null, "./uploads/pictures/");
      }
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      if (req.body.login) {
        cb(null, `${req.body.login}_${new Date().getTime()}.${ext}`);
      }
      else {
        cb(null, `${new Date().getTime()}.${ext}`);
      }
    },
});
  
export const multerFilter = (req, file, cb) => {
    if (
      file.mimetype.split("/")[1] === "png" ||
      file.mimetype.split("/")[1] === "jpg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Not a png or jpg File!!"), false);
    }
};



