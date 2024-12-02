import express from 'express';
import fs from 'fs';
const app = express();
const PORT = 5173

app.get('/',(req,res)=>{
    const fileReadable = fs.createReadStream('./input.txt')

    fileReadable.on('data',(chunk)=>{
        res.write(chunk.toString())
    })

    fileReadable.on('end',()=>{
        res.end()
        console.log("Completed reading file")
    })
})

app.get('/video',(req,res)=>{
    res.writeHead(200,{
        'Content-Type': 'video/mp4',
    })
    const fileReadable = fs.createReadStream('./video.mp4')

    fileReadable.on('data',(chunk)=>{
        res.write(chunk);
    })

    fileReadable.on('end',()=>{
        res.end()
    })

    fileReadable.on('err',()=>{
        console.error('Error reading the file:', err);
        res.status(500).send('Error streaming the video');
    })
})

app.get('/img',(req,res)=>{
    res.writeHead(200,{
        'Content-Type': 'image/jpg',
    })
    const fileReadable = fs.createReadStream('./img.jpg')

    fileReadable.on('data',(chunk)=>{
        res.write(chunk);
    })

    fileReadable.on('end',()=>{
        res.end()
    })

    fileReadable.on('err',()=>{
        console.error('Error reading the file:', err);
        res.status(500).send('Error streaming the video');
    })
})


app.get('/video2', (req, res) => {
    const videoPath = './video.mp4';
    const videoStat = fs.statSync(videoPath);
    const fileSize = videoStat.size;

    const range = req.headers.range; // Get the Range header from the request

    if (range) {
        // Parse the Range header (e.g., "bytes=0-")
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        // Ensure the range is valid
        if (start >= fileSize || end >= fileSize) {
            res.status(416).send('Requested Range Not Satisfiable');
            return;
        }

        const chunkSize = end - start + 1;
        const fileStream = fs.createReadStream(videoPath, { start, end });

        res.writeHead(206, {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'video/mp4',
        });

        fileStream.pipe(res); // Stream the video chunk to the client
    } else {
        // If no Range header is provided, send the entire file
        res.writeHead(200, {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        });

        fs.createReadStream(videoPath).pipe(res);
    }
});


app.listen(PORT,()=>{
    console.log(`Listening to Port ${PORT}`)
})
