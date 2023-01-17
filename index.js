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
        name: "That's what makes you beautiful",
        genre: "pop",
        month: "September",
        year: "2011",
    },
    {
        name: "Night Changes",
        genre: "pop",
        month: "November",
        year: "2014"

    },
    {
        name: "Lose Yourself",
        genre: "hip hop",
        month: "October",
        year: "2002"
    },
    {
         
        name: "In da Club",
        genre: "hip hop",
        month: "January",
        year: "2003"
    },
    {
         
        name: " Just Wanna Rock",
        genre: "rap",
        month: "October",
        year: "2022"
    },
    {
        
        name: "Rap God",
        genre: "rap",
        month: "October",
        year: "2013"
    },
    {
        
        name: "The Four Seasons",
        genre: "classical",
        month: "Unknown",
        year: "1725 "
    },
    {
  
        name: "Requiem in D Minor",
        genre: "classical",
        month: "December",
        year: "1791"
    },
    {
      
        name: "Killer Queen",
        genre: "rock",
        month: "October",
        year: "1974"
    },
    {
 
        name: "Made in Heaven",
        genre: "rock",
        month: "November",
        year: "1995"
    },
    {
   
        name: "Fly Me To The Moon",
        genre: "jazz",
        month: "April",
        year: "1954"
    },
    {
  
        name: "What a Wonderful World",
        genre: "jazz",
        month: "September",
        year: "1967"
    },
    {
   
        name: "Cross Road Blues",
        genre: "blues",
        month: "November",
        year: "20"
    },
    {
     
        name: "Slow Blues",
        genre: "blues",
        month: "May",
        year: "1937"
    },
    {
     
        name: "Clarity",
        genre: "electronic",
        month: "November",
        year: "2012"
    },
    {
     
        name: "Faded",
        genre: "electronic",
        month: "December",
        year: "2015"
    },
]

// uses the index as the value of the id
music = music.map((obj, index) =>
{
    return ({id: index + 1, ...obj})
})

console.log(music)
//=========== ROUTES FOR HTTP GET REQUESTS ==========
app.get('/', (req, res) => {

    res.sendFile("/index.html");

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
app.get('/api/music/:month')
{

}



//=========== ROUTES FOR HTTP POST REQUESTS ==========
app.post('/api/post', (req, res) => {

    

});



//=========== ROUTES FOR HTTP PUT REQUESTS ==========

app.put('/api/put', (req, res) => {

   

});


//=========== ROUTES FOR HTTP DELETE REQUESTS ==========
app.delete('/api/delete/:id', (req, res) => {

    
    res.send("Didn't delete the song")
});



app.listen(4000, () => { 
    console.log('app listening on port 4000\nhttp://localhost:4000'); 
});