import { Dropdown } from "bootstrap";
import React, { Component } from "react";
import { myAxios } from "../Services/Helper";
import { ToastContainer, toast } from "react-toastify";
import { Cookies } from "react-cookie";

// set up cookies
const cookies = new Cookies();

class AddMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      gender: "Others",
      contact: "",
      emergencyContact: "",
      emailId: "",
      address: "",
      fatherName: "",
      subscriptionStartDate: "1900-01-01",
      subscriptionEndDate: "1900-01-01",
      fees: "0",
      subscriptionPlan: "1 Month",
      memberStatus: "Active",
      trainer: "",
    };
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = (event) => {
    myAxios
      .post("/member/save", this.state, {
        headers: { Authorization: `Bearer ${cookies.get("jwtToken")}` },
      })
      .then((response) => {
        toast.success(response.data.id, {
          position: "top-center",
        });
      })
      .catch((error) => {
        toast.error(`Error Status is ${error.response.status} !!`, {
          position: "top-center",
        });
      });
    event.preventDefault();
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} autoComplete="off">
        <div className="row d-flex justify-content-center align-items-center h-100 mt-2">
          <div className="col-xl-11">
            <h2>Add Member</h2>
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-xl-6">
                <div className="row">
                  <div className="col-6">
                    <label>Client Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="clientName"
                      name="name"
                      value={this.state.name}
                      required
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="col-6">
                    <label>Gender</label>
                    <select
                      className="form-select"
                      name="gender"
                      onChange={this.handleChange}
                      value={this.state.gender}
                      required
                    >
                      <option defaultValue={"NA"}>N/A</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-6">
                    <label>Contact</label>
                    <input
                      type="text"
                      className="form-control"
                      id="contact"
                      name="contact"
                      value={this.state.contact}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="col-6">
                    <label>Emergency Contact</label>
                    <input
                      type="text"
                      className="form-control"
                      id="emergencyContact"
                      name="emergencyContact"
                      value={this.state.emergencyContact}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-6">
                    <label>Email Id</label>
                    <input
                      type="text"
                      className="form-control"
                      id="emailId"
                      name="emailId"
                      value={this.state.emailId}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="col-6">
                    <label>Father Name </label>
                    <input
                      type="text"
                      className="form-control"
                      id="fatherName"
                      name="fatherName"
                      value={this.state.fatherName}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <label>Address </label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={this.state.address}
                    onChange={this.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-xl-6">
                <div className="row">
                  <div className="col-6">
                    <label>Membership Start Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="subscriptionStartDate"
                      name="subscriptionStartDate"
                      value={this.state.subscriptionStartDate}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="col-6">
                    <label>Membership End Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="subscriptionEndDate"
                      name="subscriptionEndDate"
                      value={this.state.subscriptionEndDate}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-6">
                    <label>Subscription Plan</label>
                    <select
                      className="form-select"
                      name="subscriptionPlan"
                      onChange={this.handleChange}
                      value={this.state.subscriptionPlan}
                      required
                    >
                      <option value="1 Month">1 Month</option>
                      <option value="3 Months">3 Months</option>
                      <option value="6 Months">6 Months</option>
                      <option value="Yearly">Yearly</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label>Subscription Fee </label>
                    <input
                      type="text"
                      className="form-control"
                      id="fees"
                      name="fees"
                      value={this.state.fees}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-6">
                    <label>Membership Status</label>
                    <select
                      className="form-select"
                      name="memberStatus"
                      onChange={this.handleChange}
                      value={this.state.memberStatus}
                      required
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="About To Finish">About To Finish</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label>Trainner Assigned </label>
                    <input
                      type="text"
                      className="form-control"
                      id="trainer"
                      name="trainer"
                      value={this.state.trainer}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center mt-2">
          <input type="submit" value="Submit" />
        </div>
        <ToastContainer />
      </form>
    );
  }
}

export default AddMember;
