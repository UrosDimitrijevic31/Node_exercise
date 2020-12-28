console.log('After');
getUser(1, (user) => {
    getRepositories(user.gitHubUsername, displayRepo)
});
console.log('Before');

function displayRepo(repos) {
    console.log(repos);
}

function getUser(id, callback) {
    setTimeout( () => {
        console.log('Reading a user from datebase...');
        callback({ id: id, gitHubUsername: 'Mosh' }); //pozove se kad se izvrsi funkcija
    }, 2000)    
}

function getRepositories(username, callback) {
    setTimeout( ()=> {
        console.log(('Calling GutHub API...'));
        callback(['repo1', 'repo2', 'repo3']);
    }, 2100)
}