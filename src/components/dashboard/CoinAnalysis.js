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


    React.useEffect(() => {
        const loadData = async() => {
            debugger
            const chartData = []
            for (let i = 0; i < coins.length; i++) {
                const fundingData = await binance.fetchFundingRateHistory(coins[i])
                const coinData = { data: []};

                for (let j = 0; j < fundingData.length; j++) {
                    coinData['data'].push([fundingData[j].datetime.split(':')[0], fundingData[j].fundingRate * 100])
                }
                chartData.push(coinData)
            }
            setRateHistory(chartData)
        }
        loadData()
    }
    , [])

    const options = {
        title: {
          text: 'Funding of different coins'
        },
        series: rateHistory
      }
console.log(rateHistory)

  return (
    <>
        <Navbar />
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    </>
  )
}

export default CoinAnalysis