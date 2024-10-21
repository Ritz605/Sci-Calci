import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-user-cal',
  standalone: true,
  imports: [],
  templateUrl: './user-cal.component.html',
  styleUrl: './user-cal.component.css'
})
export class UserCalComponent {

  display: string = '';
  currentInput: string = '';
  scientificValue: string = '';

  onClick(value: string) {
    const lastChar = this.currentInput[this.currentInput.length-1];

    if(this.isOperator(lastChar) && this.isOperator(value)) {
      this.display = 'Error';
      return;
    }

    if(value === 'pi') {
      this.currentInput += Math.PI.toString();
    }else if(['sin', 'cos', 'tan', 'log' ,'sqrt'].includes(value)) {
      if(this.isOperator(lastChar) || lastChar === '(' || this.currentInput === '') {
        this.scientificValue = value;
        this.currentInput += `${value}(`;
      }
      else {
        this.display = 'Error';
        return;
      }
    }else if(value === 'square') {
      const lastNumber = this.getLastNumber(this.currentInput);
      if(lastNumber) {
        this.currentInput = this.currentInput.slice(0, this.currentInput.length - lastNumber.toString().length) + `${lastNumber}²`;
        this.display = this.currentInput;
      }
      else {
        this.display = 'Error'
      }
    }else if(value === '(' || value === ')') {
      this.currentInput += value;
    }else {
      this.currentInput += value;
    }
    
    this.display = this.currentInput;
  }


  getLastNumber(input: string): number {
    const matches = input.match(/(-?\d+\.?\d*)$/);
    return matches ? parseFloat(matches[0]) : 0;
  }

  isOperator(char: string): boolean {
    return ['+', '-', '*', '/'].includes(char);
  }

  

  handleScientificFunction(expression: string): string {
    return expression
      .replace(/sin\(([^)]+)\)/g, (_, num) => `Math.sin(${num} * Math.PI / 180)`)
      .replace(/cos\(([^)]+)\)/g, (_, num) => `Math.cos(${num} * Math.PI / 180)`)
      .replace(/tan\(([^)]+)\)/g, (_, num) => `Math.tan(${num} * Math.PI / 180)`)
      .replace(/log\(([^)]+)\)/g, (_, num) => `Math.log(${num})`)
      .replace(/sqrt\(([^)]+)\)/g, (_, num) => `Math.sqrt(${num})`)
      .replace(/(-?\d+\.?\d*)\s*²/g, (_, num) => `Math.pow(${num}, 2)`);

  }

  
  calculate() {
   try {
    if(this.isInvalidInput(this.currentInput)) {
      this.display = 'Error';
      return;
    }

    let processedInput = this.handleScientificFunction(this.currentInput);

    const result = eval(processedInput);
    this.currentInput = result.toString();
    this.display = this.currentInput;
   }catch(error) {
    this.display = 'Error';
   }
   
  }

  
  isInvalidInput(value: string): boolean {
    const lastChar = this.currentInput[this.currentInput.length-1];
    const openParenthesis = (this.currentInput.match(/\(/g) || []).length;
    const closeParenthesis = (this.currentInput.match(/\)/g) || []).length;

    if(this.isOperator(lastChar) || lastChar === '(' || lastChar === '.' || openParenthesis !== closeParenthesis) {
      return true;
    }

    return false;
  }

  

  clear() {
    this.display = '';
    this.currentInput = '';
    this.scientificValue = '';
  }
}
