import express from "express";
import fs from "fs";
const app = express();
app.use(express.json());
const readData = () => {
    const data = fs.readFileSync("./data/faculty.json", "utf-8");
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync(
        "./data/faculty.json",
        JSON.stringify(data, null, 2)
    );
};

app.post("/api/v1/faculty", (req, res) => {

    const allFaculty = readData();

    const newFaculty = {
        id: allFaculty.length > 0
            ? Math.max(...allFaculty.map(f => f.id)) + 1
            : 1,
        ...req.body
    };

    allFaculty.push(newFaculty);

    writeData(allFaculty);

    res.status(201).json({
        message: "Faculty created successfully",
        data: newFaculty
    });
});

app.get("/api/v1/faculty", (req, res) => {

    const dept = req.query.dept;

    let faculty = readData();

    if (dept) {
        faculty = faculty.filter(f => f.dept === dept);
    }

    res.status(200).json({
        message: "Faculty fetched successfully",
        data: faculty
    });
});

app.get("/api/v1/faculty/:id", (req, res) => {

    const facultyId = parseInt(req.params.id);

    const facultyMember = readData()
        .find(f => f.id === facultyId);

    if (facultyMember) {

        res.status(200).json({
            message: "Faculty details fetched successfully",
            data: facultyMember
        });

    } else {

        res.status(404).json({
            message: "Faculty not found"
        });

    }
});

app.put("/api/v1/faculty/:id", (req, res) => {

    const facultyId = parseInt(req.params.id);

    const allFaculty = readData();

    const facultyIndex = allFaculty.findIndex(
        f => f.id === facultyId
    );

    if (facultyIndex !== -1) {

        const updatedFaculty = {
            ...allFaculty[facultyIndex],
            ...req.body
        };

        allFaculty[facultyIndex] = updatedFaculty;

        writeData(allFaculty);

        res.status(200).json({
            message: "Faculty updated successfully",
            data: updatedFaculty
        });

    } else {

        res.status(404).json({
            message: "Faculty not found"
        });

    }
});
 
app.delete("/api/v1/faculty/:id", (req, res) => {

    const facultyId = parseInt(req.params.id);

    const allFaculty = readData();

    const facultyIndex = allFaculty.findIndex(
        f => f.id === facultyId
    );

    if (facultyIndex !== -1) {

        const deletedFaculty =
            allFaculty.splice(facultyIndex, 1)[0];

        writeData(allFaculty);

        res.status(200).json({
            message: "Faculty deleted successfully",
            data: deletedFaculty
        });

    } else {

        res.status(404).json({
            message: "Faculty not found"
        });

    }
});

app.listen(4000, () => {
    console.log("Server is running at http://localhost:4000");
});





























//C:\Users\Rohith>cd C:\Users\Rohith\Desktop\570\express-persistant-app

//C:\Users\Rohith\Desktop\570\express-persistant-app>mkdir data

//C:\Users\Rohith\Desktop\570\express-persistant-app>echo [] > data\faculty.json

//C:\Users\Rohith\Desktop\570\express-persistant-app>dir data
 //Volume in drive C has no label.
 //Volume Serial Number is EC50-98C7

 //Directory of C:\Users\Rohith\Desktop\570\express-persistant-app\data

//08-10-2026  15:24    <DIR>          .
//08-10-2026  15:24    <DIR>          ..
//08-10-2026  15:24                 5 faculty.json
               //1 File(s)              5 bytes
               //2 Dir(s)  11,136,356,352 bytes free

//C:\Users\Rohith\Desktop\570\express-persistant-app>node server.js
//Server is running at http://localhost:4000

//C:\Users\Rohith\Desktop\570\express-persistant-app>curl -X POST http://localhost:4000/api/v1/faculty -H "Content-Type: application/json" -d "{\"name\":\"Ravi\",\"department\":\"ECE\",\"subject\":\"CN\"}"
//{"message":"Faculty created successfully","data":{"id":1,"name":"ch.Akshitha","department":"ECE","subject":"CN"}}
//C:\Users\Rohith\Desktop\570\express-persistant-app>curl http://localhost:4000/api/v1/faculty/1
//{"message":"Faculty details fetched successfully","data":{"id":1,"name":"ch.Akshitha","department":"ECE","subject":"CN"}}
//C:\Users\Rohith\Desktop\570\express-persistant-app>curl -X PUT http://localhost:4000/api/v1/faculty/1 -H "Content-Type: application/json" -d "{\"name\":\"ch.Akshitha\",\"department\":\"ECE\",\"subject\":\"DLCO\"}"
//{"message":"Faculty updated successfully","data":{"id":1,"name":"ch.Akshitha","department":"ECE","subject":"DLCO"}}
//C:\Users\Rohith\Desktop\570\express-persistant-app>curl -X DELETE http://localhost:4000/api/v1/faculty/1
//{"message":"Faculty deleted successfully","data":{"id":1,"name":"ch.Akshitha","department":"ECE","subject":"DLCO"}}