import React, { Component } from 'react'
import OrderCard from './order-card.components';
import "./orders.styles.css"
import image from '../../images/nodatafound.png'
import dateFormat from 'dateformat';




export default class Orders extends Component {



    constructor(props) {
        super(props);

        this.state = {
            orders: [],
            modalShow: false
        }
    }



    componentDidMount() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        var customer_id = localStorage.getItem("customer_id");
        let val = dateFormat(this.props.location.state, "yyyy-mm-dd");
        console.log(val)
        var urlencoded = new URLSearchParams();
        urlencoded.append("odate", val);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("http://localhost:4000/api/ViewOrder/"+customer_id, requestOptions)
            .then(response => response.json())
            .then(result => this.setState({orders:result}))
            .catch(error => console.log('error', error));
    }




    render() {
        if (this.state.orders.length == 0) {
            return (
                <div className='header'>
                    <img src={image} alt='logo' style={{ height: "200px", margin: 100 }} />
                </div>
            )
        }
        else {
            return (

                <div >
                    <div className='header'>
                        Your Orders for {dateFormat(this.props.location.state, "dd,mmmm yyyy")}
                         </div>
                    <div className='container-fluid, row nthcard, lissst' style={{marginBottom:130}}>
                        {this.state.orders.map(({ placeorder_id, ...otherOrderProps }) => (
                            <div key={placeorder_id} className='orderCard'>
                                <OrderCard key={placeorder_id} {...otherOrderProps} />
                            </div>
                        ))}
                    </div>
                </div>
            )
        }

    }
}
