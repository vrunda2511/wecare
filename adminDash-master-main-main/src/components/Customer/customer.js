import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

 class ListCustomerDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            customer: [],
            count:  []
            
           
        }
    }
     counter(rowno){
        return rowno+=1;
    }
    componentDidMount() {
        const apiUrl = 'http://localhost:4000/api/AdminViewCustomer';
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => this.setState({ customer: data.data }));
            // .then(count => this.setState({ count: count.count }));
            fetch(apiUrl)
            .then(response => response.json())
            .then(count => this.setState({ count: count.count }));
         
    }
    render() {
        let i=1;
       const rowNumber=1
        let counter=1
        return (
            <div className="container">
                <h2 className="text-center" style={{ marginTop: "15px" }}>Customer List ({this.state.count})</h2>
               
                <br></br>
                <div className="row">
                    <table className="table table-striped table-bordered"   counter-reset={rowNumber}>
                        
                        <thead style={{ textAlign: "center" }}>
                            <tr counter-increment>
                                
                                <th> Customer Name</th>
                                 <th> Mobile No</th>
                                <th> Email</th>
                                <th > City</th>
                            </tr>
                        </thead>
                        <tbody style={{ textAlign: "center" }}>
                            {
                                this.state.customer.map(
                                    customer =>
                                        <tr key={customer.customer_id}  counter-increment={ rowNumber}>
                                           
                                            <td>{customer.firstname} {customer.lastname}</td>
                                            <td> {customer.mobile_no} </td>
                                            <td> {customer.email}</td>
                                            <td>{customer.city}</td>
                                          
                                        </tr>
                                )
                            }
                           
                        </tbody>
                      
                     
                    </table>
                  
                </div>
            </div>
        )
    }
}
export default ListCustomerDetails