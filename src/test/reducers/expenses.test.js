import moment from 'moment';
import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';


test('should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT'});
});


test('should remove expense by id', ()=> {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([
        expenses[0],
        expenses[2]
    ]);
});

test('should not remove expenses if id is not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: -1
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

// add expense
test('should add new expense', () => {
    const expense = {
        id: 6,
        description: 'new expense item',
        createdAt:  moment().toNow(),
        amount: 1212
    };
    const action = {
        type: 'ADD_EXPENSE',
        expense
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([
        ...expenses,
        expense
    ]);
});

test('should edit expense with given id', () => {
    const updates = {
        description: 'updated text desc',
        createdAt:  moment().toNow()
    };
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[0].id,
        updates
    };
    const state = expensesReducer(expenses, action);
    expect(state[0]).toEqual({
        ...expenses[0],
        ...updates
    });
});

test('should return expenses unchanged when given id is not found', () => {
    const updates = {
        description: 'bad update!',
        createdAt:  moment().toNow()
    };
    const action = {
        type: 'EDIT_EXPENSE',
        id: 666,
        updates
    };
    const state = expensesReducer(expenses, action);

    expect(state).toEqual(
        expenses
    );
})
