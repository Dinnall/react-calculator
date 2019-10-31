import React,{Component} from 'react';
import './App.css';

const Buttons = ({ values, divName, handleButtonClick }) => {
  return (
    <div className={divName}>
      {values.map(element => <button value={element} onClick={handleButtonClick}>{element}</button>)}
    </div>
  )
}

class App extends Component{
   constructor(){
     super()
     this.inner = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '.', '0', '=']
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


render(){
     return (
        <div className='calculator-container' >
         <form className='calculator'>
         </form>
        </div>
       )
   }
}

export default App;
