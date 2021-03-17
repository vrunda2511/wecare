import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'
import CartCard from '../cart-card/cart-card.components'
import { ToastContainer, toast } from 'react-toastify';

import dateFormat from 'dateformat';

import image from '../../images/nodatafound.png'


export default class CartModal extends Component {
  constructor(){
    super();

    this.state = {
        cart: [],
        subId:[],
        orderaddress:{},
        totalamount:null
    }
    this.handleChange = this.handleChange.bind(this) 
    this.handleSubmit = this.handleSubmit.bind(this) 
} 
totalPrice=0
subserviceKIID=[];
subserviceKPrice=[];


AddId(){
  this.state.cart.map(({subservice_id,price})=>{
  if (this.subserviceKIID.indexOf(subservice_id) === -1) {
      this.subserviceKIID.push(subservice_id)
      this.subserviceKPrice.push(price)
      this.totalPrice=this.totalPrice+price  
  }    
  })}
 
    
  componentDidMount() {
    // console.log(this.totalPrice) 
       this.AddId() 

      var customer_id = localStorage.getItem("customer_id");
     var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("http://localhost:4000/api/ViewFromCart/"+customer_id, requestOptions)
  .then(response => response.json())
    .then(result =>{this.setState({cart: result})
  })
  .catch(error => console.log('error', error));

  fetch("http://localhost:4000/api/ViewOrderAddress/"+customer_id, requestOptions)
  .then(response => response.json())
    .then(result =>{this.setState({orderaddress: result})
  })
  .catch(error => console.log('error', error));
}


componentDidUpdate(){
  var customer_id = localStorage.getItem("customer_id");
  var requestOptions = {
 method: 'GET',
 redirect: 'follow'
};

fetch("http://localhost:4000/api/ViewFromCart/"+customer_id, requestOptions)
.then(response => response.json())
 .then(result =>{this.setState({cart: result})
})
.catch(error => console.log('error', error));




  
  this.AddId()   
  }
 
  placeorder(e){
    alert(e.target.date.value)
  }

  handleChange(event){ 
    console.log(event.target.name,event.target.value)
    let orderaddress = this.state.orderaddress;
    switch (event.target.name) {
      case 'address':
          orderaddress.address = event.target.value
        break;
        case 'area':
          orderaddress.area = event.target.value
        break;
        case 'city':
          orderaddress.city = event.target.value
        break;
      default:
        break;
    }
    console.log(orderaddress.address);
    this.setState({ orderaddress })
    console.log("val"+this.state.orderaddress.address)
  } 
  customer_id=localStorage.getItem("customer_id");
  handleSubmit(event){ 
    event.preventDefault()  
    var pincode=event.target.pincode.value;
    console.log("va"+pincode)
    var GivenDate=event.target.date.value;
    var CurrentDate = new Date();
    CurrentDate= dateFormat(CurrentDate, "yyyy-mm-dd")
   // GivenDate = new Date();
    console.log(CurrentDate)
    if(pincode==""||event.target.date.value=="" ||event.target.timeslot.value==""){
      toast.error('All Fields Are Required', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else if(GivenDate < CurrentDate){
      toast.error('Please enter valid date', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else{
      let i;
      for(i=0;i<this.subserviceKIID.length;i++){
        console.log(this.subserviceKIID[i],this.state.orderaddress.address,this.state.orderaddress.area,this.state.orderaddress.city,this.subserviceKPrice[i],event.target.date.value,event.target.timeslot.value,event.target.pincode.value)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  
        var urlencoded = new URLSearchParams();
          urlencoded.append("customer_id", this.customer_id);
          urlencoded.append("subservice_id", this.subserviceKIID[i]);
          urlencoded.append("address", this.state.orderaddress.address);
          urlencoded.append("area", this.state.orderaddress.area);
          urlencoded.append("amount", this.subserviceKPrice[i]);
          urlencoded.append("city", this.state.orderaddress.city);
          urlencoded.append("pincode", event.target.pincode.value);
          urlencoded.append("order_date", event.target.date.value);
          urlencoded.append("time_slot", event.target.timeslot.value);
  
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };
  
        fetch("http://localhost:4000/api/PlaceOrder", requestOptions)
          .then(response => response.json())
          .then(result => {console.log(result);
          
          })
          .catch(error => console.log('error', error));
    }
 
      toast.success("Congratulations you will get confirmation soon", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        this.props.onHide()
      
   
    //alert(event.target.date.value+" "+event.target.timeslot.value+" "+event.target.pincode.value)
    //var dt=event.target.date.value
    
    
    
    }

      
  } 
  render() {
   
    
    return (

      <div>
        
                <Modal
              
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" style={{fontWeight:"bold",fontSize:20}}>
            
            Your Cart
         
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="container-fluid d-flex row nthcard">
         {this.state.cart.length==0?<img src={image} alt='logo' style={{ height: "150px",margin:50,marginLeft:300}} />:
        this.state.cart.map(({ cart_id, ...otherCartProps}) => (
           
        <CartCard key={cart_id} {...otherCartProps} cart_id={cart_id} />
           ))
}
        </Modal.Body>
        <Modal.Footer >
        <form onSubmit={this.handleSubmit}>
          <div>
          <label style={{fontWeight:"bold",fontSize:20}}>Confirm Your Address</label>
          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div className="cardi h-100">
	                            <div >
		                            <div className="row gutters">
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				                            <div className="form-group">
				                            	<label htmlFor="Street">Address</label>
				                            	<input type="text" name='address' defaultValue={this.state.orderaddress.address}  className="form-control" id="Street" onChange={this.handleChange}  placeholder="Enter Address" />
				                            </div>
			                            </div>
			                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
			                            	<div className="form-group">
			                            		<label htmlFor="Pincode">Pincode</label>
			                            		<input type="text" name='pincode' className="form-control"  onChange={this.handleChange} id="sTate" placeholder="Enter Pincode" />
			                            	</div>

			                            </div>
                                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">

			                            	<div className="form-group">
			                            		<label htmlFor="Area">Area</label>
			                            		<input type="text" name='area' className="form-control" defaultValue={this.state.orderaddress.area} onChange={this.handleChange} id="area" placeholder="Enter Area" />
			                            	</div>

			                            </div>

                                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">

			                            	<div className="form-group">
			                            		<label htmlFor="ciTy">City</label>
			                            		<input type="name" name='city' defaultValue={this.state.orderaddress.city}  className="form-control" onChange={this.handleChange} id="ciTy" placeholder="Enter City" />
			                            	</div>
			                            </div>
          </div></div></div>
          </div>
          </div>
         <div style={{marginTop:0,display:'flex', justifyContent:'space-between'}}>
         <div className="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-12">

        <div className="form-group">
          <label htmlFor="date">Order Date</label>
          <input type="date" name='date' className="form-control" defaultValue="date" onChange={this.handleChange} id="date" placeholder="Enter City" />
        </div>
        </div>
        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-12">

        <div className="form-group">
          <label htmlFor="ciTy">Time Slot</label>
            <select className="form-control" name="timeslot" defaultValue="Select timeslot" >
            <option>09:30 - 11:30</option>
            <option>12:30 - 14:30</option>
            <option>14:30 - 16:30</option>
            <option>16:30 - 18:30</option>
            <option>18:30 - 20:30</option>



            </select>
        </div>
        </div>
          <div style={{marginTop:25,marginRight:10}}>
          <label style={{fontWeight:"bold",marginRight:15,marginTop:10,fontSize:20}}>Total Amount: ₹{this.totalPrice}</label>
          <Button type="submit" style={{background:"#ffe484",backgroundColor:"#ffe484",border:"1px bold #ffe484",borderColor:"#ffe484",color:"#000",fontWeight:"bold"}}> Place Order</Button>
          <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
          </div>
         </div>
          </form> 
         
          {/* <Button onClick={this.props.onHide}>Close</Button> */}
        </Modal.Footer>
      </Modal>
      
            </div>
        )
      }
    }
    // console.log(this.state);




