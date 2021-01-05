const mongoose = require('mongoose');

//**ovde umesto mongodb://localhost treba da stavimo referencu na promenljivu koju citamo iz config fajla(zavisno da li production, development)
mongoose.connect('mongodb://localhost:27017/playground', { useNewUrlParser: true, useUnifiedTopology: true }) //----!!!---connect vraca promis
    .then( () => console.log('Connected to MongoDB...')) //bolje debugging mode nego console log
    .catch(err => console.error('Could not connect to mongo db...', err));

//pravimo semu - SCHEMA - gde setujemo koji podaci ce se nalaziti u dokumentima, (slicno kao redovi u mysql)    

const courseSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true, 
        minlength: 5, 
        maxlength: 255,
        // match: /pattern/
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            validator: async function (v) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        const result =  v && v.length > 0;
                        resolve(result);
                    }, 4000);
                })
            },
            message: 'A course should have a least one tag'
        }
    },
    data: { type: Date, default: Date.now},
    isPublished: Boolean,
    price: {
        type: Number,
        min: 10,
        max: 200,
        required: function() { 
            return this.isPublished
        }
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'] //koristi se da definisemo koje reci su moguce (koji su moguci ishodi)
    }
})

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Java Script',
        category: '-',
        author: 'Uros Dimitrijevic',
        tags: [ ],
        isPublished: false, 
        price: 15
    })

    try {
        // const result = await course.validate( (err) => {
        //     if(err) { }
        // })
        const result = await course.save(); //vraca promis
        console.log(result);   
    } catch (ex) {
        //ex je OBUJEKAT
         for (fields in ex.errors) {
             console.log(ex.errors[fields].properties.message);
         }
    }
    
}

createCourse();

async function getCourses() {
    const courses = await Course
        .find( {author: 'Uros', isPublished: true} ) //promis, specificne propertije
        .limit(10)
        .sort({name: 1 })
        .select({ name: 1, tags: 1 })
    console.log(courses);
}

//getCourses();

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

// updateCourse('5fea03824469d5554aa7b686');

//query first approach - direktno u bazi, ne idemo prvo da nadjemo objekat iz baze pa onda da ga dobijemo, zatim promenimo pa vratimo
async function updateCourse2(id) {
    const result = await Course.findByIdAndUpdate({ _id: id },{
        $set: {
            isPublished: false,
            author: 'Uros Dimitrijevic' 
        }
    }, {new: true});
    console.log(result);
} 

//updateCourse2('5fea03824469d5554aa7b686')


async function removeCourse(id) {
    const course = await Course.findByIdAndDelete({ _id: id });
    console.log(course);
}

//removeCourse('5fea03824469d5554aa7b686')