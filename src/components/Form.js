import propTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRates, wallet } from '../actions';

class Form extends Component {
  state = {
    rates: {},
    expense: {
      currency: 'USD',
      method: 'dinheiro',
      tag: 'alimentacao',
      value: '',
      description: '',
    },
  };

  componentDidMount = async () => {
    const { getRates } = this.props;
    const rates = await getRates();
    this.setState({ rates });
  };

  handleSubmit = async (event) => {
    const { saveExpense, getRates } = this.props;
    const {
      expense,
      expense: { description, value },
    } = this.state;
    event.preventDefault();
    const formIsFilled = description !== '' && value !== '';
    if (formIsFilled) {
      const rates = await getRates();
      const teste = { ...expense, exchangeRates: rates };
      saveExpense(teste);
      this.setState({
        expense: {
          currency: 'USD',
          method: 'dinheiro',
          tag: 'alimentacao',
          value: '',
          description: '',
        },
      });
    }
  };

  currencyOptionGen = () => {
    const { rates } = this.state;
    const currencies = Object.keys(rates);
    return currencies
      .filter((currency) => currency !== 'USDT')
      .map((currency, index) => (<option key={ index }>{currency}</option>));
  };

  onInputChange = ({ target }) => {
    const { expense } = this.state;
    this.setState({ expense: { ...expense, [target.id]: target.value } });
  };

  render() {
    const { rates, expense: { value, description } } = this.state;
    return (
      <form action="submit" onSubmit={ this.handleSubmit }>
        <label htmlFor="value">
          Valor:
          <input
            data-testid="value-input"
            type="number"
            id="value"
            onChange={ this.onInputChange }
            value={ value }
          />
        </label>

        <label htmlFor="description">
          Descrição
          <input
            data-testid="description-input"
            type="text"
            id="description"
            onChange={ this.onInputChange }
            value={ description }
          />
        </label>

        <label htmlFor="currency">
          Moeda
          <select
            data-testid="currency-input"
            id="currency"
            onChange={ this.onInputChange }
          >
            {rates ? this.currencyOptionGen() : <span>Carregando...</span>}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select
            data-testid="method-input"
            id="method"
            onChange={ this.onInputChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          Categoria:
          <select
            data-testid="tag-input"
            id="tag"
            onChange={ this.onInputChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
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
