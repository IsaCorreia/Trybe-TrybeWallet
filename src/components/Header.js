import propTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <Link to="/">Home</Link>
        <p data-testid="email-field">
          Logado como:
          {` ${email}`}
        </p>
        <p>
          Despesas totais:
          <span data-testid="total-field">{0}</span>
          {' '}
          <span data-testid="header-currency-field">BRL</span>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: propTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
