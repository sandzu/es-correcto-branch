import React from 'react';
import { withRouter } from 'react-router-dom';

class EditPlanForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = this.props.plan;
    console.log(this.state)
    
    // this.state = {
    //   _id: this.props.match.params.planId,
    //   cost: this.state.cost || '',
    //   paymentFrequency: this.state.paymentFrequency || '',
    //   contractLength: this.state.contractLength || '',
    //   enrollmentDate: this.state.enrollmentDate || '',
    //   productId: this.props.match.params.productId
    // };
  }

  componentDidMount() {
    this.props.requestOnePlan(this.props.match.params.planId);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.plan !== newProps.plan) {
      this.setState(newProps.plan);
    }
  }
  
  update(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
    };
  }
  
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state)
    this.props.action(this.state).then((action) => this.props.history.push(`/userproducts`));
  }
  
  render() {
    if (!this.props.plan) {
      return null;
    }
    console.log(this.props)
    return (
      this.state ?
        <div className="change-form-container">
          <h3>Update Plan</h3>
          <br />
          <form onSubmit={this.handleSubmit} className="change-form">
            <label>Cost:
            <br />
              <input
                type="text"
                value={this.state.cost}
                onChange={this.update('cost')}
                className="change-form-container-input" />
            </label>
            <br />
            <br />

            <label>Payment Frequency:
            <br />
              <input
                type="text"
                value={this.state.paymentFrequency}
                onChange={this.update('paymentFrequency')}
                className="change-form-container-input" />
            </label>
            <br />
            <br />

            <label>Contract Length:
            <br />
              <input
                type="text"
                value={this.state.contractLength}
                onChange={this.update('contractLength')}
                className="change-form-container-input" />
            </label>
            <br />
            <br />

            <label>Enrollment Date (YYYY-MM-DD):
            <br />
              <input
                type="text"
                value={this.state.enrollmentDate}
                onChange={this.update('enrollmentDate')}
                className="change-form-container-date"
                placeholder="YYYY-MM-DD" />
            </label>
            <br />
            <br />

            <input type="submit" value='Update Plan' className="change-form-submit" />
          </form>
        </div>
        : null
    );
  }
}

export default withRouter(EditPlanForm);