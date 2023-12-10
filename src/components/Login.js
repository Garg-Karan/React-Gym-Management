import React, { Component } from "react";
import "./css/Login.css";
import MyImage from "./images/gymholic.jpg";
import { myAxios } from "../Services/Helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Cookies } from "react-cookie";
import { Navigate } from "react-router-dom";

// set up cookies
const cookies = new Cookies();

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      shouldRedirect: false,
    };
  }

  handleValueChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submitForm = () => {
    if (this.state.username == "" || this.state.password == "") {
      toast.error("Username/Password is Required !!", {
        position: "top-center",
      });
      return;
    }
    myAxios
      .post("/user/authenticate", this.state)
      .then((response) => {
        this.setState({
          username: "",
          password: "",
          shouldRedirect: true,
        });
        cookies.set("jwtToken", response.data.jwtToken, {
          maxAge: 3600,
        });
      })
      .catch((error) => {
        if (error.response.status == "403") {
          toast.error("Invalid Username/Password !!", {
            position: "top-center",
          });
        } else {
          toast.error("Something went Wrong in Server !!", {
            position: "top-center",
          });
        }
      });
  };

  render() {
    return (
      <section className="h-100 gradient-form" style={{ background: "#eee" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img
                          src={MyImage}
                          style={{ width: "185px" }}
                          alt="logo"
                        />
                        <h4 className="mt-1 mb-5 pb-1">
                          We are The Gymholic Team
                        </h4>
                      </div>

                      <form>
                        <p>Please login to your account</p>

                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="username_login"
                            className="form-control"
                            name="username"
                            onChange={this.handleValueChange}
                            value={this.state.username}
                          />
                          <label className="form-label">Username</label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="password_login"
                            name="password"
                            className="form-control"
                            onChange={this.handleValueChange}
                            value={this.state.password}
                          />
                          <label className="form-label">Password</label>
                        </div>

                        <div className="text-center pt-1 mb-5 pb-1">
                          <button
                            className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                            type="button"
                            onClick={this.submitForm}
                          >
                            Log in
                          </button>
                          <a className="text-muted pl-2 px-2" href="#!">
                            Forgot password?
                          </a>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">We are more than just a Gym</h4>
                      <p className="small mb-0">
                        Gymholic Wellness Studio is whole about transforming
                        mind,body and soul to the best version of yourself with
                        our expert trainers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.shouldRedirect ? <Navigate replace to="/members" state={{ todos: 1}}/> : null}
        <ToastContainer />
      </section>
    );
  }
}
export default Login;
