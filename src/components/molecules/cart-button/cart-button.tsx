import React, { Component } from 'react';
import { ReactComponent as CartLogo } from '../../../icons/empty-cart.svg';
import styles from './style.module.scss';

interface OwnProps {
	quantity: number;
	onCartClick: () => void;
}

class CartButton extends Component<OwnProps> {
	render() {
		const { quantity, onCartClick } = this.props;
		return (
			<button onClick={onCartClick} className={styles.cartButton}>
				<CartLogo />
				{quantity > 0 && <p className={styles.quantity}> {quantity}</p>}
			</button>
		);
	}
}
export default CartButton;
