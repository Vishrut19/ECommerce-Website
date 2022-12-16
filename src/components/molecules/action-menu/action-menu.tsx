import { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import CartButton from '../cart-button/cart-button';
import CurrencyButton from '../../atoms/currency-button/currency-button';

import { RootState } from '../../../store';
import { 
	statusSetCurrencyIsShow, 
	statusSetCartShow } from '../../../store/statusSlice';
import { statusSetCurrency } from '../../../store/statusSlice';

import styles from './style.module.scss';

const mapState = (state: RootState) => ({
	quantity: state.cart.quantity,
	currencyIsShow: state.status.currencyIsShow,
	cartIsShow: state.status.cartIsShow,
	currency: state.status.currency,
	statusFetchingCurrencies: state.data.statusFetchingCurrencies,
	currencies: state.data.currencies,
});
const connector = connect(
	mapState, 
	{ statusSetCurrencyIsShow, statusSetCartShow, statusSetCurrency }
);

type PropsFromRedux = ConnectedProps<typeof connector>;

class ActionMenu extends Component<PropsFromRedux, RootState> {
	componentDidMount(): void {
		if (
			this.props.statusFetchingCurrencies === 'idle' 
			&& 
			this.props.currencies
		) {
			const currencyFromLocalStorage = localStorage.getItem('currency');
			const currency = currencyFromLocalStorage 
			? JSON.parse(currencyFromLocalStorage)
			: this.props.currencies[0];
			this.props.statusSetCurrency(currency);
		}
	}

	onCartClick = (): void => {
		if (this.props.quantity === 0) return;
		this.props.cartIsShow 
		? this.props.statusSetCartShow(false) 
		: this.props.statusSetCartShow(true);
	};

	onCurrencyClick = (): void => {
		this.props.currencyIsShow 
		? this.props.statusSetCurrencyIsShow(false) 
		: this.props.statusSetCurrencyIsShow(true);
	};

	render(): JSX.Element {
		const { quantity, currency, currencyIsShow } = this.props;
		return (
			<div className={styles.actionWrapper} >
				<CurrencyButton 
					onCurrencyClick={this.onCurrencyClick} 
					currency={currency} 
					currencyIsShow={currencyIsShow} 
				/>
				<CartButton 
					quantity={quantity} 
					onCartClick={this.onCartClick} 
				/>
			</div>
		);
	}
}
export default connector(ActionMenu);
