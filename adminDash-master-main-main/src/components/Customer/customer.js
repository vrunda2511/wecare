import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

class ListCustomerDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customer: [],
      count: []
    };
  }
  counter(rowno) {
    return (rowno += 1);
  }
  componentDidMount() {
    const apiUrl = "http://localhost:4000/api/AdminViewCustomer";
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => this.setState({ customer: data.data }));
    // .then(count => this.setState({ count: count.count }));
    fetch(apiUrl)
      .then(response => response.json())
      .then(count => this.setState({ count: count.count }));
  }
  deactivecustomer(customer_id) {
   
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("role", "0");
        urlencoded.append("customer_id",customer_id);

        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        fetch("http://localhost:4000/api/AdminActivateCustomer", requestOptions)
        .then(response => response.text())
        .then(result => {console.log(result)
            toast.warn('User Deactivated ', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        
            setTimeout(function () {
                window.location.reload(false)
            }, 5000);})
     
        .catch(error => console.log('error', error));
        window.location.reload(false)
  }

  activecustomer(customer_id){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("role", "1");
    urlencoded.append("customer_id",customer_id);

    var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
    };

    fetch("http://localhost:4000/api/AdminActivateCustomer", requestOptions)
    .then(response => response.text())
    .then(result =>{ console.log(result)
        toast.warn('User Activated ', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    
        setTimeout(function () {
            window.location.reload(false)
        }, 5000);})
    .catch(error => console.log('error', error));
    

  }
  render() {
    let i = 1;
    const rowNumber = 1;
    let counter = 1;
    return (
      <div className="container">
        <h2 className="text-center" style={{ marginTop: "15px" }}>
          Customer List
        </h2>

        <br></br>
        <div className="row">
          <table
            className="table table-striped table-bordered"
            counter-reset={rowNumber}
          >
            <thead style={{ textAlign: "center" }}>
              <tr counter-increment>
                <th> Customer Name</th>
                <th> Mobile No</th>
                <th> Email</th>
                <th> City</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: "center" }}>
              {this.state.customer.map(customer => (
                <tr key={customer.customer_id} counter-increment={rowNumber}>
                  <td>
                    {customer.firstname} {customer.lastname}
                  </td>
                  <td> {customer.mobile_no} </td>
                  <td> {customer.email}</td>
                  <td>{customer.city}</td>
                

                  <td>
                    {customer.role == 0 ? (
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          this.activecustomer(customer.customer_id);
                        }}>
                        Active
                      </button>
                    ) : (
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          this.deactivecustomer(customer.customer_id);
                        }}
                      >
                        Deactive
                      </button>
                    )}
                    <ToastContainer
                      position="top-center"
                      autoClose={5000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default ListCustomerDetails;
