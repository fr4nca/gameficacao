import React, { Component } from "react";

import { connect } from "react-redux";
import { loginUser } from "../../store/actions/authActions";

class Login extends Component {
  state = {
    email: "",
    senha: ""
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(next) {
    if (next.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  handleChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const { email, senha } = this.state;

    const loginUser = {
      email,
      senha
    };

    this.props.loginUser(loginUser);
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: 90 + "vh"
        }}
      >
        <div
          className="container box"
          style={{
            width: 550 + "px",
            padding: 1.5 + "rem"
          }}
        >
          <h3 className="title has-text-centered">Log in</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  onChange={this.handleChange}
                  value={this.state.email}
                  name="email"
                  required
                  className="input is-rounded"
                  type="email"
                  placeholder="Email"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope" />
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-check" />
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  onChange={this.handleChange}
                  required
                  value={this.state.senha}
                  name="senha"
                  className="input is-rounded"
                  type="password"
                  placeholder="Senha"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock" />
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <input
                  type="submit"
                  className="button is-link is-pulled-right is-rounded"
                  value="Entrar"
                />
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
