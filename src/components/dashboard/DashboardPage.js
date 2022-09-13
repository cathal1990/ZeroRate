import React from 'react'
import { Navbar } from '../'
import moneyIcon from '../../images/money-svgrepo-com.svg'
import { coins } from '../../config.js'
const ccxt = require('ccxt');

function DashboardPage() {
    const [marketList, setMarketList] = React.useState([])
    const [fundingRates, setFundingRates] = React.useState([])

    let binance = new ccxt.binance();
    binance.options = {
        'defaultType': 'future',
        'adjustForTimeDifference': 'true'
    }
    // ftx.proxy = 'http://localhost:3000/dashboard/'

    const tableData = [];
    for (let key in fundingRates) {
        tableData.push(fundingRates[key])
    }


    React.useEffect(() => {
        const loadMarkets = async() => {
            // await binance.loadMarkets();
            const fundingRates = await binance.fetchFundingRates(coins)
            setFundingRates(fundingRates)
            // coins.forEach((coin) => setMarketList(prevList => [...prevList, binance.fetchFundingRate(coin)]))
            }
            loadMarkets()
        }
    , [])

  return (
    <>
        <Navbar />
        <div className='dashboard-container'>
            <div className='sidebar-container'>
                <h2>Filters</h2>
            </div>
            <div className='trade-opps-container'>
                <div className='title-bar'>
                    <div className='trade-opps-title'>
                        <img id="money-icon" src={moneyIcon} />
                        <h3>Trade Opportunities</h3>
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
                        {tableData ? tableData.map((coin, i) => {
                            return (
                                <tr key={i}>
                                    <td><span>{coin.symbol}</span></td>
                                    <td><span>Binanace</span></td>
                                    <td><span>{Math.abs((((coin.fundingRate * 100) * 3) * 365).toFixed(2))}%</span></td>
                                    <td><span>{((Math.pow(1 + Math.abs((((coin.fundingRate * 100) * 3) * 365) / 100) / 1095, 1095) - 1) * 100).toFixed(2)}%</span></td>
                                    <td><span>{coin.symbol}</span></td>
                                    <td><span>{coin.symbol}</span></td>
                                    <td><span>{coin.symbol}</span></td>
                                    <td><span>{coin.symbol}</span></td>
                                </tr>
                            )
                        })
                         : <></>}
                    </tbody>
                </table>
            </div>
        </div>
    </>
  )
}

export default DashboardPage