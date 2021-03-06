import React from 'react';
import { withRouter } from 'react-router-dom';

class EditPlanForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = this.props.plan;

    // this.state = {
    //   _id: this.props.match.params.planId,
    //   cost: this.state.cost || '',
    //   paymentFrequency: this.state.paymentFrequency || '',
    //   contractLength: this.state.contractLength || '',
    //   enrollmentDate: this.state.enrollmentDate || '',
    //   productId: this.props.match.params.productId
    // };
  }

  format(input) {
    let date = new Date(input);
    let d = date.getDate() + 1;
    let m = date.getMonth() + 1;
    let y = date.getFullYear();
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
  }

  componentDidMount() {
    this.props.requestOnePlan(this.props.match.params.planId);
  }

  // componentWillReceiveProps(newProps) {
  //   if (this.props.plan !== newProps.plan) {
  //     this.setState({
  // //       _id: newProps.plan._id,
  // //       cost: newProps.plan.cost,
  // //       paymentFrequency: newProps.plan.paymentFrequency,
  // //       contractLength: newProps.plan.contractLength,
  //       enrollmentDate: this.format(new Date(newProps.plan.enrollmentDate)),
  // //       productId: newProps.productId
  //     });
  //   }
  // }

  update(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.action(this.state).then((action) => this.props.history.push(`/userproducts`));
  }

  render() {
    if (!this.props.plan) {
      return null;
    }
    let date = new Date();
    let d = date.getDate() + 1;
    let m = date.getMonth() + 1;
    let y = date.getFullYear();
    let todayDate =  '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
    let formattedDate = this.format(this.state.enrollmentDate);
    return (
      this.state ?
        <div className="change-form-container">
          <h3>Update Plan</h3>
          <br />
          <form onSubmit={this.handleSubmit} className="change-form">
            <label>Cost(in $):
            <br />
              <input
                type="number"
                min="0"
                step="0.01"
                data-number-to-fixed="2"
                data-number-stepfactor="100"
                required value={this.state.cost}
                onChange={this.update('cost')}
                className="change-form-container-input" />
            </label>
            <br />
            <br />

            <label>Payment Frequency(in months):
            <br />
              <input
                min="1"
                step="11"
                max="12"
                type="number"
                required value={this.state.paymentFrequency}
                onChange={this.update('paymentFrequency')}
                className="change-form-container-input" />
            </label>
            <br />
            <br />

            <label>Contract Length(in months):
            <br />
              <input
                type="number"
                min="12"
                step="12"
                max="120"
                required value={this.state.contractLength}
                onChange={this.update('contractLength')}
                className="change-form-container-input" />
            </label>
            <br />
            <br />

            <label>Enrollment Date (YYYY-MM-DD):
            <br />
              <input
                type="date"
                required value={formattedDate}
                min="2010-01-01"
                max={todayDate}
                onChange={this.update('enrollmentDate')}
                className="change-form-container-date"
                 />
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
