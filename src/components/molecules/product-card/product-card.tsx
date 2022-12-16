import { Component } from 'react';
import { Link } from 'react-router-dom';

import ProductImg from '../../atoms/product-img/product-img';
import NameFrame from '../name-frame/name-frame';
import PriceFrame from '../price-frame/price-frame';
import CartAddButton from './../../atoms/cart-add-button/cart-add-button';

import { Product, Currency, SelectedAttr } from '../../../types/data.types';
import styles from './style.module.scss';
import { createPriceRecord } from '../../../helpers/helpers';

interface OwnProps {
	product: Product;
	currency: Currency
	category?: string;
	addToCart: (arg: { attr?: SelectedAttr; idProd: string; }) => void
}

class ProductCard extends Component<OwnProps> {

	onAddCartClick = (): void => {
		this.props.addToCart({ idProd: this.props.product.id });
	};

	render(): JSX.Element {
		const { category, product, currency } = this.props;
		const { 
			id, 
			name, 
			inStock, 
			gallery, 
			prices, 
			brand } = product;
		const srcImg: string = gallery[0];
		const price: string = createPriceRecord(prices, currency);
		return (
			<div className={styles.container}>
				{	inStock	&& <CartAddButton 
								className={styles.addCartBtn} 
								disabled={!inStock} 
								onAddCartClick={this.onAddCartClick} 
							/>
				}
				<Link to={`/${category}/${id}`} className={styles.link}>
					<div className={styles.cardContent}>
						<ProductImg 
							disable={!inStock} 
							src={srcImg} 
							alt={name} 
						/>
						<div className={styles.description}>
							<NameFrame 
								disable={!inStock} 
								variant='horizontal' 
								name={name} 
								brand={brand} 
							/>
							<PriceFrame 
								disable={!inStock} 
								size='small' 
								price={price} 
							/>
						</div>
					</div>
				</Link>
			</div>
		);
	}
}
export default ProductCard;
