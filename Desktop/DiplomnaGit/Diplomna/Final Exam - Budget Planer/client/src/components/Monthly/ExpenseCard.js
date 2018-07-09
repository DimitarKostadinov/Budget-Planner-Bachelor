import React, { Component } from 'react';
import { deleteExpense } from './../../api/remote';
import { withRouter } from 'react-router-dom';
import toastr from 'toastr';

class ExpenseCard extends Component {

    render() {
        const { name, category, amount, date, id,month } = this.props;
        const monthName = {
            1: 'January',
            2: 'February',
            3: 'March',
            4: 'April',
            5: 'May',
            6: 'June',
            7: 'July',
            8: 'August',
            9: 'September',
            10: 'October',
            11: 'November',
            12: 'December'    
        };
        const year = (new Date()).getFullYear();

        return (
            <tr>
                <td>{name}</td>
                <td>{category}</td>
                <td>{amount}</td>
                <td>{date}-{monthName[month]}-{year}</td>
                <td>
                    <a onClick={() => {
                        deleteExpense(id)
                        .then((res => {
                            toastr.success('Expense deleted successfully!');
                            this.props.history.push('/yearly');
                        }))
                    }} href="javascript:void(0)" data-title="Натиснете този бутон ако желаете да изтриете този разход!" className="btn btn-danger danger"> <img id="deleteBtn" src="https://cdn1.iconfinder.com/data/icons/web-ui-2/16/UI_Icons_Outline-28-512.png"/></a>
                </td>
            </tr>
        )
    }
}

export default withRouter(ExpenseCard);