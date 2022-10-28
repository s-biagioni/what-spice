const express = require('express');
const Joi = require('joi'); //used for validation
const app = express();
app.use(express.json());

const fs = require("fs");
let spices = [];

// const spices = [
// {id: 1, food: "salmon", spice: "thyme"},
// {id: 2, food: "salmon", spice: "curry"},
// {id: 3, food: "broccoli", spice: "dill"}
// ]


fs.readFile("./data/spices.json", "utf8", (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err);
        return;
    }
    try {
        const result = JSON.parse(jsonString);
        spices = result.spices;
        console.log("List of Spices:", spices);
    } catch (err) {
        console.log("Error parsing JSON string:", err);
    }
});


//READ Request Handlers
app.get('/', (req, res) => {
    res.send('Welcome to What Spice!');
});
 
app.get('/api/spices', (req,res)=> {
    res.send(spices);
});
 

app.post('/api/spices', (req, res)=> {
    const { error } = validateFood(req.body);
    if (error){
        res.status(400).send(error.details[0].message)
        return;
    }

    console.log('received food: ' + req.body.food);

    const spicesForFood = spices.filter(c => c.food === req.body.food);

    if (!spicesForFood) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>');
    
    res.send(spicesForFood);
});



// app.get('/api/spices/:id', (req, res) => {
//     const spice = spices.find(c => c.id === parseInt(req.params.id));
    
//     if (!spice) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>');
//     res.send(spice);
// });
 
// //CREATE Request Handler
// app.post('/api/spices', (req, res)=> {
 
//     const { error } = validateSpice(req.body);
//     if (error){
//         res.status(400).send(error.details[0].message)
//         return;
//     }
//     const spice = {
//         id: spices.length + 1,
//         food: req.body.food,
//         spice: req.body.spice
//     };
//     spices.push(spice);
//         res.send(spice);
// });
 
// //UPDATE Request Handler
// app.put('/api/spices/:id', (req, res) => {
//     const spice = spices.find(c=> c.id === parseInt(req.params.id));
//     if (!spice) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!! </h2>');
//     const { error } = validateSpice(req.body);
//     if (error){
//         res.status(400).send(error.details[0].message);
//         return;
//     }
 
//     spice.food = req.body.food;
//     res.send(spice);
// });
 
// //DELETE Request Handler
// app.delete('/api/spices/:id', (req, res) => {
 
//     const spice = spices.find( c=> c.id === parseInt(req.params.id));
//     if(!spice) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;"> Not Found!! </h2>');
    
//     const index = spices.indexOf(spice);
//     spices.splice(index,1);
    
//     res.send(spice);
// });
 
// function validateSpice(spice) {
//     const schema = {
//         food: Joi.string().min(3).required()
//     };
//     return Joi.validate(spice, schema);
 
// }

function validateFood(food) {
    const schema = {
        food: Joi.string().min(3).required()
    };
    return Joi.validate(food, schema);
}
 
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));