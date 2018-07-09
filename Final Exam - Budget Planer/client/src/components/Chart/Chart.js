import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

class Chart extends Component{
  constructor(props){
    super(props);
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
    product:'City'
  }



  

  render(){
    return (
      <div className="chart"> 
        <Pie
          data={this.props.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Monthly Expenses',
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />
      </div>
    )
  }
}

export default Chart;