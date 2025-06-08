import RCPagination,{PaginationProps} from 'rc-pagination';
import 'rc-pagination/assets/index.css';

import {ArrowNext} from '@/components/atoms/Icons/arrow-next';
import {ArrowPrev} from '@/components/atoms/Icons/arrow-prev';


const Pagination: React.FC<PaginationProps> = (props) => {
	return (
		<RCPagination
			nextIcon={<ArrowNext />}
			prevIcon={<ArrowPrev />}
			{...props}
		/>
	);
};

export default Pagination;
