import React from 'react'
import Orders from '../../components/orders/orders.components'
import Navbar from '../../components/navbarother/navbar.components'
import Footer from '../../components/footer/footer.components'
import Login from '../../components/login/login.component'

const OrderPage = (props) => {
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
                <Orders {...props}/>
                <Footer />
            </div>
        )
    }

}

export default OrderPage
