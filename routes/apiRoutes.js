const fs = require("fs");
const { v4: uuidv4 } = require('uuid')

//exporting get/post/delete functionality
module.exports = function (app) {
    app.get("/api/notes", (req, res) => {
        fs.readFile("db/db.json", (err, data) => {
            if (err) throw err;
            res.json(JSON.parse(data));
        });
    });

    //Create New Note
    app.post("/api/notes", function (req, res) {
        let userArray = [];
        let userNote = req.body;

        fs.readFile("db/db.json", (err, data) => {
            if (err) throw err;
            userArray = JSON.parse(data);
            //Give input an id
            userNote.id = uuidv4();
            userArray.push(userNote); //push new note to json

            fs.writeFileSync("db/db.json", JSON.stringify(userArray, null, 2), err => {
                if (err) throw err;
            });
        });
        res.json(userNote);
    });

    //Delete Note
    app.delete("/api/notes/:id", (req, res) => {
        let deleted = req.params.id;

        fs.readFile("db/db.json", (err, data) => {
            if (err) throw err;
            notesArray = JSON.parse(data);

            for (let i = 0; i < notesArray.length; i++) {
                if (deleted === notesArray[i].id) {
                    res.json(notesArray.splice(i, 1));
                }
            }
            fs.writeFileSync("db/db.json", JSON.stringify(notesArray, null, 2), err => {
                if (err) throw err;
                console.log(`Deleted Note #${deleted}`)
            });
        });
    });
};


