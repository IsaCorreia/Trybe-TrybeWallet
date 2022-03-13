import propTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  genExpenseTableContent = () => {
    const { expenses } = this.props;
    return expenses.map((expense, index) => {
      const { description, tag, method, value, currency, exchangeRates } = expense;
      const currencies = exchangeRates[currency].name.split('/');
      const roundedValue = (Math.round(value * 100) / 100).toFixed(2);
      const roundedExchange = (
        Math.round(exchangeRates[currency].ask * 100) / 100
      ).toFixed(2);
      const roundedExchangedValue = (
        Math.round(value * exchangeRates[currency].ask * 100) / 100
      ).toFixed(2);
      return (
        <tr key={ index }>
          <td>{description}</td>
          <td>{tag}</td>
          <td>{method}</td>
          <td>{roundedValue}</td>
          <td>{currencies[0]}</td>
          <td>{roundedExchange}</td>
          <td>{roundedExchangedValue}</td>
          <td>Real</td>
        </tr>
      );
    });
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>

        {expenses.length >= 1 && <tbody>{this.genExpenseTableContent()}</tbody>}
      </table>
    );
  }
}

Table.propTypes = {
  expenses: propTypes.arrayOf(propTypes.shape).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
