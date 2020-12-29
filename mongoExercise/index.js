const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongo-exercises', { useNewUrlParser: true, useUnifiedTopology: true})
    .then( () => console.log('Connected to MongoDB...'))
    .catch( err => console.error('Could not connect to mongodb...'))

const courseSchema = new mongoose.Schema({
    name: String,
    tags: [ String ],
    author: String,
    price: Number,
    date: { type: Date, default: Date.now },
    isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'New Course',
        tags: ['Test'],
        author: 'Uros Dimitrijevic',
        isPublished: false
    })

    const result = await course.save();
    console.log(result);
}

async function getCourses() {
    return await Course
        .find({ isPublished: true, tags: 'backend' })
        .sort({ name: 1 }) //sort('name'), sort('-name')
        .select({ name: 1, author: 1 }); //select('name author')
}

async function getCoursesPublished() {
    const courses =  await Course
    .find({ isPublished: true })
    .or([{tags: 'backend'}, {tags: 'frontend'}])
    .sort('-price')
    .select('name author')

    console.log(courses);
}

async function getCoursesPrice() {
    const courses = await Course
        .find({ isPublished: true, })
        .or([ 
            {price: {$gte: 15}}, 
            { name: /.*by.*/i }
        ])
        .select('name price');

    console.log(courses);
}

//getCoursesPublished();
getCoursesPrice()

async function run() {
    const courses = await getCourses();
    // console.log(courses);
}


