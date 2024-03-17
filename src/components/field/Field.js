import { Component } from 'react';
import { FieldLayout } from './FieldLayout';

export class Field extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <FieldLayout handleClick={this.props.handleClick} />;
	}
}
