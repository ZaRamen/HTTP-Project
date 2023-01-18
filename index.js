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
        month: "January",
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
        month: "May ",
        year: "1937"
    },
    {
     
        name: "Slow Blues",
        genre: "blues",
        month: "November ",
        year: "1941"
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
// adds a unique id to each of the elements in the array

function setIndexes()
{
     music = music.map((obj, index) =>
    {
        return ({id: index + 1, ...obj})
    })
}

setIndexes();


//=========== ROUTES FOR HTTP GET REQUESTS ==========
// Default page
app.get('/', (req, res) => {

    res.sendFile("/index.html");

});
/**
 * Get a list of songs based on the query parameters on the url
 * Query params are month, year. Can be either one, both, or none
 * Example: http://localhost:4000/api/music/?month=September&year=2011
 * Defaults to all the songs in the current music array
 */
app.get('/api/music', (req, res) => {

    // default should be all the songs 
    let musicList = music;
    if (req.body.month)   
    {
        musicList = music.filter(s => s.month === req.body.month);
    }
    else if (req.body.year)
    {
        musicList = music.filter(s => s.year === req.body.year);
    } 
    
    // if query couldn't find anything
    if (musicList.length == 0)
    {
        res.status(404).send("Couldn't find songs based on the query");
        return;
    }
    res.send(musicList);

});
/**
 * Returns a song info based on the id # in the url
 * Example: http://localhost:4000/<id> 
 */
app.get('/api/music/:id', (req, res) => {
    const musicList = music.find(s => s.id === parseInt(req.params.id));
    if (!musicList)
    {
        res.status(404).send("Song not found");
        return;
    }
    return res.send(musicList);

});




//=========== ROUTES FOR HTTP POST REQUESTS ==========
app.post('/api/music', (req, res) => {

    if (!req.body.name || !req.body.genre)
    {
        res.status(404).send("Missing name or genre");
        return;
    }

    if (req.body.name.length < 3)
    {
        res.status(404).send("Name must have more than 3 characters");
        return;
    }
    if (req.body.genre.length < 3)
    {
        res.status(404).send("genre must have more than 3 characters");
        return;
    }

    let song = {
        id: music.length + 1,
        name: req.body.name,
        genre: req.body.genre
    }
    music.push(song);


    res.status(200).send(song);

});



//=========== ROUTES FOR HTTP PUT REQUESTS ==========

app.put('/api/music/:id', (req, res) => {

    if (!req.body.name || !req.body.genre)
    {
        res.status(404).send("Missing name or genre");
        return;
    }
    if (req.body.name.length < 3)
    {
        res.status(400).send("Name must have more than 3 characters");
        return;
    }
    if (req.body.genre.length < 3)
    {
        res.status(400).send("genre must have more than 3 characters");
        return;
    }

    music[req.params.id] = {
        name: req.body.name,
        genre: req.body.genre,
    }
   

});


//=========== ROUTES FOR HTTP DELETE REQUESTS ==========
app.delete('/api/music/:id', (req, res) => {
    
    
    res.send("Didn't delete the song")
});



app.listen(3000, () => { 
    console.log('app listening on port 3000\nhttp://localhost:3000'); 
});