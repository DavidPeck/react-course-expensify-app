import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('should render ExpenseForm correctly', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

test('should render Expense form with expense data', () => {
    const wrapper = shallow(<ExpenseForm buttonText='Save' expense={expenses[1]} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();    
});

test('should set description on input change', () => {
    const value = 'New description';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.state('description')).toBe(value);
});

test('should set note state on textarea change', () => {
    const value = 'Really big note for note change';
    const wrapper = shallow(<ExpenseForm /> );
    // at not necessary, if only 1 in form???
    wrapper.find('textarea').at(0).simulate('change', {
        target: { value }
    });7
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.state('note')).toBe(value);
});

// test change amount = valid.
test('should set amount if valid input', () => {
    const value = '23.50';
    const wrapper = shallow(<ExpenseForm /> );

    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount if invalid input', () => {
    const value = '12.122';
    const wrapper = shallow(<ExpenseForm /> );

    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper).toMatchSnapshot();
    // empty?  or regex'd field?
    expect(wrapper.state('amount')).toBe(''); 
});


test('should call onSubmit prop for valid form submission.', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[1]} onSubmit={onSubmitSpy} /> );
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });

    expect(wrapper.state('error')).toBe('');
    // cant deconstruct object, submit does not send id (as may not exist)
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        amount: expenses[1].amount,
        description: expenses[1].description,
        note: expenses[1].note,
        createdAt: expenses[1].createdAt
    });
});

test('should set new date on date change' , () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);    
    wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendar focus onchange', ()=> {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({focused});
    expect(wrapper.state('calendarFocused')).toEqual(focused);
});

