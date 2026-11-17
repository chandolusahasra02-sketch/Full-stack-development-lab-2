import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
const app=express();
app.use(cors());
app.use(morgan('dev'));
const logger=(req,res,next)=>{
    const start=Date.now();
    res.on('finish',()=>{
        const duration=Date.now()-start;
        const log=`${req.method} ${req.url} ${res.statusCode} ${duration}ms\n`;
        fs.appendFile('./server.log',log,(error)=>{
            if(error){
                console.log("Failed to wirte to log file:",error);

            }
        });

    });
    next();
};


app.use(logger);
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const validate=(req,res,next)=>{
    const {name,ward,gender,age}=req.body;
    if(!name||!ward||!gender){
        const error=new Error("Patient details missing");
        error.status=400;
        throw error;
    }
    
    next();
};
app.post("/api/v1/patients",(req,res)=>{
res.status(200)
.send("Patient record created successfully");
});
app.get("/api/v1/patients",(req,res)=>{
res.status(200)
.send("all Patient records retrieved successfully");
});

app.get("/api/v1/patients/:id",(req,res)=>{
    const id=req.params.id;
    res.status(200).send(`patient with ${id} record fetched successfully`);
});

app.get("/api/v1/patients",(req,res)=>{
const ward=req.query.ward;
if(ward){
    res.status(200).send(`Patient records in ward ${ward} fetched successfully`);
}
else{
    res.status(200).send("all Patient records retrieved successfully");
}
});

app.put("/api/v1/patients/:id",(req,res)=>{
const id=req.params.id;
res.status(200).send(`patient with ${id} record updated successfully`);
});

app.delete("/api/v1/patients/:id",(req,res)=>{
const id=req.params.id;
res.status(200).send(`patient with ${id} record deleted successfully`);
});

app.use((req,res)=>{
res.status(404).send("Route not found");
});

app.use((err,req,res,next)=>{
const status=err.status||500;
const message=err.message||"Internal Server Error";
res.status(status).send(message);
});

app.listen(3000,()=>{
console.log("Server is running on port 3000");
});



























//curl -X POST http://localhost:3000/api/v1/patients -H "Content-Type: application/json" -d "{\"name\":\"Ravi\",\"ward\":\"General\",\"gender\":\"Male\",\"age\":20}"
//curl -X POST http://localhost:3000/api/v1/patients -H "Content-Type: application/json" -d "{\"name\":\"Kiran\",\"ward\":\"General\",\"gender\":\"Male\",\"age\":22}"
//curl http://localhost:3000/api/v1/patients
//curl http://localhost:3000/api/v1/patients/1
//curl "http://localhost:3000/api/v1/patients?ward=General"
//curl -X PUT http://localhost:3000/api/v1/patients/1 -H "Content-Type: application/json" -d "{\"name\":\"Ravi Kumar\",\"ward\":\"ICU\",\"gender\":\"Male\",\"age\":21}"
//curl -X DELETE http://localhost:3000/api/v1/patients/1