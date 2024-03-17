import { connect } from 'react-redux';
import { Component } from 'react';
import { Field, Information, GameLayout } from '../../components';
import { setFieldValue, checkIsDraw, checkIsThereWinner } from '../../utils';
import { winPaterns } from '../../constants';
import {
	updateField,
	setDraw,
	setGameOver,
	changeCurrentPlayer,
	setReset,
} from '../../actions';

class GameContainer extends Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
		this.handleReset = this.handleReset.bind(this);
	}

	handleClick(index) {
		const { field, currentPlayer, isDraw, isGameEnded, dispatch } = this.props;
		const fieldValue = currentPlayer ? 'X' : 'O';

		if (isDraw || isGameEnded) return;

		const changedField = setFieldValue(field, fieldValue, index);

		dispatch(updateField(changedField));
		if (checkIsThereWinner(fieldValue, changedField, winPaterns)) {
			dispatch(setGameOver());
			return;
		}

		if (checkIsDraw(changedField)) {
			dispatch(setDraw());
			return;
		}

		dispatch(changeCurrentPlayer());
	}

	handleReset() {
		const { dispatch } = this.props;
		dispatch(setReset);
	}

	render() {
		return (
			<GameLayout handleReset={this.handleReset}>
				Игра крестики - нолики
				<Information />
				<Field handleClick={this.handleClick} />
			</GameLayout>
		);
	}
}

const mapStateToProps = (state) => ({
	field: state.field,
	currentPlayer: state.currentPlayer,
	isDraw: state.isDraw,
	isGameEnded: state.isGameEnded,
});

export const Game = connect(mapStateToProps)(GameContainer);
