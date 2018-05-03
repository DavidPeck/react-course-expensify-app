import moment from 'moment';
import filtersReducer from '../../reducers/filters';

test('should setup default filter values', () => {
    const state = filtersReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should set sortBy to amount', () => {
    const state = filtersReducer(undefined, {type: 'SORT_BY_AMOUNT', sortBy: 'amount'});
    expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
    const currentState = {
        text: '',
        sortBy: 'amount',
        startDate: moment(0),
        endDate: undefined
    };
    const action = { type: 'SORT_BY_DATE', sortBy: 'date'};
    const state = filtersReducer( currentState, action);
    expect(state).toEqual({
        ...currentState,
        sortBy: 'date'
    })
});

// should set text filter

test('should set text filter', () => {
    const text = 'text filter value';
    const action = { 
        type: 'SET_TEXT_FILTER', 
        text
    };
    const state = filtersReducer( undefined , action );    
    expect(state.text).toBe(text);
})

// should set start date

test('should set filter startdate', () => {
    const startDate = moment().toNow();
    const action = { 
        type: 'SET_START_DATE',
        startDate
    };
    expect(filtersReducer(undefined, action).startDate).toEqual(startDate);
});
// should set end date filter

test('should set filter end date', () => {
    const endDate = moment().toNow();
    const action = {
        type: 'SET_END_DATE',
        endDate
    };
    expect(filtersReducer(undefined, action).endDate).toEqual(endDate);

});