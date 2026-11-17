import http from 'http';
const students=[
    {
        name:'ravi',
        age:20
    }
];
const server=http.createServer((req,res)=>{
    const{method,url}=req;
    if(method==='GET' && url==='/students'){
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(JSON.stringify(students));
    }
    if(method==='POST' && url==='/students'){
        let body='';
        req.on('data',(chunk)=>{
            body+=chunk.toString();
        });
        req.on('end',()=>{
            const newStudent=JSON.parse(body);
            students.push(newStudent);
            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify({
                message:'Student created successfully',
                data:newStudent,
            }));
        });
    }
});
server.listen(3000,()=>{
    console.log('Server is running on http://localhost:3000');
});