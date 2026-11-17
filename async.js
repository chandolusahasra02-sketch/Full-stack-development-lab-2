import fs from "fs";

const data = "Hello this is sample text to demonstrate file operation in Node.js";

fs.writeFile("sample.txt", data, "utf-8", (error) => {
    if (error) {
        return console.log(error);
    }

    console.log("Data written successfully");

    fs.readFile("sample.txt", "utf-8", (error, readData) => {
        if (error) {
            return console.log(error);
        }

        console.log("File Content:");
        console.log(readData);

        fs.appendFile("sample.txt", "\nWelcome to fs lab", "utf-8", (error) => {
            if (error) {
                return console.log(error);
            }

            console.log("Data appended successfully");

            fs.unlink("sample.txt", (error) => {
                if (error) {
                    return console.log(error);
                }

                console.log("File deleted successfully");
            });
        });
    });
});