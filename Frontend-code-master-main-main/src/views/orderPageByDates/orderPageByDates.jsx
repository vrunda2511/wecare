import React from 'react'
import Navbar from '../../components/navbarother/navbar.components'
import Footer from '../../components/footer/footer.components'
import Login from '../../components/login/login.component'
import OrderByDate from '../../components/orders/order-date.components'

const OrderPageByDates = () => {
    if (localStorage.getItem("token") === null) {
        return (
            <div>

                <Login />

            </div>
        )
    } else {
        return (
            <div>
                <Navbar />
                <OrderByDate />
                <Footer />
            </div>
        )
    }
}

export default OrderPageByDates
