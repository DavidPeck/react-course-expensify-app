import moment from 'moment';

// Get visible expenses
const selectExpensesTotal = (expenses) => {

    if (!Array.isArray(expenses) || !expenses.length) {
       return 0;
    } 
    else {
        return expenses
            .map((expense) => expense.amount)
            .reduce( (accumulator, currentValue) => accumulator + currentValue, 0);
        
    }
};

export default selectExpensesTotal;