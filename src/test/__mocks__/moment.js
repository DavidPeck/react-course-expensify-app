//import moment from 'moment';
const moment = require.requireActual('moment');

// export default class moment  {
//     constructor(timestamp = 0) { 
//         return momment(timestamp);
//     } 

//     toNow  = () => {
//         return this.timestamp + 10000;
//     }

//     //return moment(this.timestamp);
// }


export default (timestamp = 0) => {
    return moment(timestamp)
}

