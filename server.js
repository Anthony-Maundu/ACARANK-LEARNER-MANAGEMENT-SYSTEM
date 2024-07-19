const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Ensure folders exist
const documentsDir = path.join(__dirname, 'documents');
const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(documentsDir)) fs.mkdirSync(documentsDir);
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir);

// Set up storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'transfer-letter' || file.fieldname === 'birth-certificate') {
            cb(null, documentsDir);
        } else if (file.fieldname === 'learner-photo') {
            cb(null, imagesDir);
        } else {
            cb(new Error('Invalid fieldname'), null);
        }
    },
    filename: function (req, file, cb) {
        const fileExt = path.extname(file.originalname);
        const fileName = `${req.body['learner-admission-number']}-${file.fieldname}${fileExt}`;
        cb(null, fileName);
    }
});

const upload = multer({ storage: storage });

// Middleware for JSON body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static('public'));

// Handle file upload
app.post('/upload', upload.fields([
    { name: 'transfer-letter', maxCount: 1 },
    { name: 'birth-certificate', maxCount: 1 },
    { name: 'learner-photo', maxCount: 1 }
]), (req, res) => {
    res.send('Files uploaded successfully');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
