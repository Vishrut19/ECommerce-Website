import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import CartProductCard 
	from '../../molecules/cart-product-card/cart-product-card';
import CartTotal from '../../molecules/cart-total/cart-total';
import Button from '../../atoms/button/button';
import ErrorBoundary from '../../error-boundary/error-boundary';

import { RootState } from '../../../store';
import { 
	updateProductInCart, 
	deleteProductFromCart, 
	clearCart } from '../../../store/cartSlice';
import { 
	statusSetCartView,
	statusSetCartPageShow, 
	statusSetCartShow, 
	statusOnShowModal } from '../../../store/statusSlice';
import { Price } from '../../../types/data.types';
import { getPrice } from '../../../helpers/helpers';

import styles from './style.module.scss';

const mapState = (state: RootState) => ({
	cartState: state.cart,
	currency: state.status.currency,
});

const connector = connect(mapState, {
	updateProductInCart,
	deleteProductFromCart,
	clearCart,
	statusSetCartView,
	statusSetCartPageShow,
	statusSetCartShow,
	statusOnShowModal
});

type PropsFromRedux = ConnectedProps<typeof connector>;
type OwnProps = { modal?: boolean };
type Props = PropsFromRedux & OwnProps;

class Cart extends Component<Props> {
	refCart: React.RefObject<HTMLDivElement> 
		= React.createRef<HTMLDivElement>();

	componentDidUpdate = (): void => {
		if (this.props.cartState.quantity === 0) {
			this.props.statusSetCartShow(false);
			this.props.statusSetCartPageShow(false);
		}
	};

	onUpdateProductCount = (
		id: string, 
		oldCount: number, 
		value: number): void => {
		if ((oldCount + value) < 1) {
			this.props.deleteProductFromCart(id);
		} else {
			this.props.updateProductInCart({ id, value });
		}
	};

	onOrder = (): void => {
		this.props.statusOnShowModal({ 
			'title': 'Cart', 
			'message': 'Thanks for shopping' });
		this.props.clearCart();
		this.onCloseCart();
	};

	onViewBag = (): void => {
		this.props.statusSetCartShow(false);
		//this.props.statusSetCartView(true);
		this.props.statusSetCartPageShow(true);
	};

	onCloseCart = (): void => {
		this.props.statusSetCartShow(false);
		this.props.statusSetCartPageShow(false);
		//this.props.statusSetCartView(true);
	};

	onCheckOut = (): void => {
		this.onCloseCart();
	};

	onKeyDownContainer = (e: React.KeyboardEvent<HTMLDivElement>): void => {
		if ((e.key === 'Escape') || (e.shiftKey && e.key === 'Tab')) {
			this.onCloseCart();
		}
	};

	onKeyDownLastElem = (e: React.KeyboardEvent<HTMLButtonElement>): void => {
		if (!e.shiftKey && e.key === 'Tab') {
			this.refCart.current?.focus();
		}
	};

	render(): JSX.Element {
		const { modal, cartState, currency } = this.props;
		const { products, quantity = 0 } = cartState;
		let total = 0;
		let detailFrame: JSX.Element[] = [];
		if (products && products.length > 0) {
			products.forEach((cartProduct) => {
				const price: Price = getPrice(cartProduct.product, currency);
				total += cartProduct.count * price.amount;
			});
		}

		if (products) detailFrame = products.map((cartProduct) => {
			const price: Price = getPrice(cartProduct.product, currency);
			return (
				<CartProductCard
					key={cartProduct.id}
					cartProduct={cartProduct}
					price={price}
					onUpdateProductCount={this.onUpdateProductCount}
					modal={modal}
					className={styles.productItem}
				/>
			);
		});

		return (
			<div className={
					modal ? styles.cartOverlayModal : styles.cartOverlay
				} 
			>
				<div className={styles.cartWrapper}>
					<div
						tabIndex={0}
						className={
							modal ? styles.modalContainer : styles.cartContainer
						}
						onClick={(e) => { e.stopPropagation(); }}
						ref={this.refCart}
						onKeyDown={(e) => this.onKeyDownContainer(e)}
					>
						<ErrorBoundary>
							<>
								<div className={styles.headerCart}>
									{modal 
									&& <h2 
											className={styles.headerCart}
											>
												My Bag, <span>
														{quantity} items
													</span>
											</h2>}
									{!modal 
									&& <h2 className={styles.headerCart}>
											Cart
										</h2>}
								</div>

								{products &&
									<div className={styles.productList}>
										{detailFrame}
									</div>
								}

								<CartTotal 
									modal={modal} 
									quantity={quantity} 
									currencySymbol={currency.symbol} 
									total={total} 
									className={styles.total} 
								/>

								<div className={styles.control}>
									{!modal && <Button 
										className={styles.btn} 
										autoFocus 
										onClick={this.onOrder}
										>
											ORDER
										</Button>
									}
									{modal && <Button 
											className={styles.btn} 
											onClick={this.onViewBag}
										>
											VIEW BAG
										</Button>
									}
									{modal && <Button 
										className={styles.btn} 
										onKeyDown={this.onKeyDownLastElem} 
										onClick={this.onCheckOut}
										>
											CHEK OUT
										</Button>
									}
								</div>
							</>
						</ErrorBoundary>
					</div>
				</div>
			</div>
		);
	}
}

export default connector(Cart);


