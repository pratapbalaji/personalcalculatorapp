import React, {Component, Prototype} from 'react';
import Display from '../components/Display';
import Button from '../components/Button';
import s from '../../../css/display.css';

export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      operatee: null,
      operator: null,
      result: null
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyPress)
    document.getElementById('container').focus();
  }

  calculate(operator, operatee, value) {
    let holder = 0;
      switch (operator) {
        case '+':
          holder = operatee + value;
          break;
        case 'x':
          holder = operatee * value;
          break;
        case '*':
          holder = operatee * value;
          break;
        case '÷':
          holder = value === 0 ? 0 : operatee / value;
          break;
        case '/':
          holder = value === 0 ? 0 : operatee / value;
          break;
        case '-':
          holder = operatee - value;
          break;
        default:
          holder = operatee + value;
          break;
      }
    holder = +holder.toFixed(3);
    this.recordCalculation(`${operatee} ${operator} ${value} = ${holder}`);
    return holder;
  }

  recordCalculation = (text) => {
    var coreapi = window.coreapi;
    var schema = window.schema;
    var client = new coreapi.Client();
    var action = ["calculations", "create"];
    var params = {calculations: text};
    client.action(schema, action, params).then(function(result) {
    })
  }

  buttonPress = (btn) => {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const type = numbers.includes(parseInt(btn)) ? 'number' : 'operator';
    const { value, operatee, operator, result } = this.state;

    if (btn == 'clear' || btn == 'Escape') {
      this.setState({value: 0, operatee: null, operator: null});
      return
    }

    if (btn == 'Backspace' && !result && value) {
      if (value.toString().length == 1) {
        this.setState({value: 0})
      } else {
        this.setState({value: parseInt(value.toString().slice(0, -1))});
      }
      return
    }

    if (type == 'number') {
      if (operator) {
        if (operatee!==null) {
          this.setState({value: parseInt(value.toString().concat(btn.toString())), result: null})
        } else {
          if (operator == '=') {
            this.setState({value: parseInt(btn), operator: null, result: null});
          } else {
            this.setState({operatee: value, value: parseInt(btn), result: null});
          }
        }
      } else {
        this.setState({value: parseInt(value.toString().concat(btn.toString()))})
      }
    } else {
      let holder = 0;
      if (btn == '=' || btn == 'Enter') {
        if (operator) {
          holder = this.calculate(operator, operatee, value);
        } else {
          holder = value;
        }
        this.setState({value: holder, operatee: null, operator: btn == 'Enter' ? '=' : btn, result: holder});
      } else {
        if (operatee!==null) {
          if (operator) {
            holder = this.calculate(operator, operatee, value);
          } else {
            holder = this.calculate(btn, operatee, value);
          }
          this.setState({value: holder, operatee: null, operator: btn, result: holder});
        } else {
          this.setState({operator: btn})
        } 
      }
    }

  }

  onKeyPress = (e) => {
    let keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', 'x', '*', '-', '/', '÷', '=', 'Enter', 'Escape', 'Backspace'];
    if (keys.includes(e.key)) {
      this.buttonPress(e.key);
    }
  }

  renderButtons = (set) => {
    const buttons = set.map((btn, index)=>{
      const size = btn == 'clear' || btn == 0 ? 'large' : null;
      return <Button text={btn} size={size} buttonPress={()=>this.buttonPress(btn)} key={index} fill={index == set.length - 1 ? 'yes' : 'no'} />
    })
    return buttons;
  }

  render() {
    const { value } = this.state;
    const buttonsList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '+', '-', 'x', '÷', 'clear']
    return (
      <div>
        <Display text={value} />
        <div className={s.calcContainer}>
          <div>
            {this.renderButtons(['clear', '÷'])}
          </div>
          <div>
            {this.renderButtons([7, 8, 9, '-'])}
          </div>
          <div>
            {this.renderButtons([4, 5, 6, 'x'])}
          </div>
          <div>
            {this.renderButtons([1, 2, 3, '+'])}
          </div>
          <div>
            {this.renderButtons([0, '='])}
          </div>
        </div>
      </div>
    )
  }
}