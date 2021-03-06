import React,{Component} from 'react';
import './App.css';

const Buttons = ({ values, divName, handleButtonClick }) => {
  return (
    <div className={divName}>
      {values.map(element => 
        <button 
        key={element.toString()}
        value={element}
        onClick={handleButtonClick}>
        {element}
        </button>)}
    </div>
  )
}

class App extends Component{
   constructor(){
     super()
     this.inner = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.', '=']
     this.operators = ['/', '*', '+', '-']
     this.allowedKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '*', '-', '+', '/', '.', '=', 'Backspace', 'Enter', 'c']
      
     this.state = {
      clearOrDelete: 'DEL',
      expression: '',
      value: '',
      clickedValue: '',
      keyPress: false
     }
   }

evaluate = exp => {
    try {
      let ans = eval(exp)

      if (ans.toString().length > 17) {
        return ans.toPrecision(9)
      }

      return ans

    } catch (e) {
      return NaN
    }
  }

  // Keyboard  animation 
buttonAnimation = () => {
    const { keyPress } = this.state
    if (keyPress) {
      return 'button-circle'
    } else {
      return ''
    }
  }

  // Checks length of expression and returns a class name 
checkLength = () => {
    const { expression } = this.state

    if (expression.length > 16) {
      return 'expression-xsmall'
    } else if (expression.length > 13) {
      return 'expression-small'
    } else if (expression.length > 9) {
      return 'expression-medium'
    } else {
      return ''
    }
  }

  checkKeyForExpression = () => {
    const { expression, value, clickedValue } = this.state

    let newExpression

    // When user clicks on equals sign 
    if (clickedValue === '=' || clickedValue === 'Enter') {
      if (value || value === 0) {
        this.setState({
          clearOrDelete: 'CLR',
          expression: value.toString(),
          value: '',
          clickedValue: ''
        })
      }

      // When user clicks on DEL sign 
    } else if (clickedValue === 'DEL' || clickedValue === 'Backspace') {
      // Slice the last element of the expression and assign to newExpression 
      newExpression = expression.slice(0, expression.length - 1)

      // And if this new expression is blank  
      if (!newExpression) {
        this.setState({
          expression: newExpression,
          value: '',
          clickedValue: ''
        })

        // If the last element of the new expression is a number 
      } else if (!isNaN(newExpression[newExpression.length - 1])) {
        // Evaluate 
        let newValue = this.evaluate(newExpression)
        this.setState({
          expression: newExpression,
          value: newValue,
          clickedValue: ''
        })
      } else {
        // Keep the value 
        this.setState({
          expression: newExpression,
          clickedValue: ''
        })
      }

      // When user clicks on CLR sign 
    } else if (clickedValue === 'CLR' || clickedValue === 'c') {
      // Switch the CLR button to DEL button and clear the screen 
      this.setState({
        clearOrDelete: 'DEL',
        expression: '',
        value: '',
        clickedValue: ''
      })

      // When the expression's length is less than 17, go ahead with pressing numbers and operators 
    } else if (expression.length < 17) {

      // When user clicks on any number 
      if (!isNaN(clickedValue)) {
        let lastValueOfExp = expression[expression.length - 1]

        // If there's no expression yet or if the last value of expression is an operator 
        if (!expression || this.operators.includes(lastValueOfExp)) {

          // Don't allow user to type 0 
          if (clickedValue !== '0') {
            newExpression = expression + clickedValue
            let newValue = this.evaluate(newExpression)

            this.setState({
              clearOrDelete: 'DEL',
              expression: newExpression,
              value: newValue,
              clickedValue: ''
            })
          }

          // Otherwise allow all numbers and operators 
        } else {
          newExpression = expression + clickedValue
          let newValue = this.evaluate(newExpression)

          this.setState({
            clearOrDelete: 'DEL',
            expression: newExpression,
            value: newValue,
            clickedValue: ''
          })

        }

        // When user clicks on anything other than the 3 types listed above 
      } else {
        let lastValueOfExp = expression[expression.length - 1]

        // If clicked value is an operator 
        if (this.operators.includes(clickedValue)) {

          // Check to see that the expression is filled and last value of expression is NOT an operator 
          if (expression && !this.operators.includes(lastValueOfExp)) {
            newExpression = expression + clickedValue
            this.setState({
              expression: newExpression,
              clickedValue: '',
              keyPress: true
            }, () => {
              setTimeout(() => {
                this.setState({
                  keyPress: false
                })
              }, 300)
            })
          }

        } else {
          // Otherwise, add to the string 
          newExpression = expression + clickedValue

          this.setState({
            expression: newExpression,
            clickedValue: ''
          })
        }
      }
    }
 }

  handleKey = e => {
    let clickedValue = e.key
    if (this.allowedKeys.includes(clickedValue)) {
      this.setState({ clickedValue }, () => {
        // check expression of each press
        this.checkKeyForExpression()
      })
    }
  }

  handleButtonClick = e => {
    e.preventDefault()
    let clickedValue = e.target.value

    this.setState({ clickedValue }, () => {
      // check expression of each press
      this.checkKeyForExpression()
    })
  }


render(){
      const { clearOrDelete, expression, value } = this.state
      console.log("EXpression:",expression)
          // Add class to expression div depending on the length of expression 
      const expressionClass = this.checkLength()

     return (
        <div className='calculator-container' >
          <form className='calculator'>
         <h2 className='intro-title'>REACT CALCULATOR</h2>
          <p className='intro-title'>Do some Math.</p>
            <div className={`expression ${expressionClass}`}>
              <p>{expression}</p>
            </div>
            <div className='value'>
              <p>{value}</p>
            </div>
            <div className='buttons-container'>
              <Buttons
                values={this.inner}
                divName='numbers'
                handleButtonClick={this.handleButtonClick} />
              <div className='operations'>
                <button value={clearOrDelete} onClick={this.handleButtonClick} >{clearOrDelete}</button>
                <button value='/' onClick={this.handleButtonClick}>÷</button>
                <button value='*' onClick={this.handleButtonClick}>x</button>
                <button value='+' onClick={this.handleButtonClick}>+</button>
                <button value='-' onClick={this.handleButtonClick}>-</button>
              </div>
            </div>
          <p className='intro-title'>Built by:</p>
           <br />
           <p className='intro-title'> Michael Dinnall </p>
          </form>
        </div>
       )
   }
}

export default App;
