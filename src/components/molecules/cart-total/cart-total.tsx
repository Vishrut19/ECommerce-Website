import { Component } from 'react';

import cn from 'classnames';

import styles from './style.module.scss';
import PriceFrame from '../price-frame/price-frame';

type OwnProps = {
	className?: string;
	modal?: boolean;
	quantity: number;
	total: number;
	currencySymbol: string;
};

class CartTotal extends Component<OwnProps> {
	render(): JSX.Element {
		const {
			className,
			modal,
			quantity,
			total,
			currencySymbol
		} = this.props;

		const totalStr: string = currencySymbol + total.toFixed(2);
		const tax: string = currencySymbol + (total * 0.21).toFixed(2);

		return (
			<div className={
				cn(
					styles.totalContainer,
					className,
					{
						[styles['modal']]: modal
					}
				)
			}>
				{!modal &&
					<div>
						<div className={styles.item}>
							<p className={styles.label}>Tax 21%:</p>
							<PriceFrame className={styles.value} price={tax} />
						</div>
						<div className={styles.item}>
							<p className={styles.label}>Quantity:</p>
							<p className={styles.value}>{quantity}</p>
						</div>
					</div>
				}
				<div className={styles.item}>
					<p className={styles.total}>Total:</p>
					<PriceFrame 
						className={styles.value} 
						price={totalStr} 
						size={modal ? 'small' : 'large'} 
					/>
				</div>
			</div >
		);
	}
}
export default CartTotal;
