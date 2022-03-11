import propTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRates, wallet } from '../actions';

class Form extends Component {
  componentDidMount() {
    const { getRates } = this.props;
    getRates();
  }

  handleSubmit = (event) => {
    const { saveExpense, currencies } = this.props;
    event.preventDefault();
    const { valor, description, currency, method, tag } = event.target;
    const expense = [valor, description, currency, method, tag]
      .reduce((previous, element) => ({
        ...previous,
        [element.name]: element.value,
      }), {});
    saveExpense(expense, currencies);
  };

  currencyOptionGen = () => {
    const { currencies } = this.props;

    console.log(currencies);
    // const keys = Object.keys(currencies);
    // console.log(keys);
    return (<option>BRL</option>);
  }

  render() {
    return (
      <form action="submit" onSubmit={ this.handleSubmit }>
        <label htmlFor="value-input">
          Valor:
          <input
            data-testid="value-input"
            type="number"
            id="value-input"
            name="valor"
          />
        </label>

        <label htmlFor="description-input">
          Descrição
          <input
            data-testid="description-input"
            type="text"
            id="description-input"
            name="description"
          />
        </label>

        <label htmlFor="currency-input">
          Moeda
          <select
            data-testid="currency-input"
            id="currency-input"
            name="currency"
          >
            { this.currencyOptionGen() }
          </select>
        </label>
        <label htmlFor="method-input">
          Método de pagamento:
          <select data-testid="method-input" id="method-input" name="method">
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag-input">
          Categoria:
          <select data-testid="tag-input" id="tag-input" name="tag">
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

const mapStateToProps = (state) => ({
  currencies: state.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (expenses, currencies) => dispatch(wallet(expenses, currencies)),
  getRates: () => dispatch(fetchRates()),
});

Form.propTypes = {
  saveExpense: propTypes.func.isRequired,
  getRates: propTypes.func.isRequired,
  currencies: propTypes.shape({}).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
