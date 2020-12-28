const mongoose = require('mongoose');

//**ovde umesto mongodb://localhost treba da stavimo referencu na promenljivu koju citamo iz config fajla(zavisno da li production, development)
mongoose.connect('mongodb://localhost:27017/playground', { useNewUrlParser: true, useUnifiedTopology: true }) //----!!!---connect vraca promis
    .then( () => console.log('Connected to MongoDB...')) //bolje debugging mode nego console log
    .catch(err => console.error('Could not connect to mongo db...', err));

//pravimo semu - SCHEMA - gde setujemo koji podaci ce se nalaziti u dokumentima, (slicno kao redovi u mysql)    

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    data: { type: Date, default: Date.now},
    isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'React Course',
        author: 'Uros',
        tags: [ 'eract', 'frontend' ],
        isPublished: true
    })

    const result = await course.save(); //vraca promis
    console.log(result);     
}

async function getCourses() {
    const courses = await Course
        .find( {author: 'Uros', isPublished: true} ) //promis, specificne propertije
        .limit(10)
        .sort({name: 1 })
        .select({ name: 1, tags: 1 })
    console.log(courses);
}

getCourses();