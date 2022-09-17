import React from 'react'
import { Navbar } from '../'
import { coins } from '../../config.js'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import noDataToDisplay from 'highcharts/modules/no-data-to-display';
import axios from 'axios'
const ccxt = require('ccxt');


function CoinAnalysis() {
    const [rateHistory, setRateHistory] = React.useState([])
    const [authorized, setAuthorized] = React.useState(false)

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
        try{
            const checkToken = async() => {
            const token = window.localStorage.getItem('token');
            if (token) {
                const {data} = await axios.get('/api/auth', {
                    headers: {
                        authorization: token
                      }
                });
                data ? setAuthorized(true) : setAuthorized(false);
            }
        }
        checkToken()

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
    catch(err) {
        console.log(err)
    }
    }
    , [])

    noDataToDisplay(Highcharts)

    const options = {
        lang: {
            noData: 'Loading data from exchange...'
          },
        noData: {
            style: {
              fontWeight: 'bold',
              fontSize: '25px',
              color: '151a21'
            }
          },
        tooltip: {
            crosshairs: true,
            shared: true,
            split: true,
            valueDecimals: 6
        },
        plotOptions: {
            series: {
                shadow: true,
                marker: {
                    enabled: false,
                }
            }
        },
        credits: {
            enabled: false,
        },
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
            },
        }
      }

  return (
    <>
        {authorized ?
            <>
                <Navbar />
                <div className='highcharts-container'>
                    <HighchartsReact containerProps={{ className: "main-highchart" }} highcharts={Highcharts} options={options} />
                </div>
            </>
        : <h1>NOT AUTHORISED</h1>}
    </>
  )
}

export default CoinAnalysis