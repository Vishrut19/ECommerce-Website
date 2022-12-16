import { Component } from 'react';

import ErrorMessageIcon from '../../molecules/error-message/error-message';

class Page404 extends Component {
	render() {
		return <div>
			<ErrorMessageIcon />
			<p style={{ 
				'textAlign': 'center', 
				'fontWeight': 'bold', 
				'fontSize': '18px' }}
			>
				Page doesn't exist
			</p>
		</div>;
	}
}

export default Page404;