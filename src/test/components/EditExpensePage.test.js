import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let editExpense, removeExpense, history, wrapper;

beforeEach( () => {
    editExpense = jest.fn();
    removeExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(
        <EditExpensePage 
            editExpense={editExpense} 
            removeExpense={removeExpense} 
            history={history} 
            expense={expenses[1]}
        />);
    
});

test ('should render EditExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
});
 
 test('should handle onSubmit', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(editExpense).toHaveBeenCalledWith(expenses[1].id, expenses[1]);
});

test('should handle remove expense onClick', () => {
    wrapper.find('button').prop('onClick')();
    expect(removeExpense).toHaveBeenCalledWith({
        id: expenses[1].id
    });
    expect(history.push).toHaveBeenLastCalledWith('/');
});
