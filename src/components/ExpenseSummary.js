import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import selectExpenseTotal from '../selectors/expenses-total';


export const ExpenseSummary = ( {expenseCount, expensesTotal} ) => {
    const expensePlural = expenseCount === 1 ? 'expense' : 'expenses';
    const formattedExpensesTotal = numeral(expensesTotal / 100).format('$0,0.00');
    return (
        <div>
            {
                <h1>Viewing {expenseCount} {expensePlural} totaling {formattedExpensesTotal}</h1>
            }          
        </div>
    );
}

const mapStateToProps = (state) => {
    const visibleExpenses = selectExpenses(state.expenses, state.filters);
    return {
        expenseCount: visibleExpenses.length,
        expensesTotal: selectExpenseTotal(visibleExpenses)
    };
};

export default connect(mapStateToProps)(ExpenseSummary);