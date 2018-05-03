import moment from 'moment';

export default [{
    id: '1',
    description: 'Gum',
    note: '',
    amount: 195,
    createdAt: 0
} , {
    id: '2',
    description: 'Lunch',
    note: '',
    amount: 1295,
    createdAt: moment(0).subtract(5, 'days').valueOf()
} , {
    id: '3',
    description: 'Fuel',
    note: '',
    amount: 6195,
    createdAt: moment(0).add(5, 'days').valueOf()
}];
