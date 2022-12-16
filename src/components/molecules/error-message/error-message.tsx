import React, { Component } from 'react';
import { RootState } from '../../../store';
import { ReactComponent as ErrorSVG } from './error.svg';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';

const mapState = (state: RootState) => ({
	errorMessage: state.data.errorMessage
});
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;


class ErrorMessageIcon extends Component <PropsFromRedux>{
	render() {

		return (
			<div style={{ 
				'margin': '0 auto', 
				'textAlign': 'center', 
				'marginTop': '100px', 
				'width': '100%' }}
			>
				<ErrorSVG />
				<p style={{ 
					'textAlign': 'center', 
					'fontWeight': 'bold', 
					'fontSize': '20px' }}
				>
					{this.props.errorMessage 
					? this.props.errorMessage
					: 'Unknown Error'}
					</p>
				<Link 
					style={{ 
						'display': 'block', 
						'textAlign': 'center', 
						'fontWeight': 'bold', 
						'fontSize': '24px', 
						'marginTop': '30px' }} 
					to="/"
				>
					Back to main page
				</Link>
			</div>
		);
	}
}
export default connector(ErrorMessageIcon);
