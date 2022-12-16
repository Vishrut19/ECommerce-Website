import { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import { connect, ConnectedProps } from 'react-redux';

import PageWrapper from './components/layout/page-wrapper/page-wrapper';
import ProductsList from './components/pages/products-list/product-list';
import ProductDP from './components/pages/pdp/product-dp';
import ErrorBoundary from './components/error-boundary/error-boundary';

import { getCategoriesName, getCurrencies } from './store/dataSlice';
import { RootState } from './store/index.js';
import Page404 from './components/pages/page404/page404';

const connector = connect(null, { getCategoriesName, getCurrencies });
type PropsFromRedux = ConnectedProps<typeof connector>;

class App extends Component<PropsFromRedux, RootState> {

	componentDidMount(): void {
		this.props.getCategoriesName();
		this.props.getCurrencies();
	}

	render(): JSX.Element {
		return (
			<Switch>

				<Route exact path='/'>
					<PageWrapper />
				</Route>
				<Route exact path='/:category'>
					<PageWrapper >
						<ErrorBoundary >
							< ProductsList />
						</ErrorBoundary>
					</PageWrapper >
				</Route>

				<Route exact path='/:category/:id' >
					<PageWrapper >
						<ErrorBoundary>
							<ProductDP />
						</ErrorBoundary>
					</PageWrapper >
				</Route>

				<Route exact path='/*'>
					<Page404 />
				</Route>

			</Switch>
		);
	}
}

export default connector(App);
