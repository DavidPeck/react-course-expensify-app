import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return 0 if no expenses - undefined', () =>  {
    const result = selectExpensesTotal();
    expect(result).toEqual(0);
});

test('should return 0 if no expenses - empty array', () =>  {
    const result = selectExpensesTotal([]);
    expect(result).toEqual(0);
});

test(`should return value of one expense item`, () => {
    const result = selectExpensesTotal([ expenses[1] ]);
    expect(result).toEqual(expenses[1].amount);
});

test('should return sum of multiple expenses', () => {
    const result = selectExpensesTotal(expenses);
    expect(result).toEqual(expenses[0].amount 
        + expenses[1].amount
        + expenses[2].amount);
});