const p = new Promise((resolve, reject) => [
    setTimeout( () => {
        resolve(1);
        reject(new Error('message'));
    }, 2000)
])

p.then(result => {
    console.log('result', result);
}).catch(err => {
    console.log('Error', err.message);
})

//primer

console.log('After');
getUser(1, (user) => {
    getRepositories(user.gitHubUsername, displayRepo)
});
console.log('Before');

// getUser(1)
//     .then(user => getRepositories(user.gitHubUsername))
//     .then(repo => console.log(repo))
//     .catch(err => console.log("Error", err.message));


//****Async and Await approach, kada koristimo await funckija pora da bude async
async function displayRepos(){
    try{
        const user = await getUser(1);
        const repos = await getRepositories(user.gitHubUsername);
        console.log(repos);
    } catch (err) {
        console.log('Error', err.message);
    }
}

displayRepos()


function displayRepo(repos) {
    console.log(repos);
}

function getUser(id) {
    return new Promise((resolve, reject) =>{
        setTimeout( () => {
            console.log('Reading a user from datebase...');
            resolve({ id: id, gitHubUsername: 'Mosh' }); //pozove se kad se izvrsi funkcija
        }, 2000) 
    })
       
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout( ()=> {
            console.log(('Calling GutHub API...'));
            resolve(['repo1', 'repo2', 'repo3']);
            // reject(new Error('message'))
        }, 2000)
    })
    
}