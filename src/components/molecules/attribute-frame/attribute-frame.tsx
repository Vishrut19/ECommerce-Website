import { Component } from 'react';

import cn from 'classnames';

import { Attribute, AttributeSet } from '../../../types/data.types';
import styles from './style.module.scss';

type OwnProps = {
	className?: string;
	modal?: boolean;
	attributes: AttributeSet;
	initialAttr?: Attribute;
	disabled?: boolean;
	onSelectAttr?: (selected: { [id: string]: Attribute }) => void
};

type OwnState = {
	selectedAttrValue: string;
	selectedAttrId: string;
};

class AttributeFrame extends Component<OwnProps, OwnState> {
	state = {
		selectedAttrValue: '',
		selectedAttrId: ''
	};

	componentDidMount = (): void => {
		if (this.props.attributes 
			&& Object.entries(this.props.attributes).length !== 0
			) {
				let initialAttr: Attribute;
				const attrId: string = this.props.attributes.id;
				this.setState({ selectedAttrId: attrId });
				this.props.initialAttr
					?
					initialAttr = this.props.initialAttr
					:
					initialAttr = this.props.attributes.items[0];
				this.setState({ selectedAttrValue: initialAttr.value });
		}
	};

	onSelect = (attrObj: { [id: string]: Attribute }): void => {
		this.setState({ 
			selectedAttrValue: attrObj[this.state.selectedAttrId].value 
		});
		if (this.props.onSelectAttr) this.props.onSelectAttr(attrObj);
	};

	render(): JSX.Element {
		const { className, modal, attributes, disabled } = this.props;
		const { selectedAttrValue } = this.state;
		let attrBtns: JSX.Element[] = [];

		if (attributes) {
			attrBtns = attributes.items.map((item) => {
				const stylesItem: { 
					backgroundColor: string, 
					border?: string 
				} = { 
						backgroundColor: 'none' 
					};
				if (attributes.id === 'Color') { 
					stylesItem.backgroundColor = item.value; 
				}
				if (item.value.substring(0, 2).toLowerCase() === '#f') { 
					stylesItem.border = '1px solid #ccc'; 
				} 
				return (
					<button
						key={item.id}
						disabled={disabled}
						className={cn(
							styles.btn, {
							[styles.selected]: selectedAttrValue === item.value,
						}
						)}
						onClick={() => { 
							this.onSelect({[this.state.selectedAttrId]: item});
						}}
						style={stylesItem}
					>
						{attributes.type === 'text' && item.value}
					</button>
				);
			});
		}
		return (
			<div className={
				cn(
					styles.container,
					className,
					{ [styles['modal']]: modal })
			}>
				<p className={styles.label}>{`${attributes.name}:`}</p>
				<div className={cn(
					styles.btnContainer, {
					[styles.swatchType]: attributes.type === 'swatch',
					[styles.textType]: attributes.type === 'text'
				}
				)}
				>
					{attrBtns}
				</div>
			</div >
		);
	}
}
export default AttributeFrame;
