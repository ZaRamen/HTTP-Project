/*Tools: code editor, browser, command line utility, 
application and server utility, API platform
*/

const express = require('express');
const app = express();

// used for put and post requests to allow express to interpret the data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// let's express know what directory to look for the html/css files
app.use(express.static(__dirname + "/public"));


let music = [
    {
        id: 1,
        name: "That's what makes you beautiful",
        genre: "pop"
    },
    {
        id: 2,
        name: "Night Changes",
        genre: "pop"
    },
    {
        id: 3,
        name: "Lose Yourself",
        genre: "hip hop"
    },
    {
        id: 4,
        name: "In da Club",
        genre: "hip hop"
    },
    {
        id: 5,
        name: " Just Wanna Rock",
        genre: "rap"
    },
    {
        id: 6,
        name: "Rap God",
        genre: "rap"
    },
    {
        id: 7,
        name: "The Four Seasons",
        genre: "classical"
    },
    {
        id: 8,
        name: "Requiem in D Minor",
        genre: "classical"
    },
    {
        id: 9,
        name: "Killer Queen",
        genre: "rock"
    },
    {
        id: 10,
        name: "Made in Heaven",
        genre: "rock"
    },
    {
        id: 11,
        name: "Fly Me To The Moon",
        genre: "jazz"
    },
    {
        id: 12,
        name: "What a Wonderful World",
        genre: "jazz"
    },
    {
        id: 13,
        name: "Cross Road Blues",
        genre: "blues"
    },
    {
        id: 14,
        name: "Slow Blues",
        genre: "blues"
    },
    {
        id: 15,
        name: "Clarity",
        genre: "electronic"
    },
    {
        id: 16,
        name: "Faded",
        genre: "electronic"
    },
]

//=========== ROUTES FOR HTTP GET REQUESTS ==========
app.get('/', (req, res) => {

    res.sendFile(__dirname + "/index.html");

});
app.get('/api/music', (req, res) => {

    res.send(music);

});
app.get('/api/music/:id', (req, res) => {
    const musicList = music.find(c => c.id === parseInt(req.params.id));
    if (!musicList)
    {
        res.status(404).send("Song not found");
        return;
    }
    return res.send(musicList);

});



//=========== ROUTES FOR HTTP POST REQUESTS ==========
app.post('/api/post', (req, res) => {

    console.log(req.body.songName);
    music.push({name: req.body.songName, artist: req.body.songGenre});
    res.send(req.body);


});



//=========== ROUTES FOR HTTP PUT REQUESTS ==========

app.put('/api/put', (req, res) => {

   

});


//=========== ROUTES FOR HTTP DELETE REQUESTS ==========
app.delete('/api/delete', (req, res) => {

    if (req.query.name)
    {
        // filter array to only include songs without the query name
        music = music.filter(s => s.name !== req.query.name);
        res.send("Successfully deleted")
    }
    res.send("Didn't delete the song")
});



app.listen(4000, () => { 
    console.log('app listening on port 4000\nhttp://localhost:4000'); 
});