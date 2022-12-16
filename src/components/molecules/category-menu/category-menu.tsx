import React, { Component } from 'react';
import { withRouter, NavLink, RouteComponentProps } from "react-router-dom";
import { connect, ConnectedProps } from 'react-redux';

import { getCategorySet, setCurrentCategory } from '../../../store/dataSlice';
import { RootState } from '../../../store';

import styles from './style.module.scss';

const mapState = (state: RootState) => ({
	categories: state.data.categories,
	statusFetching: state.data.statusFetchingName,
	currentCategory: state.data.currentCategory
});
const connector = connect(mapState, { getCategorySet, setCurrentCategory });

type CategoryParam = { category: string };
type PropsFromRedux = ConnectedProps<typeof connector>;
type OwnPropsFromRedux = {closeCart:()=>void};
type Props = PropsFromRedux 
	& RouteComponentProps<CategoryParam> 
	& OwnPropsFromRedux;

class CategoryMenu extends Component<Props, RootState> {

	componentDidMount(): void {
		const category: string = this.props.match.params.category;
		this.props.setCurrentCategory(category);
	}

	onClickMenu=(
		e: React.MouseEvent<HTMLAnchorElement>, 
		link: string):void => {
		this.props.closeCart();
		this.changeMenu(e, link);
	};

	changeMenu = (
		e: React.MouseEvent<HTMLAnchorElement>, 
		link: string
	): void => {
		if (link !== this.props.currentCategory) {
			this.props.setCurrentCategory(link);
			this.props.getCategorySet(link);
		}
	};

	render(): JSX.Element {
		const { categories, statusFetching } = this.props;
		let menu: JSX.Element[] = [];
		if (statusFetching === 'idle') {
			menu = categories.map((el: string, i: number) => {
				const link: string = el.toLowerCase();
				return (
					<li key={i}>
						<NavLink 
							to={'/' + link} 
							activeClassName={styles.active} 
							className={styles.item} 
							onClick={
								(e: React.MouseEvent<HTMLAnchorElement>) => {
									this.onClickMenu(e, link);
								}
							}
						>
							{el}
						</NavLink >
					</li>
				);
			});
		}

		return (
			<nav className={styles.wrapper} >
				<ul>
					{statusFetching === 'loading' 
						&& <span> Loading...</span>}
					{statusFetching === 'error' 
						&& <span> Error loading...</span>}
					{menu}
				</ul>
			</nav >
		);
	}
}

export default connector(withRouter(CategoryMenu));
