const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: []
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  const course = await Course.findByIdAndUpdate({_id: courseId}, {
    $set: {
      'author.name': 'Milica Tosic'
    }
    //obrisemo ceo objekat, mogu da se brisu i posebno vrednosti: author.name : ''
    // $unset: {
    //   'author': ''
    // }
  });
  console.log(course);
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save(); //da nema toga on bi odradio promenu u memoriji ali ne i u bazi
  console.log(course);
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId); //ovo ne radi, proveriti - .id nije funkcija
  author.remove();
  course.save();
  console.log(course);
}

//addAuthor('602540994b08bc4671351376', new Author({ name: 'Amy'}))

removeAuthor('602540994b08bc4671351376', '6025422215903f478d137df0')

// createCourse('Java Course', [
//   new Author({ name: 'Uros' }),
//   new Author({ name: 'Pera' }),
//   new Author({ name: 'Ana' })
// ]);
