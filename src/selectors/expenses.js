import moment from 'moment';

// Get visible expenses
const getVisibleExpenses = (
    expenses
    , /* from filters array */ { text, sortBy, startDate, endDate } 
) => {
    return expenses.filter((expense) => {  
        const createdAtMoment = moment(expense.createdAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {

        // if B > A , 1 reshuffles,  0 leave.
        if (sortBy === 'desc') {
            return a.description < b.description ? -1 : 1;
        } else if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }

    });
};

export default getVisibleExpenses;