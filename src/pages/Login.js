import React from 'react';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
  state = {
    isButtonDisabled: true,
    loggedIn: false,
  };

  onInputChange = (event) => {
    const { value } = event.target;
    const MIN_PASSWORD_LENGTH = 6;
    console.log();
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
      console.log('none');
      break;
    }
  };

  handleSubmit = (event) => {
    // const { email, password } = this.state;
    this.setState({ loggedIn: true });
    event.preventDefault();
  }

  render() {
    const { isButtonDisabled, loggedIn } = this.state;
    return (
      <div>
        <h1>Trybe Wallet</h1>
        <h3>Login</h3>
        <form onSubmit={ this.handleSubmit }>
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
          <button type="submit" disabled={ isButtonDisabled }>
            Entrar
          </button>
        </form>
        {loggedIn && <Redirect to="/carteira" />}
      </div>
    );
  }
}

export default Login;
