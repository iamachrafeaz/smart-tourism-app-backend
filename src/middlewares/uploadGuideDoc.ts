import multer from "multer";
import fs from "fs";
import path from "path";

const ensureDir = (dir: string) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        let uploadPath = "uploads/guides";
        if (file.fieldname === "selfie") {
            uploadPath += "/selfies"
        } else if (file.fieldname === "govId") {
            uploadPath += "/govIds"
        } else if (file.fieldname === "certifications") {
            uploadPath += "/certifications";
        }

        ensureDir(uploadPath);

        callback(null, uploadPath);
    },
    filename(req, file, callback) {
        const ext = path.extname(file.originalname);
        const fileName = `${file.fieldname}-${Date.now()}${ext}`;
        callback(null, fileName)
    },
})

const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
    if (
        file.fieldname === "selfie" &&
        file.mimetype.startsWith("image/")
    ) {
        return cb(null, true);
    }

    if (
        file.fieldname === "govId" &&
        (file.mimetype.startsWith("image/") || file.mimetype === "application/pdf")
    ) {
        return cb(null, true);
    }

    if (file.fieldname === "certifications") {
        return cb(null, true);
    }

    const err = new multer.MulterError("LIMIT_UNEXPECTED_FILE");
    err.message = "Only image files are allowed";
    cb(err as any, false);
};

export const uploadGuideDocs = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
});
