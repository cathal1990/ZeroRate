import React from 'react'
import { Navbar, Pagination } from '../'
import moneyIcon from '../../images/money-svgrepo-com.svg'
import { coins } from '../../config.js'
import axios from 'axios'
const ccxt = require('ccxt');

function DashboardPage() {
    const [ftxMarkets, setFtxMarkets] = React.useState([])
    const [binanceMarkets, setBinanceMarkets] = React.useState()
    const [fundingRates, setFundingRates] = React.useState([])
    const [tickerList, setTickerList] = React.useState([])
    const [leverageValue, setLeverageValue] = React.useState(5)
    const [capitalValue, setCapitalValue] = React.useState('$10000')
    const [authorized, setAuthorized] = React.useState(false)
    const [currentPage, setCurrentPage] = React.useState(1)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)


    let binance = new ccxt.binance();
    binance.options = {
        'defaultType': 'future',
        'adjustForTimeDifference': 'true'
    }

    // let ftx = new ccxt.ftx();
    // ftx.proxy = 'http://localhost:8080/'

    const tableData = [];
    let index = 0;
    for (let key in fundingRates) {
        tableData.push(fundingRates[key])
        tableData[index].apr = Math.abs((((fundingRates[key].fundingRate * 100) * 3) * 365).toFixed(2))
        tableData[index].apy = ((Math.pow(1 + Math.abs((((fundingRates[key].fundingRate * 100) * 3) * 365) / 100) / 1095, 1095) - 1) * 100).toFixed(2)
        tableData[index].volume = tickerList[fundingRates[key].symbol].quoteVolume;
        index += 1;
    }

    const numFormatter = (num) => {
        if(num > 999 && num < 1000000){
            return (num/1000).toFixed(1) + 'K';
        }else if(num > 1000000000){
            return (num/1000000000).toFixed(1) + 'B'
        }else if(num > 1000000){
            return (num/1000000).toFixed(1) + 'M';
        }
    }

    const returnsPerMonth = (capital, apy, leverage, coin) => {
        if (capital === '$' || !capital) return '$' + 0;
        const capitalNum = parseInt(capital.slice(1), 10)
        return '$' + (((capitalNum * (coin.apy / 100)) / 12) * leverageValue).toFixed(2)
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

        const loadMarkets = async() => {
            const fundingRates = await binance.fetchFundingRates(coins)
            const tickers = await binance.fetchTickers(coins)
            // const {result} = await ftx.publicGetFutures()
            // setFtxMarkets(result.filter(coin => Number(coin.volumeUsd24h) > 1000000))
            setFundingRates(fundingRates)
            setTickerList(tickers)
        }

        loadMarkets()
    }
    catch(err) {
        console.log(err)
    }
}
, [])

let indexOfLastRow = currentPage * rowsPerPage;
    let indexOfFirstRow = indexOfLastRow - rowsPerPage;
    let currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow)

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
        indexOfLastRow = currentPage * rowsPerPage;
        indexOfFirstRow = indexOfLastRow - rowsPerPage;
        currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow)
    }

  return (
    <>
        {authorized ? <>
        <Navbar />
        <div className='dashboard-container'>
            <div className='sidebar-container'>
                <h1>Filters</h1>
                <div className='capital-container'>
                <label htmlFor='capital'>Capital</label>
                <input className='capital-input' type='text' name='capital' onChange={(e) => setCapitalValue(e.target.value)} value={capitalValue === '' ? '$' : capitalValue}/>
                </div>
                <div className='leverage-slider-container'>
                    <label htmlFor='leverage'>Leverage ({leverageValue}x)</label>
                    <span>1x<input min={1} max={10} type='range' name='leverage' id='leverage-slider' onChange={(e) => setLeverageValue(e.target.valueAsNumber)} value={leverageValue}/>10x</span>
                </div>
            </div>
            <div className='trade-opps-container'>
                <div className='title-bar'>
                    <div className='trade-opps-title'>
                        <img id="money-icon" src={moneyIcon} alt=""/>
                        <h2>Trade Opportunities</h2>
                    </div>
                    <div className='trade-opps-searchbar'>
                        <input type="text" className="search-bar" placeholder="Search..." />
                    </div>
                </div>
                <table className='trade-opps-table'>
                    <thead className='table-header'>
                        <tr>
                            <th role='columnheader' scope='col' className='table-header-column'><span>Coin</span></th>
                            <th role='columnheader' scope='col' className='table-header-column'><span>Exchanges</span></th>
                            <th role='columnheader' scope='col' className='table-header-column'><span>Net APR</span></th>
                            <th role='columnheader' scope='col' className='table-header-column'><span>Net APY</span></th>
                            <th role='columnheader' scope='col' className='table-header-column'><span>Lev APR</span></th>
                            <th role='columnheader' scope='col' className='table-header-column'><span>Lev APY</span></th>
                            <th role='columnheader' scope='col' className='table-header-column'><span>Returns/month</span></th>
                            <th role='columnheader' scope='col' className='table-header-column'><span>Volume</span></th>
                        </tr>
                    </thead>
                    <tbody className='table-body'>
                        {tableData ? currentRows.map((coin, i) => {
                            return (
                                <tr key={i} className={i % 2 !== 0 ? 'light-row' : 'dark-row'}>
                                    <td><span>{coin.symbol}</span></td>
                                    <td><span>Binance</span></td>
                                    <td><span>{coin.apr}%</span></td>
                                    <td><span>{coin.apy}%</span></td>
                                    <td><span>{(coin.apr * leverageValue).toFixed(2)}%</span></td>
                                    <td><span>{(coin.apy * leverageValue).toFixed(2)}%</span></td>
                                    <td><span>{returnsPerMonth(capitalValue, Number(coin.apy), leverageValue, coin)}</span></td>
                                    <td><span>{numFormatter(coin.volume)}</span></td>
                                </tr>
                            )
                        })
                         : <></>}
                    </tbody>
                </table>
                <Pagination currentPage={currentPage} rowsPerPage={rowsPerPage} totalRows={tableData.length} paginate={paginate}/>
            </div>
        </div>
        </>
        : <h1>NOT AUTHORISED</h1> }
    </>
  )
}

export default DashboardPage