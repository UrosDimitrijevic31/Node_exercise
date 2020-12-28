const p1 = new Promise( (resolve) => {
    setTimeout( () => {
        console.log('Asyn operation 1...');
        resolve(1);
        // reject(new Error('Becouse something faild...'))
    }, 2000);
});

const p2 = new Promise( (resolve) => {
    setTimeout( () => {
        console.log('Asyn operation 2...');
        resolve(2);
    }, 2000);
});

Promise.all([p1, p2])
    .then(result => console.log(result))
    .catch(err => console.log('Error', err.message));

//ako zelimo da se nesto desi nakon sto se izvrsi prvi promise, u tom slucaju ce se prikazati rezultat smao prvog promisa
Promise.race([p1, p2])
    .then(result => console.log(result))
    .catch(err => console.log('Error', err.message));