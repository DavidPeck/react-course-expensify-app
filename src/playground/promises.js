const promise = new Promise((resolve, reject) => {
    setTimeout(() => { 
        // resolve({
        //     human: {
        //     name: 'David',
        //     message: 'this is my resolved data'
        // }
        // }); 
        reject('something didn\'t go quite right');

    }, 3000);       
});

console.log('before');

promise.then( (data) => {
    console.log('1', data);
}).catch( (err) => {
    console.log(err);
});


console.log('after');