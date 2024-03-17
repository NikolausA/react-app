import { connect } from 'react-redux';
import { Component } from 'react';
import { InformationLayout } from './InformationLayout';

class InformationContainer extends Component {
	constructor(props) {
		super(props);

		this.setStatus = this.setStatus.bind(this);
	}

	setStatus() {
		const { currentPlayer, isDraw, isGameEnded } = this.props;
		const fieldValue = currentPlayer ? 'X' : 'O';

		return isGameEnded
			? `Победил ${fieldValue}`
			: isDraw
				? `Ничья`
				: `Ходит: ${fieldValue}`;
	}

	render() {
		return <InformationLayout status={this.setStatus()} />;
	}
}

const mapStateToProps = (state) => ({
	currentPlayer: state.currentPlayer,
	isDraw: state.isDraw,
	isGameEnded: state.isGameEnded,
});

export const Information = connect(mapStateToProps)(InformationContainer);
