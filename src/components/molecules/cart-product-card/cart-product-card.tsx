import { Component } from 'react';
import cn from 'classnames';

import Button from '../../atoms/button/button';
import AttributeFrame from '../attribute-frame/attribute-frame';
import PriceFrame from '../price-frame/price-frame';
import NameFrame from '../name-frame/name-frame';
import Carousel from '../carousel/carousel';
import { ReactComponent as Inc } from '../../../icons/inc.svg';
import { ReactComponent as Dec } from '../../../icons/dec.svg';

import { CartProduct, Price } from './../../../types/data.types';

import styles from './style.module.scss';

type OwnProps = {
	modal?: boolean;
	cartProduct: CartProduct,
	price: Price,
	className: string,
	onUpdateProductCount: (id: string, oldCount: number, value: number) => void
};

class CartProductCard extends Component<OwnProps> {

	onUpdateProductCount = (value: number): void => {
		const { count, id } = this.props.cartProduct;
		this.props.onUpdateProductCount(id, count, value);
	};

	render(): JSX.Element {
		const { 
			modal, 
			cartProduct, 
			price: priceFromCart, 
			className } = this.props;
		const { count, selectedAttr, product } = cartProduct;
		const { name, gallery, attributes, brand } = product;

		const price: string = (
			priceFromCart.currency.symbol + priceFromCart.amount);

		return (
			<div 
				className={cn(
					styles.cartProductCard, 
					className, 
					{ [styles['modal']]: modal }
					)
				}
			>

				<div className={styles.productDetails}>
					<PriceFrame 
						bold 
						className={styles.price} 
						price={price} 
						size={modal ? 'small' : 'large'} 
					/>
					<NameFrame 
						className={styles.name} 
						variant={modal ? 'small' : 'big'} 
						name={name} 
						brand={brand} 
					/>
					{
						selectedAttr 
						&& attributes 
						&& attributes.length > 0 
						&& attributes.map(attr => <AttributeFrame
							key={attr.id}
							disabled
							modal={modal}
							attributes={attr}
							initialAttr={selectedAttr[attr.id]}
						/>
						)
					}
				</div>

				<div className={styles.countControl}>
					<Button 
						className={styles.countBtn} 
						onClick={() => this.onUpdateProductCount(1)} 
						variant='transparent'
					>
						<Inc className={styles.btnCountIcon} />
					</Button>
					<div className={styles.count}>{count}</div>
					<Button 
						className={styles.countBtn} 
						onClick={() => this.onUpdateProductCount(-1)} 
						variant='transparent'
					>
						<Dec className={styles.btnCountIcon} />
					</Button>
				</div>

				<div className={styles.imgContainer}>
					<Carousel modal={modal} gallery={gallery} name={name} />
				</div>

			</div >
		);
	}
}
export default CartProductCard;
