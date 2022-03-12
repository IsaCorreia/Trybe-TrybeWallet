import propTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  state = {
    sumValue: () => {
      const { expenses } = this.props;
      if (expenses.length >= 1) {
        const summedValue = expenses
          .map((el) => {
            const selectedCurrency = el.exchangeRates[el.currency].ask;
            return parseFloat((el.value * selectedCurrency));
          })
          .reduce((partialSum, curNumber) => partialSum + curNumber);
        return (summedValue);
      }
    },
  };

  render() {
    const { email } = this.props;
    const { sumValue } = this.state;
    return (
      <div>
        <Link to="/">Home</Link>
        <p data-testid="email-field">
          Logado como:
          {` ${email}`}
        </p>
        <p>
          Despesas totais:
          <span data-testid="total-field">{sumValue()}</span>
          {' '}
          <span data-testid="header-currency-field">BRL</span>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: propTypes.string.isRequired,
  expenses: propTypes.arrayOf(propTypes.shape).isRequired,
};

export default connect(mapStateToProps)(Header);
