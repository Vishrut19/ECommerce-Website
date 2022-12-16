import { Component } from 'react';

import cn from 'classnames';

import styles from './style.module.scss';
import Button from '../../atoms/button/button';
import { ReactComponent as ArrowRight } from '../../../icons/arrow-right.svg';
import { ReactComponent as ArrowLeft } from '../../../icons/arrow-left.svg';


type OwnProps = {
	modal?: boolean;
	className?: string;
	gallery: string[];
	name: string;
};
type OwnState = {
	currentImg: number
};

class Carousel extends Component<OwnProps, OwnState> {
	state = {
		currentImg: 0
	};

	changeImg = (direction: 'right' | 'left') => {
		const lengthGallery: number = this.props.gallery.length;
		if (direction === 'right') {
			this.setState((state) => {
				let newImgIndex: number = state.currentImg + 1;
				if (newImgIndex === lengthGallery) newImgIndex = 0;
				return { currentImg: newImgIndex };
			});
		}
		if (direction === 'left') {
			this.setState((state) => {
				let newImgIndex: number = state.currentImg - 1;
				if (newImgIndex < 0) newImgIndex = lengthGallery - 1;
				return { currentImg: newImgIndex };
			});
		}
	};

	render(): JSX.Element {
		const {
			modal,
			className,
			gallery,
			name,
		} = this.props;

		return (
			<div
				className={cn(
					styles.carousel,
					className,
				)}
			>
				<figure className={styles.imgContainer}>
					<img src={gallery[this.state.currentImg]} alt={name} />
				</figure>
				{!modal && gallery.length > 1 &&
					<div className={styles.control}>
						<Button 
							className={styles.btn} 
							onClick={() => this.changeImg('left')} 
							variant='black' 
						>
							<ArrowLeft />
						</Button>
						<Button 
							className={styles.btn} 
							onClick={() => this.changeImg('right')} 
							variant='black' 
						>
							<ArrowRight />
						</Button>
					</div>
				}
			</div>
		);
	}
}
export default Carousel;
