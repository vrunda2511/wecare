import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import "./subserviceCard.styles.css";
import MyVerticallyCenteredModal from '../subServiceModal/subServiceModel.component'
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

function addtocart(subserviceId) {

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("subservice_id", subserviceId);
  urlencoded.append("customer_id", localStorage.getItem("customer_id"));

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };

  fetch("http://localhost:4000/api/AddToCart", requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result);
      toast.success('Added to Cart Successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
    .catch(error => console.log('error', error));
  //  }
};

export default function SubserviceCard({ sub_servicename, short_description, price, time_duration, image, long_description, service_name, subserviceId }) {
  const classes = useStyles();
  const [modalShow, setModalShow] = React.useState(false);
  const [cart, setCart] = useState(false);
  const [feedback, setFeedback] = useState([{ avg: '' }]);
  let history = useHistory();
  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("http://localhost:4000/api/ViewFeedback/" + subserviceId, requestOptions)
      .then(response => response.json())
      .then(result => setFeedback(result))
      .catch(error => console.log('error', error));
  }, [subserviceId])
  let count = feedback.map(({ avg }) => parseFloat(avg))

  // console.log(count[0])

  function addtocart(subserviceId) {
    if (localStorage.getItem("token") === null) {
      toast.success('Login is required!! ', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    setTimeout(function () {
        history.push("/signin")
    }, 5000);
     
    }
    else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("subservice_id", subserviceId);
      urlencoded.append("customer_id", localStorage.getItem("customer_id"));

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };

      fetch("http://localhost:4000/api/AddToCart", requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result);
          toast.success('Added to Cart Successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setCart(true) 
        })
        .catch(error => console.log('error', error));
    }

  };

  return (
    <div className='subServiceCard'>
      <Card className={classes.root, 'card'}>
        <CardActionArea onClick={() => setModalShow(true)}>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image={image}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {sub_servicename}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {short_description}
            </Typography>
            <Typography className="spanTag" variant="body2" color="textSecondary" display="inline">
              <span className='price'>₹{price}</span><span>Duration: {time_duration}</span>
            </Typography>

          </CardContent>
        </CardActionArea>
        <div className="ratings" >

          <Rating
            name="read-only"
            value={count[0]}
            precision={0.5}
            emptyIcon={<StarBorderIcon fontSize="inherit" />}
            readOnly
          />
        </div>
        <CardActions className="baton">
          {cart
            ?
            <div  
            style={{marginLeft:10}}>Added</div>
            :
            <Button size="small"
            style={{marginLeft:5}}
             className="baton" onClick={(e) => { addtocart(subserviceId);}} >
              Add to Cart
        </Button>}
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

          <Button size="small"  className="baton" onClick={() => setModalShow(true)}>
            View More
        </Button>
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            long_description={long_description}
            sub_servicename={sub_servicename}
            service_name={service_name}
          />
        </CardActions>
      </Card>
    </div>
  );
}