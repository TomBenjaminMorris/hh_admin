import React, { Component } from "react";
import { connect } from "react-redux";

import Input from "../../components/UI/Input/Input";
import Spinner from "../../components/UI/Spinner/Spinner";
import Logo from "../../assets/images/full_logo.png";
import classes from "./Auth.css";
import * as actions from "../../store/actions/index";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    passwordReset: false,
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };
    this.setState({ controls: updatedControls });
  };

  submitHandler = (event) => {
    event.preventDefault();
    if (this.state.passwordReset) {
      this.props.onPasswordReset(this.state.controls.email.value);
      alert("Link sent");
      this.setState({ passwordReset: false });
    } else {
      this.props.onAuth(
        this.state.controls.email.value,
        this.state.controls.password.value
      );
    }
  };

  handlePasswordResetToggle = () => {
    this.setState((prevState) => {
      return { passwordReset: !prevState.passwordReset };
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    ));

    if (this.state.passwordReset) {
      form = (
        <Input
          elementType={this.state.controls.email.elementType}
          elementConfig={this.state.controls.email.elementConfig}
          value={this.state.controls.email.value}
          invalid={!this.state.controls.email.valid}
          shouldValidate={this.state.controls.email.validation}
          touched={this.state.controls.email.touched}
          changed={(event) => this.inputChangedHandler(event, "email")}
        />
      );
    }

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    return (
      <div className={classes.Auth}>
        <div className={classes.AuthForm}>
          <img className={classes.Logo} src={Logo} alt="logo"/>
          <form onSubmit={this.submitHandler}>
            {form}
            {errorMessage}
            <button className={classes.Button}>
              {this.state.passwordReset
                ? "Email To Send Reset Link"
                : "Sign In"}
            </button>
            <div
              className={classes.ForgotPassword}
              onClick={this.handlePasswordResetToggle}
            >
              {this.state.passwordReset ? "Cancel" : "Forgot Password?"}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password)),
    onPasswordReset: (email) => dispatch(actions.resetPassword(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
