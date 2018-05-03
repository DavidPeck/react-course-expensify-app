import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// ADD_EXPENSE
const addExpense = (
        { 
            description = '', 
            note = '', 
            amount = 0, 
            createdAt = 0 
        } = {} 
    ) => ({
        type: 'ADD_EXPENSE', 
        expense: {
            id: uuid(),
            description,
            note,
            amount,
            createdAt

        }
});

// REMOVE_EXPENSE

const removeExpense = ( { id } = {} ) => ({
    type: 'REMOVE_EXPENSE',
    id
});
// EDIT_EXPENSE

const editExpense = ( id , updates)  => ({
    type: 'EDIT_EXPENSE',
    id, 
    updates
});
// SET_TEXT_FILTER

const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

// SORT_BY_DESC
const sortByName = () => ({
    type: 'SORT_BY_DESC',
    sortBy: 'desc'
});

// SORT_BY_DATE

const sortByDate = () => ({
    type: 'SORT_BY_DATE',
    sortBy: 'date'
});
// SORT_BY_AMOUNT

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT',
    sortBy: 'amount'
})

// SET_START_DATE
const setStartDate = (startDate = undefined) => ({
    type: 'SET_START_DATE',
    startDate
});

// SET_END_DATE
const setEndDate = (endDate = undefined) => ({
    type: 'SET_END_DATE',
    endDate    
});

// Expenses Reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE' :
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE' :
            return state.filter(expense => expense.id !== action.id);
        case 'EDIT_EXPENSE' :
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    };
                } else {
                    return expense;
                };
            });

        default:
            return state;
    }
}

// filter reducer

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER' :
            return {
                ...state,
                text: action.text
            };

        case 'SORT_BY_DESC' :
        case 'SORT_BY_DATE' :
        case 'SORT_BY_AMOUNT' :
            return {
                ...state,
                sortBy : action.sortBy
            };
        case 'SET_START_DATE' :
            return {
                ...state,
                startDate: action.startDate
            };
        case 'SET_END_DATE' :
            return {
                ...state,
                endDate: action.endDate
            };
        default:
            return state;
    }
};
// timestamp (millisecond)
// jan 1 1970 (unix epoch)
// timestamp value = milisconds after or before

// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate } /* from filters array */) => {
    return expenses.filter((expense) => {  
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {

        // if B > A , 1 reshuffles,  0 leave.
        if (sortBy === 'desc') {
            return a.description < b.description ? -1 : 1;
        } else if (sortBy === 'date') {
            return a.createdAd < b.createdAd ? 1 : -1;
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }

    });
};

// Store creation

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

const expense1 = store.dispatch(addExpense({ description: 'Rent', amount: 1000, createdAt: -21000}));
const expense2 = store.dispatch(addExpense({ description: 'Coffee', amount: 3000, createdAt: -1000}));

//console.log(expense1);

//store.dispatch(removeExpense({id: expense1.expense.id }));
//store.dispatch(editExpense( expense2.expense.id, {amount: 500 , note:'Quad espresso'}));

//store.dispatch(setTextFilter('Co'));
// store.dispatch(setTextFilter(''));

store.dispatch(sortByAmount());
store.dispatch(sortByDate());
store.dispatch(sortByName());

 //store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());

 //store.dispatch(setEndDate(99));
// store.dispatch(setEndDate());

const demoState = {
    expenses: [{
        id: 'asdf-generatedId',
        description: 'Expense Description (i.e. January Rent)',
        note: 'This was the first rent paid for the year',
        amount: 339000,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', // date or amount
        startDate: undefined,
        endDate: undefined
    }
}


// const user = {
//     name: 'Dave', 
//     age: 33
// };
// console.log(user);
// console.log({
//     ...user,
//     location: 'home',
//     age: 40
// });