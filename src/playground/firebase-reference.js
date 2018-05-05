// child_removed subscriber
database.ref('expenses').on('child_removed', (snapshot) => {
    console.log(snapshot.key, snapshot.val());
});

// child_changed subscriber
database.ref('expenses').on('child_changed', (snapshot) => {
    console.log('changed: ', snapshot.key, snapshot.val());
});

// child_added subscriber
database.ref('expenses').on('child_added', (snapshot) => {
    console.log('added: ', snapshot.key, snapshot.val());
});


// database.ref('expenses')
//   .on('value', (snapshot) => {
//       const expenses = [];
      
//       snapshot.forEach((childSnapshot) => {
//           expenses.push({
//               id: childSnapshot.key,
//               ...childSnapshot.val()
//           });
//       });

//       console.log(expenses);
//   });


// expenses.map((expense) => database.ref('expenses').push(
//     {
//         description: expense.description,
//         note: expense.note,
//         amount: expense.amount,
//         createdAt: expense.createdAt
//     })
// );



// const notes = {
//     title: 'Really big note!',
//     note: 'get out of commuting.'
// }

// database.ref('notes').push(notes);


// EXAMPLE: read and watch for changes.

// const onValueChange = database.ref().once('value', (snapshot) => {
//     const val = snapshot.val();
//     console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
// }, (e) => {
//     console.log (' Error with data fetching', e);
// });

// setTimeout(() => {
//     database.ref().update({
//         name: 'Dave',
//         job: {
//             title: 'CIO',
//             company: 'Datamer.io'
//         }
//     }).then(() => {
//         console.log('Data is saved!');
//     }).catch((e) => {
//         console.log('This failed');
//     });
// } , 5000);


// const onValueChange = database.ref().on('value', (snapshot) => {
//         const val = snapshot.val();
//         console.log(val);
//     }, (e) => {
//         console.log (' Error with data fetching', e);
//     } );

// database.ref().off(onValueChange);
    //   .then(() => {
    //       console.log('Subscribed to changes.');
    //   })
    //   .catch((e) => {
    //       console.log('This failed');
    //   });



//   database.ref().set({
//       name : 'David Peck',
//       age: 40,
//       job: {
//           title: 'Jack of all',
//           company: 'PG&E'
//       },
//       stressLevel: 8,
//       isSingle: false,
//       location: {
//           city: 'Concord',
//           state: 'CA',
//           country: 'United States'
//       }
//   }).then(() => {
//       console.log('Data is saved!');
//   }).catch((e) => {
//       console.log('This failed');
//   });


//   database.ref().set('This is my data!');
// database.ref('attributes').set({
//     height: 75 , 
//     weight: 207.5
// }).then(() => {
//     console.log('Data has updated!');
// }).catch(() => {
//     console.log('Error updating');
// });

// database.ref('isSingle').remove()
//   .then(() => {
//     console.log("Remove succeeded.")
//   })
//   .catch((error) => {
//     console.log("Remove failed: " + error.message)
//   });


// database.ref().update({
//     stressLevel: 3,
//     'job/company': 'DaTaTamer',
//     'location/city': 'Walnut Creek'
// }).then(() => {
//     console.log('Data is saved!');
// }).catch((e) => {
//     console.log('This failed');
// });