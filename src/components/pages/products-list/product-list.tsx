import { Component } from 'react';
import { RouteComponentProps, withRouter } from "react-router-dom";
import { connect, ConnectedProps } from 'react-redux';

import ProductCard from '../../molecules/product-card/product-card';
import Spinner from '../../molecules/spinner/spinner';
import ErrorMessageIcon from '../../molecules/error-message/error-message';

import { RootState } from '../../../store';
import { getCategorySet } from '../../../store/dataSlice';
import { addToCartThunk } from '../../../store/cartSlice';
import { Product } from '../../../types/data.types';

import styles from './style.module.scss';

const mapState = (state: RootState) => ({
	statusFetching: state.data.statusFetchingCategory,
	categorySet: state.data.categorySet,
	currency: state.status.currency,
});
const connector = connect(mapState, { getCategorySet, addToCartThunk });

type CategoryParam = { category: string };
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & RouteComponentProps<CategoryParam>;

class ProductsList extends Component<Props> {

	componentDidMount(): void {
		const categoryName: string = this.props.match.params.category;
		this.props.getCategorySet(categoryName);
	}

	render(): JSX.Element {
		const { 
			statusFetching, 
			categorySet, 
			currency, 
			addToCartThunk } = this.props;
		const categoryName: string = this.props.match.params.category;
		const printCategoryName: string = (
			categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
			);
		let productCards: JSX.Element[] = [];
		if (currency && categorySet && categorySet.length > 0) {
			productCards = categorySet.map((prod: Product, i) =>
				<ProductCard
					key={i}
					addToCart={addToCartThunk}
					category={categoryName}
					currency={currency}
					product={prod}
				/>);
		}

		return (
			<div className={styles.productsContainer}>
				<h2 className={styles.category}>{printCategoryName}</h2>
				{statusFetching === 'loading' && <Spinner />}
				{statusFetching === 'error' && <ErrorMessageIcon />}
				<div className={styles.productList}>
					{statusFetching === 'idle' && productCards}
				</div>
			</div>
		);
	}
}

export default connector(withRouter(ProductsList));
