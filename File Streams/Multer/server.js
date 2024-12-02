import express from 'express';
import path from "node:path";
import url from "node:url";
import multer from 'multer';
import fs from "node:fs";
import pdfjsLib from "pdf-parse/lib/pdf.js/v1.10.88/build/pdf.js";

const app = express()
const PORT = 5173

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const upload = multer({ dest: 'uploads/' })

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})

app.post('/profile',upload.single('avatar'),(req,res)=>{
    if (!req.file) {
        return res.status(400).json({ 'Error': 'No file uploaded' });
    }

    console.log(req.file)
    console.log(req.file['mimetype'])

    if(req.file['mimetype'] == 'application/pdf'){
        // Send a JSON or redirect to the thanks page
        fs.readFile(path.join(__dirname,`./${req.file['path']}`),async (err,data)=>{
            if(err){
                console.error('Error reading file:', err);
                return res.status(500).json({ error: 'Failed to process the uploaded file' });
            }

            // Use the pdfjs-dist legacy build
            pdfjsLib.getDocument({ data }).promise
                .then(async (pdfDoc) => {
                    console.log(`Number of pages: ${pdfDoc.numPages}`);

                    for (let i = 1; i <= pdfDoc.numPages; i++) {
                        const page = await pdfDoc.getPage(i);
                        const textContent = await page.getTextContent();
                        const pageText = textContent.items.map(item => item.str).join(' ');

                        console.log(`Page ${i} Text:`, pageText);
                    }
                })
                .catch(err => {
                    console.error('Error processing PDF:', err);
                });

            res.status(200).json({ message: 'File uploaded and processed successfully!' });
        })
    }else {
        // Delete the uploaded file
        try {
            fs.unlinkSync(req.file.path);
            console.log('Invalid file deleted:', req.file.path);
        } catch (err) {
            console.error('Error deleting file:', err);
        }

        // Send an error response or redirect
        res.status(400).json({ error: 'Please upload a PDF file!' });
    }
})

app.listen(PORT,()=>{
    console.log("Yes")
})