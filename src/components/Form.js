import propTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { wallet } from '../actions';

class Form extends Component {
  handleClick = () => {};

  handleSubmit = (event) => {
    const { saveExpenses } = this.props;
    event.preventDefault();
    const { valor, description, currency, method, tag } = event.target;
    const expense = [valor, description, currency, method, tag]
      .reduce((acc, element) => ({
        ...acc,
        [element.name]: element.value,
      }), {});
    saveExpenses(expense);
  };

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
            <option value="BRL">BRL</option>
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
            <option value="transportacao">Transportação</option>
            <option value="saude">Saúde</option>
          </select>
        </label>

        <button type="submit" onClick={ this.handleClick }>
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  saveExpenses: (expenses) => {
    dispatch(wallet(expenses));
  },
});

Form.propTypes = {
  saveExpenses: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
