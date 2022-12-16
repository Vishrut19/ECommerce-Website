import { Component, ErrorInfo } from 'react';
import ErrorMessageIcon from '../molecules/error-message/error-message';

type State = {
	error: boolean
};

type Props = {
	children: JSX.Element
};

class ErrorBoundary extends Component<Props, State> {
	state = {
		error: false
	};

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		console.log(error, errorInfo);
		this.setState({ error: true });
	}

	render(): JSX.Element {
		if (this.state.error) {
			return <ErrorMessageIcon />;
		}
		return this.props.children;
	}
}

export default ErrorBoundary;