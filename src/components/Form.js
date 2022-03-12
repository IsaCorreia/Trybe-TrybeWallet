import propTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRates, wallet } from '../actions';

class Form extends Component {
  state = {
    rates: {},
  };

  componentDidMount = async () => {
    const { getRates } = this.props;
    const rates = await getRates();
    this.setState({ rates });
  };

  handleSubmit = (event) => {
    const { saveExpense } = this.props;
    const { rates } = this.state;
    event.preventDefault();
    const { value, currency, method, tag, description } = event.target;
    const expense = [description, tag, method, currency, value].reduce(
      (prevInfo, currentElement) => ({
        [currentElement.id]: currentElement.value,
        ...prevInfo,
        exchangeRates: rates,
      }),
      {},
    );
    saveExpense(expense);
  };

  currencyOptionGen = () => {
    const { rates } = this.state;
    const currencies = Object.keys(rates);
    return currencies.map((currency, index) => (
      <option key={ index }>{currency}</option>
    ));
  };

  render() {
    const { rates } = this.state;
    return (
      <form action="submit" onSubmit={ this.handleSubmit }>
        <label htmlFor="value">
          Valor:
          <input data-testid="value-input" type="number" id="value" />
        </label>

        <label htmlFor="description">
          Descrição
          <input data-testid="description-input" type="text" id="description" />
        </label>

        <label htmlFor="currency">
          Moeda
          <select data-testid="currency-input" id="currency">
            {rates ? this.currencyOptionGen() : <span>Carregando...</span>}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select data-testid="method-input" id="method">
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          Categoria:
          <select data-testid="tag-input" id="tag">
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>

        <button type="submit" onClick={ () => {} }>
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (expenses) => dispatch(wallet(expenses)),
  getRates: () => dispatch(fetchRates()),
});

Form.propTypes = {
  saveExpense: propTypes.func.isRequired,
  getRates: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
