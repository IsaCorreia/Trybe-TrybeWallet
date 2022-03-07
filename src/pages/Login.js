import propTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../actions';

class Login extends React.Component {
  state = {
    isButtonDisabled: true,
    loggedIn: false,
  };

  onInputChange = (event) => {
    const { value } = event.target;
    const MIN_PASSWORD_LENGTH = 6;
    switch (event.target.type) {
    case 'email':
      this.setState({ email: value });
      break;
    case 'password':
      if (value.length >= MIN_PASSWORD_LENGTH) {
        this.setState({ isButtonDisabled: false, password: value });
      } else {
        this.setState({ isButtonDisabled: true });
      }
      break;
    default:
      return null;
    }
  };

  handleSubmit = (event) => {
    const { email, password } = this.state;
    const { sendUserInfo } = this.props;
    sendUserInfo(email, password);
    this.setState({ loggedIn: true });
    event.preventDefault();
  };

  render() {
    const { isButtonDisabled, loggedIn } = this.state;
    return (
      <div>
        <h1>Trybe Wallet</h1>
        <h3>Login</h3>
        <form>
          <label htmlFor="email-input">
            Email
            <input
              data-testid="email-input"
              id="email-input"
              type="email"
              onChange={ this.onInputChange }
              required
            />
          </label>
          <label htmlFor="password-input">
            Senha
            <input
              data-testid="password-input"
              id="password-input"
              type="password"
              minLength="6"
              onChange={ this.onInputChange }
              required
            />
          </label>
          <button
            type="button"
            disabled={ isButtonDisabled }
            onClick={ this.handleSubmit }
          >
            Entrar
          </button>
        </form>
        {loggedIn && <Redirect to="/carteira" />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ user: state.user });

const mapDispatchToProps = (dispatch) => ({
  sendUserInfo: (email, password) => {
    dispatch(login(email, password));
  },
});

Login.propTypes = {
  sendUserInfo: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
