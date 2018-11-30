const http = require('http')
const fs = require('fs')


const server = http.createServer((req,res) => {
    const url = req.url
    const method = req.method;

    if(url === '/'){
        res.write('<html>')
        res.write('<head><title>Enter msg</title></head>')
        res.write('<body><form action="/message" method="POST"><input type="text"><button type="submit">Submit</button></form></body>')
        res.write('<html>')
        return res.end();
    }

    if(url === '/message' && method === 'POST'){
        const body = [];
        req.on('data',(chunk) =>{
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody)
        });

        fs.writeFile('message.txt', 'DUMMY');
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
    res.setHeader('Content-Type', 'text/html');

    res.write('<html>')
    res.write('<head><title>Test</title></head>')
    res.write('<body>this is a test</body>')
    res.write('<html>')
    res.end();
});

server.listen(2000)