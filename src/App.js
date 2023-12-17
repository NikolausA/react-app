import styles from './App.module.css';
import { useState } from 'react';

export const App = () => {
	const NUMS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '-', '=', 'C'];

	const [operand1, setOperand1] = useState('');
	const [operand2, setOperand2] = useState('');
	const [operator, setOperator] = useState('');
	const [isResult, setIsResult] = useState(false);

	const setHandler = (item) => {
		if (item === '+' || item === '-') {
			return handleOperatorClick;
		} else if (item === 'C') {
			return handleClearClick;
		} else if (item === '=') {
			return handleEqualsClick;
		} else return handleOperandClck;
	};

	const handleOperandClck = (e) => {
		if (isResult) {
			setIsResult(!isResult);
			setOperand1(e.target.innerText);
		}
		if (!operator) {
			setOperand1(operand1 + e.target.innerText);
		}
		if (operand1 && operator) {
			setOperand2(operand2 + e.target.innerText);
		}
	};

	const handleOperatorClick = (e) => {
		if (operand1) {
			setOperator(e.target.innerText);
		}
	};

	const handleEqualsClick = () => {
		if (operand1 && operand2 && operator === '+') {
			setOperand1(Number(operand1) + Number(operand2));
			setOperator('');
			setOperand2('');
			setIsResult(!isResult);
		} else if (operand1 && operand2 && operator === '-') {
			setOperand1(Number(operand1) - Number(operand2));
			setOperator('');
			setOperand2('');
			setIsResult(!isResult);
		}
	};

	const handleClearClick = () => {
		setOperand1('');
		setOperand2('');
		setOperator('');
		setIsResult(false);
	};

	return (
		<div className={styles.app}>
			<p className={isResult ? styles.displayResult : styles.display}>
				{operand1} {operator} {operand2}
			</p>
			<ul className={styles.keyboard}>
				{NUMS.map((num) => (
					<li className={styles.button} key={num} onClick={setHandler(num)}>
						{num}
					</li>
				))}
			</ul>
		</div>
	);
};
