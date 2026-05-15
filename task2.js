const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true}));

app.get("/", (req, res) => {

    fs.readFile("messages.txt", "utf8", (err, data) => {

        if (err) {
            return res.send("Error reading file");
        }

        // Convert file text into array
        const messages = data.split("\n");

        res.render("index", { messages });
    });
});

app.post("/add-message", (req, res) => {

    const newMessage = req.body.message;

    const filePath = path.join(__dirname, "messages.txt");

    // Existing messages read karo
    fs.readFile(filePath, "utf8", (err, data) => {

        if (err) {
            console.log(err);

            return res.send("Error reading file");
        }

        // New message ko top par add karo
        const updatedMessages =
            newMessage + "\n" + data;

        // File overwrite karo
        fs.writeFile(
            filePath,
            updatedMessages,
            (err) => {

                if (err) {
                    console.log(err);

                    return res.send("Error writing file");
                }

                res.redirect("/");
            }
        );
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});