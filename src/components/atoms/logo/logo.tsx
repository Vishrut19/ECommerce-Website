import { Component } from 'react';
import { ReactComponent as ALogo } from '../../../icons/a-logo.svg';

class Logo extends Component {
	render(): JSX.Element {
		return (
			<div className="comp-class">
				<ALogo />
			</div>
		);
	}
}
export default Logo;
