import React, { Component } from 'react';
import { getMonthlyBalance } from './../../api/remote';
import ExpenseCard from './ExpenseCard';
import MonthlyBalanceView from './MonthlyBalanceView';

class ExpenseList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expense: {},
            month: this.props.month,
            sum:[],
            category:"",
            nonEssentialCategory:"",
            fixedCategory:"",
            variableCategory:"",
            billCategory:"",
            foodCategory:"",




        }
    }

    loadExpense() {
        const year = (new Date()).getFullYear();
        let { month } = this.props;
        console.log(this.props)
        let sum=[]
        let cat=[]

        let categoryArray = [];

        getMonthlyBalance(year, month)
            .then((expense) => {
               
        
                expense.expenses.map(info =>(sum.push(info)));
                console.log(sum);
                let result=sum.map(a => a.amount);
                let catResult=sum.map(cat=>cat.category)


                // let nonEsential = categoryArray.push(catResult.filter(word => word.includes("Non-essential")));
                let nonEsentialCategoryItems = sum.filter(function (obj) { return obj.category ==="Non-essential"; })
                let fixedCategoryItems = sum.filter(function (obj) { return obj.category ==="Fixed"; })
                let variableCategoryItems = sum.filter(function (obj) { return obj.category ==="Variable"; })
                let foodCategoryItems = sum.filter(function (obj) { return obj.category ==="Food"; })
                let billCategoryItems = sum.filter(function (obj) { return obj.category ==="Bill"; })
            
               let nonEsentialAmountResult = nonEsentialCategoryItems.map(item => item.amount).reduce((prev, next) => prev + next,0);
               let fixedAmountResult = fixedCategoryItems.map(item => item.amount).reduce((prev, next) => prev + next,0);
               let variableAmountResult = variableCategoryItems.map(item => item.amount).reduce((prev, next) => prev + next,0);
               let foodAmountResult = foodCategoryItems.map(item => item.amount).reduce((prev, next) => prev + next,0);
               let billAmountResult = billCategoryItems.map(item => item.amount).reduce((prev, next) => prev + next,0);
                console.log(nonEsentialAmountResult)
                console.log(fixedAmountResult)
                console.log(variableAmountResult)
                console.log(foodAmountResult)
                console.log(billAmountResult)
                



               
                this.setState({ 
                    expense:expense,
                    sum:result,
                    category:catResult,
                    nonEssentialCategory:nonEsentialAmountResult,
                    fixedCategory:fixedAmountResult,
                    variableCategory:variableAmountResult,
                    billCategory:billAmountResult,
                    foodCategory:foodAmountResult,
                 });

            })
    }


    print(){
        window.print();
      }
    componentWillMount() {
        this.loadExpense();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({month: nextProps.month});
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.month !== prevState.month) {
            this.loadExpense();
        }
    }

    render() {
        let expenses = [];
        let category = [];
        
        Object.entries(this.state.expense).map(expense => {
            for (let item of expense) {
                if (typeof item === 'object') {
                    if (item.length > 0) {
                        item.map(e => (
                            expenses.push(e)
                            
                        ))
                        
                    }
                }
            }
        })

        return (
            <tbody> 
                {expenses.map(e => {
                    return <ExpenseCard
                        key={e.id}
                        id={e.id}
                        name={e.name}
                        category={e.category}
                        amount={Number(e.amount)}
                        date={e.date}
                        month={e.month}
                    />
                })}
                {expenses.length > 0 && <button type="button" id="monthlyReport" class="btn btn-success" onClick={this.print} >Monthly Report</button>}
               
               
                <div id="printMe">
                <table>
    <tr>
    <th>Category</th>
    <th>Amount Expenses</th>
  </tr>
  <tr>
    <td>Non Essential</td>
    <td>{this.state.nonEssentialCategory}</td>
  </tr>
  <tr>
    <td>Fixed</td>
    <td>{this.state.fixedCategory}</td>
  </tr>
  <tr>
    <td>Variable</td>
    <td>{this.state.variableCategory}</td>
  </tr>
  <tr>
    <td>Food</td>
    <td>{this.state.foodCategory}</td>
  </tr>
  <tr>
    <td>Bill</td>
    <td>{this.state.billCategory}</td>
  </tr>
</table>
                </div>

            </tbody>

        )
    }
}

export default ExpenseList;