import React, { Component } from 'react';
import { getMonthlyBalance } from './../../api/remote';
import Chart from './Chart';


class Diagram extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expense: {},
            month:{month: `${this.props.month}`},
            chartData:{},
            sum:[],
            productName:""
        }
    }

    loadExpense() {
        const year = (new Date()).getFullYear();
        let { month } = {month: `${this.props.month}`};
        let sum=[]
        

        getMonthlyBalance(year, month)
            .then((expense) => {
               
        
                expense.expenses.map(info =>(sum.push(info)));
                let result=sum.map(a => a.amount);
                let nameResult=sum.map(prodName=>prodName.name)
                
               
                this.setState({ 
                    expense:expense,
                    sum:result,
                    productName:nameResult,
                    chartData:{
                        labels:nameResult,
                        datasets:[
                          {
                            label:'Price',
                            data:result,
                            backgroundColor:[
                              'rgba(255, 99, 132, 0.6)',
                              'rgba(54, 162, 235, 0.6)',
                              'rgba(255, 206, 86, 0.6)',
                              'rgba(75, 192, 192, 0.6)',
                              'rgba(153, 102, 255, 0.6)',
                              'rgba(255, 159, 64, 0.6)',
                              'rgba(255, 99, 132, 0.6)'
                            ]
                          }
                        ]
                      }
                 });

            })
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
        return (
            <div>
                <Chart chartData={this.state.chartData}  legendPosition="bottom"/>
            </div>
            
           
        )
    }
}

export default Diagram;