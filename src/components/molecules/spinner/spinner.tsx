import { Component } from 'react';
import { ReactComponent as SpinnerSvg } from './spinner.svg';

class Spinner extends Component {
	render(): JSX.Element {
		return (
			<div 
				className="spinner" 
				style={{ 
					'margin': '0 auto', 
					'textAlign': 'center', 
					'marginTop': '250px', 
					'width': '100%' 
				}}
			>
				<SpinnerSvg />
			</div>
		);
	}
}
export default Spinner;
