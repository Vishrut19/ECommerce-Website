import React,{ Component } from 'react';

import Button from '../../atoms/button/button';
import AttributeFrame from '../../molecules/attribute-frame/attribute-frame';
import PriceFrame from '../../molecules/price-frame/price-frame';
import NameFrame from '../../molecules/name-frame/name-frame';
import ProductImg from '../../atoms/product-img/product-img';

import { 
	Currency, 
	AttributeSet, 
	Product, 
	SelectedAttr } from '../../../types/data.types';

import styles from './style.module.scss';
import { createPriceRecord } from '../../../helpers/helpers';

type OwnProps = {
	product: Product;
	currency: Currency;
	cleanDescriprion: string;
	activeImg: string;
	onAddToCart: () => void;
	onSelectAttr: (attr: SelectedAttr) => void;
	onChangeImg: (activeImg: string) => void;
};

class ProductDPView extends Component<OwnProps> {
	ref: React.RefObject<HTMLDivElement> = 
		React.createRef<HTMLDivElement>();

	componentDidMount = (): void => {
		if (this.props.product) {
			const { gallery } = this.props.product;
			this.onChangeImg(gallery[0]);
		}
	};

	onChangeImg = (activeImg: string): void => {
		this.props.onChangeImg(activeImg);
	};

	render() {
		const { 
			product, 
			currency, 
			activeImg, 
			cleanDescriprion, 
			onSelectAttr } = this.props;
		const { name, inStock, gallery, attributes, prices, brand } = product;
		let price = 'No price';
		let gallerySet: JSX.Element[] = [];
		let attributesSet: JSX.Element[] = [];
		if (prices && currency) {
			price = createPriceRecord(prices, currency);
		}

		if (attributes && attributes.length > 0) {
			attributesSet = attributes.map((attr: AttributeSet) => {
				return (
					<AttributeFrame 
						key={attr.id} 
						onSelectAttr={onSelectAttr} 
						attributes={attr} 
					/>
				);
			});
		}

		if (gallery) {
			gallerySet = gallery.map((el: string, i: number): JSX.Element => {
				return (
					<button 
						key={i} 
						className={styles.galleryItem} 
						onClick={() => this.onChangeImg(el)} 
					>
						<ProductImg src={el} alt={name} />
					</button>
				);
			});
		}
		if (this.ref.current)	this.ref.current.innerHTML=cleanDescriprion;
		
		return (
			<div className={styles.containerPDP}>
				<div className={styles.gallery}>
					{gallerySet}
				</div>
				<div className={styles.productDetailCard} >
					{gallery && (
						<figure className={styles.productImg}>
							<img src={activeImg} alt={name} />
						</figure>
					)}
					<div className={styles.productDetails}>
						<NameFrame 
							className={styles.name} 
							variant='big' name={name} 
							brand={brand} 
						/>
						{attributesSet}
						<PriceFrame 
							showLabel 
							bold 
							className={styles.price} price={price} 
						/>
						<Button 
							className={styles.addToCartBtn} 
							autoFocus 
							disabled={!inStock} 
							onClick={this.props.onAddToCart}
						>
							ADD TO CART
						</Button>
						<div 
							ref={this.ref} 
							className={styles.description} 
						>
						</div>
					</div>
				</div>
			</div >
		);
	}
}

export default ProductDPView;

