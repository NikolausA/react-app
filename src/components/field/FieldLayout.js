import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FieldLayoutContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { field, handleClick } = this.props;

		return (
			<div className="mx-auto my-4 flex flex-wrap w-48">
				{field.map((item, index) => (
					<button
						disabled={item}
						className="box-border min-w-16 h-16 font-black border border-black bg-lightblue leading-10"
						key={index}
						onClick={() => handleClick(index)}
					>
						{item}
					</button>
				))}
			</div>
		);
	}
}

const mapStateToProps = (state, props) => ({
	field: state.field,
	handleClick: props.handleClick,
});

export const FieldLayout = connect(mapStateToProps)(FieldLayoutContainer);

FieldLayout.propTypes = {
	field: PropTypes.array,
	handleClick: PropTypes.func,
};
