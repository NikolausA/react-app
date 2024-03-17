import { Component } from 'react';
import PropTypes from 'prop-types';

export class InformationLayout extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div className="text-violet-800 text-2xl">{this.props.status}</div>;
	}
}

InformationLayout.propTypes = {
	status: PropTypes.string,
};
