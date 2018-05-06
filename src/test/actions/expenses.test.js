import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
    startAddExpense, 
    startSetExpenses,
    addExpense, 
    editExpense, 
    removeExpense, 
    setExpenses 
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

// resetting our test database with the expense fixtures
// promises.  done waits for async to complete before releasing to test.
beforeEach((done) => {
    const expensesData = {};
    expenses.forEach( ({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt };
    });
    database.ref('expenses').set(expensesData).then(() => done());
});

test('should setup remove expense action object', () => {
    const action = removeExpense({id : 'asdf123'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: 'asdf123'
    });
});

test('should setup update expense action object', () => {
    const action = editExpense( 'asdf123', 
        { 
            description: 'Tester',
            note: 'big note'
        });
    

    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: 'asdf123',
        updates: {
            description: 'Tester',
            note: 'big note'
        }
        
    });
});


test('should setup add expense action object with provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

test('should add expense to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This one is better than the last',
        createdAt: 1000
    };

    // adds data to database and store
    store.dispatch(startAddExpense(expenseData)).then(() => {
        //expect(1).toBe(1);
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        // added what I expect to the database
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');   

    }).then((snapshot) => {
        // promise chain.  testing value returned from db.
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({});
    const expenseDefaults = {
        description: '', 
        note: '', 
        amount: 0, 
        createdAt: 0 
    };

    // adds empty data to database and store
    store.dispatch(startAddExpense()).then(() => {
        //expect(1).toBe(1);
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDefaults
            }
        });

        // added what I expect to the database
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');   

    }).then((snapshot) => {
        // promise chain.  testing value returned from db.
        expect(snapshot.val()).toEqual(expenseDefaults);
        done();
    });
});


test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
});

test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore({});
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});

