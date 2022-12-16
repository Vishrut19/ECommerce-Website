import { Component, ReactNode } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import Logo from '../../atoms/logo/logo';
import ActionMenu from '../../molecules/action-menu/action-menu';
import CategoryMenu from '../../molecules/category-menu/category-menu';
import Modalka from '../../molecules/modalka/modalka';
import Cart from '../../pages/cart/cart';

import { RootState } from '../../../store';
import { 
	statusSetCartShow, 
	statusSetCurrencyIsShow, 
	statusSetCartView, 
	statusOnCloseModal, 
	statusOnShowModal,
	statusSetCartPageShow
} from '../../../store/statusSlice';

import styles from './style.module.scss';
import ErrorBoundary from '../../error-boundary/error-boundary';
import CurrencyModal from '../../molecules/currency-modal/currency-modal';


const mapState = (state: RootState) => ({
	currencyIsShow: state.status.currencyIsShow,
	cartIsShow: state.status.cartIsShow,
	cartPageIsShow: state.status.cartPageIsShow,
	cartIsModal: state.status.cartIsModal,
	modalIsShow: state.status.modalIsShow,
	modalContent: state.status.modalContent
});

const connector = connect(
	mapState, 
	{ 
		statusSetCurrencyIsShow, 
		statusSetCartShow, 
		statusSetCartView, 
		statusOnCloseModal, 
		statusOnShowModal,
		statusSetCartPageShow 
	});

type PropsFromRedux = ConnectedProps<typeof connector>;
type OwnProps = {
	children?: ReactNode;
};
type Props = PropsFromRedux & OwnProps;

class PageWrapper extends Component<Props, RootState> {
	closeModal = (): void => {
		if (this.props.currencyIsShow || this.props.cartIsShow) {
			this.props.statusSetCurrencyIsShow(false);
			this.props.statusSetCartShow(false);
			this.props.statusSetCartView(true);
		}
	};

	closeCart = (): void => {
		if (this.props.cartPageIsShow){
			this.props.statusSetCartPageShow(false);
		}
	};

	onKeyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Escape') this.closeModal();
	};

	render(): JSX.Element {
		const { 
			cartIsShow, 
			currencyIsShow, 
			cartIsModal, 
			modalIsShow, 
			modalContent,
			cartPageIsShow } = this.props;
		return (
			<ErrorBoundary>
				<div 
					className={styles.container} 
					onClick={() => this.closeModal()} 
					onKeyDown={(e) => { this.onKeyDownHandler(e);}}
				>
					<header className={styles.header}>
						<div className={styles.content}>
							<CategoryMenu closeCart ={this.closeCart} />
							<Logo />
							<ActionMenu />
							{currencyIsShow && <CurrencyModal />}
						</div>
					</header>

					{cartIsShow && cartIsModal && <Cart modal />}

					<div className={styles.childContainer}>
						<div className={styles.child}>
							{(cartPageIsShow) 
								? <Cart /> 
								: this.props.children
							}
						</div>
					</div>
					{modalIsShow && <Modalka
						active={modalIsShow}
						title={modalContent.title}
						message={modalContent.message}
						onCloseModal={this.props.statusOnCloseModal}
					/>
					}
				</div>
			</ErrorBoundary>
		);
	}
}
export default connector(PageWrapper);
