import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const Chart = ({history}) => {
  let intialPrices=[]
 let prices =[]
 const h = history.map(e=>({mounth: new Date(e.purchaseDate).getMonth()+1,intialPrice :e.adminPrice,price:e.totalPrice}))
for(let i=1 ;i<=12;i++){
  let x = h.filter(e=>e.mounth===i).map(e=>e.price).reduce((a,b)=>a+b,0)
  let y = h.filter(e=>e.mounth===i).map(e=>e.intialPrice).reduce((a,b)=>a+b,0)
  prices.push(x)
  intialPrices.push(y)
}

  const [state] = useState(
    {
          
      series: [{
        name: 'Prix inial',
        data: intialPrices
      }, {
        name: 'Ventes',
        data: prices
      }],
      options: {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov','Dec'],
        },
        yaxis: {
          title: {
            text: 'Ventes en DT'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return  val + "DT"
            }
          }
        }
      },
    
    
    }
  );
  return (
    <div>
      <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
</div>
    

  );
};

export default Chart;
