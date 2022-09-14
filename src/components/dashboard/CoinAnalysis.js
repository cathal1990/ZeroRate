import React from 'react'
import { Navbar } from '../'
import { coins } from '../../config.js'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
const ccxt = require('ccxt');


function CoinAnalysis() {
    const [rateHistory, setRateHistory] = React.useState([])

    let binance = new ccxt.binance();
    binance.options = {
        'defaultType': 'future',
        'adjustForTimeDifference': 'true'
    }

    const months = {
        '01': 'Jan',
        '02': 'Feb',
        '03': 'Mar',
        '04': 'Apr',
        '05': 'May',
        '06': 'Jun',
        '07': 'Jul',
        '08': 'Aug',
        '09': 'Sep',
        '10': 'Oct',
        '11': 'Nov',
        '12': 'Dec'
    }


    React.useEffect(() => {
        const loadData = async() => {
            const chartData = []
            for (let i = 0; i < coins.length; i++) {
                const fundingData = await binance.fetchFundingRateHistory(coins[i])
                const coinData = { data: [], name: '', dateTime: []};

                for (let j = 0; j < fundingData.length; j++) {
                    coinData['data'].push([fundingData[j].fundingRate * 100])
                    coinData['dateTime'].push({day: `${fundingData[j].datetime.split('-')[2].slice(0,2)}. ${months[fundingData[j].datetime.split('-')[1]]}`})
                }
                coinData['name'] = fundingData[i].symbol
                chartData.push(coinData)
            }
            setRateHistory(chartData)
        }
        loadData()
    }
    , [])
    console.log(rateHistory)

    const styles = {

    }

    const options = {
        yAxis: {
            title: {
                text: 'Funding Rate'
            }
        },
        xAxis: {
            categories: rateHistory.length > 0 ? rateHistory[0].dateTime : '',

            labels: {
                formatter: function () {
                    return this.value.day
                }
            }
        },
        title: {
          text: 'Funding of different coins'
        },
        series: rateHistory,
        legend: {
            labelFormatter: function () {
                return this.name;
            }
        }
      }
console.log(rateHistory)

  return (
    <>
        <Navbar />
        <div className='highcharts-container'>
            <HighchartsReact containerProps={{ className: "main-highchart" }} highcharts={Highcharts} options={options} />
        </div>
    </>
  )
}

export default CoinAnalysis