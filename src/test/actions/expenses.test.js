import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

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
    const expenseData = {
        description: 'Something',
        amount: 109500,
        createdAt: 123456,
        note: 'A really big note'
    };
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: { 
            ...expenseData
            //, id: expect.stringMatching(/^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/i)
            , id: expect.any(String)
        }
    });
});

test('should setup add expense action object with default values', () => {
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            //id: expect.stringMatching(/^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/i),  
            id: expect.any(String),
            note: '',
            description: '',
            amount: 0,
            createdAt: 0
        }
    });
});



