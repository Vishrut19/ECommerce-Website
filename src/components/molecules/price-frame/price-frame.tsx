import { Component } from 'react';

import cn from 'classnames';

import styles from './style.module.scss';

interface OwnProps {
	className?: string;
	showLabel?: boolean;
	bold?: boolean;
	size?: "small" | 'middle' | 'large';
	disable?: boolean;
	price: string
}

class PriceFrame extends Component<OwnProps> {
	render(): JSX.Element {
		const { 
			className, 
			showLabel, 
			bold, 
			disable, 
			size = 'large' } = this.props;
		return (
			<div className={cn(styles.priceContainer, className)}>
				{showLabel && <p className={styles.label}>Price</p>}
				<p className={
					cn(
						styles.priceValue,
						{
							[styles[size]]: size,
							[styles['bold']]: bold,
							[styles['disable']]: disable
						}
					)
				}>
					{this.props.price}
				</p>
			</div >
		);
	}
}
export default PriceFrame;
