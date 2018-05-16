import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter , sortByDate , sortByAmount, sortByName , setStartDate, setEndDate } from '../actions/filters';

export class ExpenseListFilters extends React.Component {
state = {
    calendarFocused: null
};

onDatesChange = ({ startDate, endDate}) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
};

onFocusChange = (calendarFocused) => {
    this.setState( () => ({ calendarFocused }));
}

onTextChange = (e) => {
    this.props.setTextFilter(e.target.value);
}

onSortChange = (e) => {
    if(e.target.value === 'date') 
        this.props.sortByDate()
    else if (e.target.value === 'amount') 
        this.props.sortByAmount()
    else if (e.target.value === 'desc')
        this.props.sortByName();
}

render() {
    return (
        <div className="content-container">
            <div className="input-group">
                <div className="input-group__item">
                    <input 
                        type="text" 
                        className="text-input"
                        placeholder="Search expenses"
                        value={this.props.filters.text} onChange={this.onTextChange}
                    />
                </div>
                <div className="input-group__item">
                    <select 
                        className="select"
                        value={this.props.filters.sortBy} 
                        onChange={this.onSortChange}>

                        <option value="amount">Amount</option>    
                        <option value="date">Date</option>
                        <option value="desc">Name</option>
                    </select>
                </div>
                <div className="input-group__item">
                    <DateRangePicker
                        startDate={this.props.filters.startDate}
                        startDateId={`filterStartDate`}
                        endDate={this.props.filters.endDate}
                        endDateId={`filterEndDate`}
                        onDatesChange={this.onDatesChange}
                        focusedInput={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        showClearDates={true}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                </div>
            </div>
        </div>    
    )
}

};
const mapStateToProps = (state) => {
    return {
        filters: state.filters
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setTextFilter: (text) => dispatch(setTextFilter(text)),
        sortByDate: () => dispatch(sortByDate()),
        sortByAmount: () => dispatch(sortByAmount()),
        sortByName: () => dispatch(sortByName()),
        setStartDate: (startDate) => dispatch(setStartDate(startDate)),
        setEndDate: (endDate) => dispatch(setEndDate(endDate))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);