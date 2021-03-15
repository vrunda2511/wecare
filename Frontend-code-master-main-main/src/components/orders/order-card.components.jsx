import React, { Component } from 'react'
import FeedBackModal from '../feedback-modal/feedback-modal.component';
import { Button, Card, CardActionArea, CardActions, CardContent, Typography } from '@material-ui/core';

export default class OrderCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalShow: false
    }
  }
  render() {
    return (
      <Card key={this.props.placeorder_id} naam={this.props.sub_servicename} className='card'>
        <CardActionArea>
          {/* <CardMedia
                     component="img"
                     alt="Contemplative Reptile"
                     height="140"
                     image={image}
                     title="Contemplative Reptile"
                   /> */}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.props.sub_servicename}
            </Typography>

            <Typography className="spanTag" variant="body2" color="textSecondary" display="inline">
              <span className='price'>₹{this.props.price}</span><span>Duration: {this.props.time_duration}</span>
            </Typography>

          </CardContent>
        </CardActionArea>
        <CardActions className="baton">
          <Button size="small" className="baton">
            Status - {this.props.order_status}
          </Button>
          <Button size="small" className="baton"
            onClick={() => this.setState({ modalShow: true })} >
            Feedback
                   </Button>
          <FeedBackModal
            name={this.props.sub_servicename}
            subid={this.props.subservice_id}
            show={this.state.modalShow}
            onHide={() => this.setState({ modalShow: false })} />
        </CardActions>
      </Card>
    )
  }
}
