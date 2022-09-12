import React from 'react'
import { Navbar } from '../'
import moneyIcon from '../../images/money-svgrepo-com.svg'

function DashboardPage() {
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

                    </tbody>
                </table>
            </div>
        </div>
    </>
  )
}

export default DashboardPage