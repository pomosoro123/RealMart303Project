const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;
const FRONTEND_DIR = path.join(__dirname, 'frontend');

const server = http.createServer((req, res) => {
    let filePath = path.join(FRONTEND_DIR, req.url);
    
    // If requesting a directory, serve index.html
    if (req.url === '/' || req.url === '') {
        filePath = path.join(FRONTEND_DIR, 'index.html');
    }
    
    // Default to index.html for non-existent paths (for SPA routing)
    const ext = path.extname(filePath);
    if (!ext) {
        filePath = path.join(FRONTEND_DIR, 'index.html');
    }
    
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 - File Not Found</h1>', 'utf-8');
            console.log(`404: ${req.url}`);
            return;
        }
        
        let contentType = 'text/html';
        const extension = path.extname(filePath).toLowerCase();
        
        switch (extension) {
            case '.js':
                contentType = 'application/javascript';
                break;
            case '.css':
                contentType = 'text/css';
                break;
            case '.json':
                contentType = 'application/json';
                break;
            case '.png':
                contentType = 'image/png';
                break;
            case '.jpg':
            case '.jpeg':
                contentType = 'image/jpeg';
                break;
            case '.gif':
                contentType = 'image/gif';
                break;
            case '.svg':
                contentType = 'image/svg+xml';
                break;
        }
        
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
        console.log(`200: ${req.url}`);
    });
});

server.listen(PORT, () => {
    console.log(`\n╔════════════════════════════════════════════════════════════════╗`);
    console.log(`║       REALMART - Local Development Server Running             ║`);
    console.log(`╠════════════════════════════════════════════════════════════════╣`);
    console.log(`║  Server: http://localhost:${PORT}                                ║`);
    console.log(`║  Frontend Directory: ${FRONTEND_DIR}                   ║`);
    console.log(`║  Press Ctrl+C to stop the server                             ║`);
    console.log(`╚════════════════════════════════════════════════════════════════╝\n`);
});
