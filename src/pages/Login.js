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
    const { type, value } = event.target;
    this.setState({ [type]: value },
      () => { this.buttonEnabler(); });
  };

  buttonEnabler = () => {
    const { email, password } = this.state;
    const MIN_PASSWORD_LENGTH = 6;
    const isValidEmail = (/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email);
    // const isValidEmail = true;
    // https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
    if (isValidEmail && password && password.length >= MIN_PASSWORD_LENGTH) {
      return this.setState({ isButtonDisabled: false });
    }
    return this.setState({ isButtonDisabled: true });
  }

  onClick = () => {
    const { email, password } = this.state;
    const { sendUserInfo } = this.props;
    sendUserInfo(email, password);
    this.setState({ loggedIn: true });
  };

  render() {
    const { isButtonDisabled, loggedIn } = this.state;
    return (
      <div>
        {loggedIn && <Redirect to="/carteira" />}

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
            />
          </label>
          <label htmlFor="password-input">
            Senha
            <input
              data-testid="password-input"
              id="password-input"
              type="password"
              onChange={ this.onInputChange }
            />
          </label>
          <button
            type="button"
            disabled={ isButtonDisabled }
            onClick={ this.onClick }
          >
            Entrar
          </button>
        </form>
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
