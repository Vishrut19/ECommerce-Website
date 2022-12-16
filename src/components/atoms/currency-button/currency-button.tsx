import React from 'react';
import { Component } from 'react';
import { ReactComponent as Arrow } from '../../../icons/arrow-down.svg';

import { Currency } from './../../../types/data.types';

import styles from './style.module.scss';

interface OwmProps {
	onCurrencyClick: () => void;
	currency: Currency;
	currencyIsShow?: boolean;
}

class CurrensyButton extends Component<OwmProps> {
	ref: React.RefObject<HTMLButtonElement> = 
		React.createRef<HTMLButtonElement>();

	onCurrencyClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation();
		this.props.onCurrencyClick();
	};

	render(): JSX.Element {
		const{ currencyIsShow, currency } = this.props;
		return (
			<button 
				ref={this.ref} 
				onClick={(e) => this.onCurrencyClick(e)} 
				className={styles.currencyButton}
			>
				<span>{currency.symbol}</span>
				<Arrow 
				className={currencyIsShow ? styles.currencyIsShow : styles.svg} 
				/>
			</button>
		);
	}
}
export default CurrensyButton;
