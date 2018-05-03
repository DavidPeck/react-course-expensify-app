import { createStore } from 'redux';
const add = ({a , b}, c) => {
    return a + b + c;
} 
console.log(add({ a: 1, b: 21}, 101));


 // arrow function ( { object destructuriong : rename = default} = [default empty object{})
const incrementCount = ({ incrementBy = 1} = {}) => ({
    type: 'INCREMENT',
    incrementBy
});

const decrementCount = ({ decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const setCount = ({ count } = {} ) => ({
    type: 'SET',
    count
})

const resetCount = () => ({
    type: 'RESET'
})

// Reducers
// 1. reducers are pure functions
// 2. never change state or action

const constReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT' : 
            return {
                count: state.count + action.incrementBy
            };
       case 'DECREMENT' : 
            return {
                count: state.count - action.decrementBy
            };
        case 'SET' :
            return {
                count: action.count
            }
        case 'RESET' :
            //const resetVal = typeof action.resetTo === 'number' ? action.resetTo : 0;
            return {
                count: 0 //resetVal
            };
        default: 
            return state;

    }    
};


const store = createStore(constReducer);


const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch(incrementCount({ incrementBy: 33 }));

store.dispatch(incrementCount());

// store.dispatch({
//     type: 'INCREMENT', 
//     incrementBy: 5
// });

// store.dispatch({
//     type: 'INCREMENT'
// });

store.dispatch(resetCount());
// store.dispatch({
//     type: 'RESET',
//     resetTo: 44
// });

store.dispatch(decrementCount());


store.dispatch(decrementCount({decrementBy: 19}));

store.dispatch(setCount({ count: 777 }));

