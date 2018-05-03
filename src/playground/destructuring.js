console.log('destructuring');

//
// Object destructuring
//

// const person = {
//     name: 'David P',
//     age : 40,
//     location: {
//         city: "Concord",
//         temp: 49
//     }
// };

// const { name: FullName = 'Anonymous', age } = person;

// console.log(   `${FullName} is ${age}.`);

// const {city, temp: temperature} = person.location;

// if (city && temperature ) {
//     console.log ( `It's ${temperature} in ${city}.`)
// }

// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday', 
//     publisher: {
//         name: 'Penguin'
//     }
// }

// const {name: publisherName = 'Self-Published'} = book.publisher;

// console.log(publisherName);  // default => self-Published



//
// Array desctructuring
// 

const address = ['1157 Fairweather Cir', 'Concord', 'California', '94518'];
const [, city, state] = address;

console.log(`You are in ${city} ${state} `)



const item = ['coffee (iced)' , '$2.00', '$2.50', '$2.75'];
const [itemName, ,medium] = item

console.log(`A medium ${itemName} costs ${medium}`);