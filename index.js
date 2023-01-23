/*Tools: code editor, browser, command line utility, 
application and server utility, API platform
*/
// Raymond Lin Pd 7-8 Even 
/**
 * 1) This program allows the front end to communicate with the backend server. This allows the front end to first talk to the
 *    backend server to get data or change existing data. This software allows us to store and alter data about music.
 *    The GET request allows us to display a specific song based on the id or all the songs. The PUT request allows us to alter
 *    the existing data. The POST request allows us to add new data to the existing data. The DELETE request allows us to delete
 *    an existing song from the data.
 * 2) This project taught me how the front end can talk to the backend and how each of the essential http requests work. 
 *    (GET, POST, PUT, DELETE)
 * 3) This project can be further extended to use an actual database such as mongodb. We can use this database to store
 *    user information and load the user's unique music list.
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
        year: "1725"
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
 * Get a list of songs based on the postman data sent in json format
 */
app.get('/api/music', (req, res) => {

    // default should be all the songs 
    let musicList = music;

    if (!req.body.month || !req.body.year)
    {
        if (req.body.month)   
        {
            musicList = music.filter(s => s.month === req.body.month);
        }
        if (req.body.year)
        {
            musicList = music.filter(s => s.year === req.body.year);
        } 
    }
    else if (req.body.month && req.body.year)
    {
        musicList = music.filter(s => s.month === req.body.month && s.year === req.body.year);
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

    if (req.body.name.length < 3 || req.body.name.length >= 40)
    {
        res.status(404).send("Name must have at least 3 characters or less than 40 characters ");
        return;
    }
    if (req.body.genre.length < 3 || req.body.genre.length >= 40)
    {
        res.status(404).send("Genre must have at least 3 characters or less than 40 characters ");
        return;
    }

    let song = {
        id: music.length + 1,
        name: req.body.name,
        genre: req.body.genre,
        month: req.body.month ? req.body.month : "Unknown",
        year: req.body.year ? req.body.year : "Unknown",
    }
    music.push(song);


    res.status(200).send(music);

});



//=========== ROUTES FOR HTTP PUT REQUESTS ==========

app.put('/api/music/:id', (req, res) => {

    if (!req.body.name || !req.body.genre)
    {
        res.status(404).send("Missing name or genre");
        return;
    }
    if (req.params.id < 0 || req.params.id > music.length)
    {
        res.status(400).send("Invalid id");
        return;
    }
    if (req.body.name.length < 3 || req.body.name.length >= 40)
    {
        res.status(404).send("Name must have at least 3 characters or less than 40 characters ");
        return;
    }
    if (req.body.genre.length < 3 || req.body.genre.length >= 40)
    {
        res.status(404).send("Genre must have at least 3 characters or less than 40 characters ");
        return;
    }

    music[req.params.id - 1] = {
        id: parseInt(req.params.id),
        name: req.body.name,
        genre: req.body.genre,
        month: req.body.month ? req.body.month : "Unknown",
        year: req.body.year ? req.body.year : "Unknown",
    }
    

    res.status(200).send(music[req.params.id - 1]);
   

});


//=========== ROUTES FOR HTTP DELETE REQUESTS ==========
app.delete('/api/music/:id', (req, res) => {
    

    const song = music.find(s => s.id === parseInt(req.params.id));

    if (!song)
    {
        res.status(404).send("Couldn't find song");
        return;
    }
    let objIndex = music.indexOf(song);
    
    // delete the song at that index, second param means # of deletions
    music.splice(objIndex, 1);
    
    //updates each song with their new id
    music.forEach((obj, index) =>
    {
        obj.id = index + 1;
    })

    res.status(200).send("Song deleted successfully");

});



app.listen(3000, () => { 
    console.log('app listening on port 3000\nhttp://localhost:3000'); 
});
