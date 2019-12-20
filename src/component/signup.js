import React, { Component } from "react";
import { RadioGroup, Radio } from "react-radio-group";
import { FormControlLabel } from "@material-ui/core";
import axios from "axios";

const emailReg = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      mobile_no: null,
      email: null,
      password: null,
      Type: null,
      formErrors: {
        name: "",
        mobile_no: "",
        email: "",
        password: ""
      }
    };
  }

  setStaffType = e => {
    this.setState({
      Type: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (formValid(this.state)) {
      axios
        .post(
          "https://jsonplaceholder.typicode.com/posts",
          this.state
        )
        .then(response => {
          if (response.data.status === true) {
            console.log(response);
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      alert("ensure all fields are correct");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case "name":
        formErrors.name = value.length < 3 ? "minimum 3 characters" : "";
        break;
      case "email":
        formErrors.email = emailReg.test(value) ? "" : "invalid email";
        break;
      case "mobile_no":
        formErrors.mobile_no = value.length < 10 ? "minimum 10 characters" : "";
        break;
      case "password":
        formErrors.password = value.length < 4 ? "minimum 4 characters" : "";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value });
  };
  render() {
    const { formErrors, Type } = this.state;

    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit} noValidate>
          {" "}
          <div className="input-container">
            <span>Full Name</span>
            <input
              type="text"
              name="name"
              onChange={this.handleChange}
              noValidate
            />
            {formErrors.name.length > 0 && (
              <span style={{ color: "red" }}>{formErrors.name}</span>
            )}
          </div>
          <div className="input-container">
            <span>Mobile No.</span>
            <input
              type="number"
              name="mobile_no"
              onChange={this.handleChange}
              noValidate
            />
            {formErrors.mobile_no.length > 0 && (
              <span style={{ color: "red" }}>{formErrors.mobile_no}</span>
            )}
          </div>
          <div className="input-container">
            <span>Email ID</span>
            <input
              type="email"
              name="email"
              onChange={this.handleChange}
              noValidate
            />
            {formErrors.email.length > 0 && (
              <span style={{ color: "red" }}>{formErrors.email}</span>
            )}
          </div>
          <div className="input-container">
            <span>Password</span>
            <input
              type="password"
              name="password"
              onChange={this.handleChange}
              noValidate
            />
            {formErrors.password.length > 0 && (
              <span style={{ color: "red" }}>{formErrors.password}</span>
            )}
          </div>
          <div className="input-container">
            <RadioGroup name="Type" row>
              <FormControlLabel
                checked={Type === "parttime"}
                control={<Radio color="primary" />}
                label="Part Time"
                labelPlacement="end"
                value="parttime"
                onClick={this.setStaffType}
                noValidate
              />
              <FormControlLabel
                checked={Type === "fulltime"}
                control={<Radio color="primary" />}
                label="Full Time"
                labelPlacement="end"
                value="fulltime"
                onClick={this.setStaffType}
                noValidate
              />
            </RadioGroup>
          </div>
          <div className="input-container">
            <button className="button" noValidate>
              Register
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default SignUp;
