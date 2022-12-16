import { MouseEvent, Component, ReactNode } from 'react';

import cn from 'classnames';

import styles from './style.module.scss';
import { SyntheticEvent } from 'react';

type ButtonTypeE = 'green' | 'transparent' | 'black';

type OwnProps = {
	children?: ReactNode | string;
	variant?: ButtonTypeE;
	className?: string;
	disabled?: boolean;
	autoFocus?: boolean;
	tabIndex?: number;
	onBlur?: (e: SyntheticEvent<HTMLButtonElement>) => void;
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
	onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
};

class Button extends Component<OwnProps> {

	onKeyDownE = (e: React.KeyboardEvent<HTMLButtonElement>) => {
		if (!(e.key === 'Escape')) { e.stopPropagation(); }
		if (this.props.onKeyDown) this.props.onKeyDown(e);
	};

	render(): JSX.Element {
		const {
			children,
			variant = 'green',
			className,
			disabled,
			autoFocus,
			tabIndex,
			onBlur,
			onClick,
		} = this.props;

		return (
			<button
				disabled={disabled}
				className={cn(
					styles.btn,
					className,
					{
						[styles.dissabledSt]: disabled,
						[styles[variant]]: variant,
					})
				}
				tabIndex={tabIndex}
				autoFocus={autoFocus}
				onClick={onClick}
				onBlur={onBlur}
				onKeyDown={(e) => { this.onKeyDownE(e); }}
			>
				{children}
			</button>
		);
	}
}
export default Button;
