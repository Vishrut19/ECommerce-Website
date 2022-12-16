import React, { Component } from 'react';
import { ReactComponent as AddCartLogo } 
  from '../../../icons/circle-cart-icon.svg';

import Button from '../button/button';

type OwnProps = {
	className: string;
	disabled: boolean;
	onAddCartClick: () => void;
};

class CartAddButton extends Component<OwnProps> {

	onAddCartClick = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	): void => {
			e.stopPropagation();
			this.props.onAddCartClick();
		};

	render(): JSX.Element {
		const { className, disabled } = this.props;
		return (
			<Button 
				onClick={(e) => this.onAddCartClick(e)} 
				disabled={disabled} 
				className={className}
			>
				<AddCartLogo />
			</Button>
		);
	}
}
export default CartAddButton;
