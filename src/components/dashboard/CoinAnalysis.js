import React from 'react'
import { Navbar } from '../'
import { coins } from '../../config.js'
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
            const chartData = []
            for (let i = 0; i < coins.length; i++) {
                const data = await binance.fetchFundingRateHistory(coins[i])
                const coinData = [];
                for (let j = 0; j < data.length; j++) {
                    coinData.push([data[j].timestamp, data[j].fundingRate * 100])
                }
                chartData.push(coinData)
            }
            setRateHistory(chartData)
        }
        loadData()
    }
    , [])

    console.log(rateHistory)

  return (
    <>
        <Navbar />
    </>
  )
}

export default CoinAnalysis