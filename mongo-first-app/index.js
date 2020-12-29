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
        name: 'Java Course',
        author: 'Uros',
        tags: [ 'eract', 'frontend' ],
        isPublished: false
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

//treba razmisljati iz js perspektive 
async function getCoursesTest() {
    const courses = await Course
        .find(({ price: { $gte: 10, $lte: 20 } }))
        // .find({ price: { $in: [10, 15, 20] } })
        .limit(10)
        .sort({name: 1 })
        .select({ name: 1, tags: 1 })
    console.log(courses);
}

async function updateCourse(id) {
    const course = await Course.findById(id);
    if(!course) return console.log('Course not found');;

    course.set({
       isPublished: true,
       author: 'Another Author' 
    })
    const result = await course.save();
    console.log(result);
} 

updateCourse('5fea03824469d5554aa7b686');

//query first approach - direktno u bazi, ne idemo prvo da nadjemo objekat iz baze pa onda da ga dobijemo, zatim promenimo pa vratimo
async function updateCourse2(id) {
    const course = await Course.updateOne({ _id: id },{
        $set: {
            isPublished: false,
            author: 'uros Dimitrijevic' 
        }
    });
    console.log(result);
} 

// updateCourse('5fea03824469d5554aa7b686');
updateCourse2('5fea03824469d5554aa7b686')


// createCourse();
//getCourses();