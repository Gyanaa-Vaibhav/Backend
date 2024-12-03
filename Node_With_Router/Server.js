import express from 'express';
import path from "node:path";
import { fileURLToPath } from 'url';

const app = express();
const PORT = 6969;

const __filename = fileURLToPath(import.meta.url); // Resolved path to this file
const __dirname = path.dirname(__filename); // Directory name of this file

// Serve static files from the "dist" folder (React build output)
app.use(express.static(path.join(__dirname, '/dist')));

app.use((req, res, next) => {
    if (req.path.endsWith('.css') || req.path.endsWith('.js') || req.path.endsWith('.png') || req.path.endsWith('.jpg')) {
        res.status(404).send('File not found');
    } else {
        next(); // Pass to the catch-all route
    }
});

const posts = [
    {1:'Hello World'},
    {2:'Hello India'},
]

app.get('/api/posts',(req,res)=>{
    res.json(posts)
})

const getBlog = (blogList,id) => {
    const value = blogList.filter(post => {
        const ans = String(Object.keys(post)) === id
        return ans
    })

    if(value.length > 0) return value[0]

    return false
}

app.get('/api/posts/:id',(req,res)=>{

    const blog = getBlog(posts,req.params.id)

    if(!blog) {
        return res.status(404).json({'message': 'File not found'})
    }
    res.status(200).json(blog)
})

app.get('*/posts', (req, res) => {
    console.log("Inside */Posts")
    res.json(posts)
});

// Catch-all route to serve React's index.html for frontend routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
})
