import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class GameLayoutContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { isDraw, isGameEnded, children, handleReset } = this.props;
		return (
			<div className="text-center mx-auto my-3">
				<h1 className="text-blue-900">{children}</h1>
				{(isDraw || isGameEnded) && (
					<button
						className="m-0 mx-auto bg-blue-700 text-white rounded p-2"
						onClick={handleReset}
					>
						New Game
					</button>
				)}
				{/* <button
					className={
						isDraw || isGameEnded
							? styles.buttonActive
							: styles.buttonInactive
					}
					onClick={handleReset}
				>
					New Game
				</button> */}
			</div>
		);
	}
}

const mapStateToProps = (state, props) => ({
	isDraw: state.isDraw,
	isGameEnded: state.isGameEnded,
	children: props.children,
	handleReset: props.handleReset,
});

export const GameLayout = connect(mapStateToProps)(GameLayoutContainer);

GameLayout.propTypes = {
	isDraw: PropTypes.bool,
	isGameEnded: PropTypes.bool,
	children: PropTypes.array,
	handleReset: PropTypes.func,
};
