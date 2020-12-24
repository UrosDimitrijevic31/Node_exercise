const  express = require('express');
const app = express(); //nasa aplikacija
const Joi = require('joi');

app.use(express.json()) //zbog req.body.name , zbog middleware-a

const courses = [
    {id: 1, name: 'Java'},
    {id: 2, name: 'JavaScript'},
    {id: 3, name: 'Node.js'},
    {id: 4, name: 'Vue'},
    {id: 5, name: 'MySQL'}
]

//callback function (req, res) =>{ .. } - se naziva ROUTE HANDLER
app.get('/', (req, res) => {
    res.send('<h1>Cao iz express-a</h1>')
});

//svi kursevi
app.get('/api/courses', (req, res) => {
    res.send(courses)
})

//dobijanje kursa po id-ju
app.get('/api/coursess/:id', (req, res) => {     
    let course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) res.status(404).send('The course with given id not found');
    res.send(course);
})

//novi kurs
app.post('/api/courses', (req, res) =>{
    const schema = {
       name:  Joi.string().min(3).required()
    }    
    let { error } = Joi.validate(req.body, schema);
    
    if(error) return res.status(400).send(error.details[0].message)

    let course = {
        id: courses.length + 1,
        name: req.body.name
    } 
    courses.push(course);
    res.send(course);
})

//apdejtovanje kursa
app.put('/api/courses/:id', (req, res) => {
    //proverim da li posotji kurs
    let course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send('The course with given id not found');

    //proverim da li je uneo dobro ime novog kursa
    validateCourse(req.body)
    const schema = {
        name:  Joi.string().min(3).required()
    }    
    let { error } = Joi.validate(req.body, schema); // { error } -> destruktuiranje objekta, isto sto i result.error
    
    if(error) {
        res.status(400).send(error.details[0].message)
    }

    //zamenim kursa sa posotojecim
    course.name = req.body.name;
    res.send(course);
})

//brisanje kursa
app.delete('/api/courses/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send('The course with given id not found');

    let index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);

})

//pomocna metoda za validaciju
function validateCourse(course) {
    const schema = {
        name:  Joi.string().min(3).required()
    }    
    return Joi.validate(course, schema);
}


//PORT uobicajeno ime za promenljivu kojoj dodeljujemo port, on ne sme biti staticki, jer moguce da port 3000 nije svima dostupan, u produkciji
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})