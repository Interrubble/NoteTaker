// Creating necessary init consts
const express = require('express');
const data = require('./db/db.json');
const PORT = process.env.PORT || 3001;
const path = require('path');
const fs = require('fs');
const res = require('express/lib/response');
const { v4: uuidv4 } = require('uuid');

const app = express();

// Create app.use instances
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET request for notes.html
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
)

// GET request for /api/notes
app.get('/api/notes', (req, res) =>
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) {
            throw err
        } else {
            const notes = JSON.parse(data);
            res.json(notes)
        }
    })
)

// POST request for /api/notes
app.post("/api/notes",(req,res)=>{
    fs.readFile("./db/db.json","utf-8",(err,data)=>{
        if(err){
            throw err
        } else {
            const notes = JSON.parse(data);
            console.log(req.body)
            notes.push(req.body)
            fs.writeFile("./db/db.json",JSON.stringify(notes,null,2),(err,data)=>{
                if(err){
                    throw err
                }
                else {
                    res.json(notes)
                }
            })
        }
    })
})

// DELETE request for /notes
app.delete("/api/notes/:id",(req,res)=>{
    const id = req.params.id;
    const notes = data;
    notes.splice(id,(err)=>{
        if(err) return (err);
    })
})

// GET request for index.html
app.get('/*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
)

app.listen(PORT, () =>
    console.log(`Express server listening to port ${PORT}`)
)