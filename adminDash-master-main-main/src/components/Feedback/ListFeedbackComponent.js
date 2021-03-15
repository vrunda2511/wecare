import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';

class ListFeedbackComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            feedbacks: [],
            count:[]
        }
    }

    componentDidMount() {
       this.refreshlist();
    }

    refreshlist(){
        const apiUrl = 'http://localhost:4000/api/AdminViewFeedback';
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                this.setState({ feedbacks: data.data }
                )
                console.log(data)
            });
            fetch(apiUrl)
            .then(response => response.json())
            .then(count => this.setState({ count: count.count }));
    }
    componentDidUpdate(){
        // this.refreshlist();
    }

    deleteFeedback(feedbackId) {
        console.log("Delete", feedbackId)
        const { feedbacks } = this.state;

        const id = feedbackId;
        console.log(id);
        const apiUrl = 'http://localhost:4000/api/DeleteFeedback/' + id;
        const formData = new FormData();
        formData.append('feedbackId', feedbackId);

        const options = {
            method: 'DELETE',
            body: formData
        }

        fetch(apiUrl, options)
            .then(res => res.json())
            .then(
                (result) => {
                    toast.success('Deleted Successfully ', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                        
					window.location.reload(false);
                    this.setState({
                        response: result,
                        feedbacks: feedbacks.filter(feedback => feedback.feeddback_id !== feedbackId)
                    })
                   
                },
                (error) => {
                    this.setState({ error });
                }
            )
    }

    render() {

        return (
            <div className="container">
                <h2 className="text-center" style={{ marginTop: "15px" }}>Feedback  ({this.state.count})</h2>

                <div className="row">
                    <table className="table table-striped table-bordered">

                        <thead style={{ textAlign: "center" }}>
                            <tr>
                                <th>Service Name</th>
                                <th>Subservice Name</th>
                                <th>Provider Name</th>
                                <th>Customer Name</th>
                                <th>Review</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody style={{ textAlign: "center" }}>
                            {
                                this.state.feedbacks.map(
                                    feedback =>
                                        <tr key={feedback.feedback_id}>
                                            <td>{feedback.service_name} </td>
                                            <td>{feedback.sub_servicename}</td>
                                            <td>{feedback.providername}  {feedback.providerlastname}</td>
                                            <td>{feedback.customername}  {feedback.customerlastname}</td>
                                            <td>{feedback.review}</td>
                                            <td>
                                                <button className="btn btn-danger" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteFeedback(feedback.feedback_id) }}>Delete</button>
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
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ListFeedbackComponent;