import React, { Component } from 'react';
import Card from '../service-card/service-card.component';
import "../service-card/service-card.styles.css";
import "./service-list.styles.css"


class ServiceList extends Component {
    constructor() {
        super();

        this.state = {
            sections: []
        }
    }
    // componentDidMount(){
    //     // Simple GET request using fetch
    // fetch('http://localhost:4000/api/getAllCategory')
    // .then(response => {response.json();console.log("anc"+response)})
    // .catch(error => console.log(error))

    //     // let sections = []
    //     // this.setState({
    //     //     sections
    //     // })
    // }


    componentDidMount() {
        const apiUrl = 'http://localhost:4000/api/getAllCategory';
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => this.setState({ sections: data }));
    }



    render() {
        return (
            <div className='cards' id='services'>
                <h1 style={{ textAlign: 'center', paddingTop: '80px' }}>Our Services</h1>
                <div className="container-fluid d-flex cardlist">
                    <div className="row nthcard">
                        {this.state.sections.map(({ service_id, ...otherSectionProps }) => (
                            <div key={service_id} className="col-md-4 d-flex cardlist">
                                <Card key={service_id} {...otherSectionProps} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}


export default ServiceList;