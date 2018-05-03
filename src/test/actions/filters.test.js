import moment from 'moment';
import { 
    setStartDate, 
    setEndDate, 
    setTextFilter, 
    sortByName, 
    sortByDate, 
    sortByAmount } from '../../actions/filters';

test('should generate set start date action object', () => {
    const action = setStartDate(moment(0));

    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    });
});

test('should generate set end date action object', () => {
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    });
});

test('should generate text filter action object with text value', () => {
    const textfilter = 'asddf asdf asdf';
    const action = setTextFilter(textfilter);
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: textfilter
    });
});

test('should generate text filter action object with empty value', () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    });
});

test('should generate sort by description filter action object', () => {
    const action = sortByName();
    expect(action).toEqual({
        type: 'SORT_BY_DESC',
        sortBy: 'desc'
    });
});


test('should generate sort by date filter action object', () => {
    const action = sortByDate();
    expect(action).toEqual({
        type: 'SORT_BY_DATE',
        sortBy: 'date'
    });
});

test('should generate sort by amount filter action object', () => {
    const action = sortByAmount();
    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT',
        sortBy: 'amount'
    });
});