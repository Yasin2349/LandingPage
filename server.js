const http = require('http');
const fs = require('fs');
const path = require('path');

// پورت سرور
const PORT = 8000;

const server = http.createServer((req, res) => {
  console.log(`Request: ${req.url}`);

  // مسیر فایل
  let filePath = '.' + req.url;
  if (filePath == './') {
    filePath = './index.html'; // فایل پیش‌فرض
  }

  // پسوند فایل
  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
  };

  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if(error.code == 'ENOENT'){
        res.writeHead(404);
        res.end('File not found');
      }
      else {
        res.writeHead(500);
        res.end('Server error: '+error.code);
      }
    }
    else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });

});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}/`);
});
