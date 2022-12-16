import { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import cn from 'classnames';

import { RootState } from '../../../store';
import { Currency } from './../../../types/data.types';
import { 
	statusSetCurrencyIsShow, 
	statusSetCurrency } from '../../../store/statusSlice';

import styles from './style.module.scss';
import React from 'react';

const mapState = (state: RootState) => ({
	currency: state.status.currency,
	currencies: state.data.currencies,
});
const connector = connect(
	mapState, 
	{ statusSetCurrencyIsShow, statusSetCurrency });

type PropsFromRedux = ConnectedProps<typeof connector>;
type OwnProps = { className?: string };
type Props = PropsFromRedux & OwnProps;
type State = {
	inFocus: number;
	amount: number;
};

class CurrencyModal extends Component<Props, State> {
	state = {
		inFocus: 0,
		amount: 0
	};

	refButtons: React.RefObject<HTMLButtonElement>[] = 
		this.props.currencies.map(() => React.createRef<HTMLButtonElement>());

	componentDidMount(): void {
		this.setState({ amount: this.props.currencies.length });
	}

	setCurrency = (curr: Currency): void => {
		localStorage.setItem('currency', JSON.stringify(curr)); 
		this.props.statusSetCurrency(curr);
		this.props.statusSetCurrencyIsShow(false);
	};

	closeModal = (): void => {
		this.props.statusSetCurrencyIsShow(false);
	};

	onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			this.setState(state => {
				let pos: number = state.inFocus + 1;
				if (pos === state.amount) pos = 0;
				return { inFocus: pos };
			});
		}
		if (e.key === 'ArrowUp') {
			e.preventDefault();
			this.setState(state => {
				let pos: number = state.inFocus - 1;
				if (pos < 0) pos = state.amount - 1;
				return { inFocus: pos };
			});
		}
		if (e.key === 'Escape' || e.key === 'Tab') this.closeModal();
	};

	render(): JSX.Element {
		this.refButtons[this.state.inFocus].current?.focus();
		const { className, currencies, currency } = this.props;
		let currencyItems: JSX.Element[] = [];
		if (currencies) {
			currencyItems = currencies.map((curr, i) => {
				return (
					<button
						key={curr.label}
						ref={this.refButtons[i]}
						className={cn(
							styles.item,
							{
								[styles.active]: curr.label === currency.label
							}
						)}
						onClick={() => this.setCurrency(curr)}
					>
						{`${curr.symbol} ${curr.label}`}
					</button>
				);
			});
		}

		return (
			<div 
				className={cn(styles.modalContainer, className)} 
				onKeyDown={(e) => this.onKeyDown(e)} 
				onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
					e.stopPropagation();}
				}
			>
				{currencyItems}
			</div >
		);
	}
}
export default connector(CurrencyModal);