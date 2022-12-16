import React, { Component } from 'react';
import cn from 'classnames';
import styles from './style.module.scss';

type OwnProps = {
	className?: string,
	title?: string,
	message: string,
	active?: boolean
	onCloseModal: () => void,
};

class Modalka extends Component<OwnProps> {
	refButtons: React.RefObject<HTMLButtonElement> 
		= React.createRef<HTMLButtonElement>();

	componentDidMount(): void {
		this.refButtons.current?.focus();
	}

	closeModal = (): void => {
		this.props.onCloseModal();
	};

	onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		e.stopPropagation();
		if (e.key === 'Escape') {
			this.closeModal();
		}
	};

	lostFocus = () => {
		this.refButtons.current?.focus();
	};

	render(): JSX.Element {
		const { className, title, active, message } = this.props;

		return (
			<div
				className={cn(
					styles.modalContainer, 
					className, 
					{ [styles.active]: active }
				)}
				onClick={this.closeModal}
				onKeyDown={this.onKeyDown}>
				<div 
					className={styles.content} 
					onKeyDown={(e) => { this.onKeyDown(e); }}
				>
					<div>{title}</div>
					<div>{message}</div>
					<button 
						className={styles.btn} 
						ref={this.refButtons} 
						onBlur={this.lostFocus} 
						onClick={this.closeModal}
					>
						ok
					</button>
				</div>
			</div >
		);
	}
}
export default Modalka;
