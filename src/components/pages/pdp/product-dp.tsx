import { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../../store';
import { getProduct } from '../../../store/dataSlice';

import Spinner from '../../molecules/spinner/spinner';
import ErrorMessageIcon from '../../molecules/error-message/error-message';
import ProductDPView from './product-dp-view';
import { 
	addProductToCart, 
	updateProductInCart, 
	addToCartThunk } from '../../../store/cartSlice';
import { SelectedAttr } from '../../../types/data.types';
import { toCleanDescription } from '../../../helpers/helpers';

const mapState = (state: RootState) => ({
	thisProduct: state.data.product,
	statusFetchingProduct: state.data.statusFetchingProduct,
	currency: state.status.currency,
});
const connector = connect(
	mapState, 
	{ getProduct, 
		addProductToCart, 
		updateProductInCart, 
		addToCartThunk }
	);

type ProductParam = { id: string };
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & RouteComponentProps<ProductParam>;
type State = {
	activeImg: string;
	attributes: SelectedAttr;
};

class ProductDP extends Component<Props, State> {
	state = {
		activeImg: '',
		attributes: {}
	};

	componentDidMount = (): void => {
		const id: string = this.props.match.params.id;
		this.props.getProduct(id);
	};

	onChangeImg = (activeImg: string): void => {
		this.setState({ activeImg });
	};

	onSelectAttr = (attr: SelectedAttr): void => {
		this.setState((state) => {
			return { attributes: { ...state.attributes, ...attr } };
		});
	};

	onAddToCart = (): void => {
		this.props.addToCartThunk({ 
			attr: this.state.attributes, 
			idProd: this.props.thisProduct.id 
		});
	};

	render(): JSX.Element {
		const { statusFetchingProduct, thisProduct, currency } = this.props;
		let cleanHtml = '';
		if (thisProduct && thisProduct.description) {
			cleanHtml = toCleanDescription(thisProduct.description);}
		return (
			<>
				{(statusFetchingProduct === 'loading' || !thisProduct) 
					&& <Spinner />}
				{statusFetchingProduct === 'error' && <ErrorMessageIcon />}
				{statusFetchingProduct === 'idle' && thisProduct &&
					< ProductDPView
						product={thisProduct}
						currency={currency}
						cleanDescriprion={cleanHtml}
						activeImg={this.state.activeImg}
						onAddToCart={this.onAddToCart}
						onSelectAttr={this.onSelectAttr}
						onChangeImg={this.onChangeImg}
					/>}
			</>
		);
	}
}
export default connector(withRouter(ProductDP));
