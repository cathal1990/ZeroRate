import React from 'react'
import { Navbar } from '../'
import moneyIcon from '../../images/money-svgrepo-com.svg'
import { coins } from '../../config.js'
const ccxt = require('ccxt');

function DashboardPage() {
    const [fundingRates, setFundingRates] = React.useState([])
    const [leverageValue, setLeverageValue] = React.useState(5)
    const [capitalValue, setCapitalValue] = React.useState('$10000')

    let binance = new ccxt.binance();
    binance.options = {
        'defaultType': 'future',
        'adjustForTimeDifference': 'true'
    }
    // ftx.proxy = 'http://localhost:3000/dashboard/'

    const tableData = [];
    let index = 0;
    for (let key in fundingRates) {
        tableData.push(fundingRates[key])
        tableData[index].apr = Math.abs((((fundingRates[key].fundingRate * 100) * 3) * 365).toFixed(2))
        tableData[index].apy = ((Math.pow(1 + Math.abs((((fundingRates[key].fundingRate * 100) * 3) * 365) / 100) / 1095, 1095) - 1) * 100).toFixed(2)
        index += 1;
    }


    React.useEffect(() => {
        const loadMarkets = async() => {
            const fundingRates = await binance.fetchFundingRates(coins)
            setFundingRates(fundingRates)
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
                <div className='capital-container'>
                <label htmlFor='capital'>Capital</label>
                <input className='capital-input' type='text' name='capital' onChange={(e) => setCapitalValue(e.target.value)} value={capitalValue}/>
                </div>
                <div className='leverage-slider-container'>
                    <label htmlFor='leverage'>Leverage</label>
                    <input min={1} max={10} type='range' name='leverage' id='leverage-slider' onChange={(e) => setLeverageValue(e.target.valueAsNumber)} value={leverageValue}/>
                </div>
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
                                    <td><span>{coin.apr}%</span></td>
                                    <td><span>{coin.apy}%</span></td>
                                    <td><span>{(coin.apr * leverageValue).toFixed(2)}%</span></td>
                                    <td><span>{(coin.apy * leverageValue).toFixed(2)}%</span></td>
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