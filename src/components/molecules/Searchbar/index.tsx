import {CloseIcon} from '@/components/atoms/Icons/close-icon';
import {SearchIcon} from '@/components/atoms/Icons/search-icon';
import cn from 'classnames';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {twMerge} from 'tailwind-merge';

const classes = {
	root: 'ps-10 pe-12 w-full h-12 rounded-lg text-sm font-normal placeholder:text-gray-500 focus:outline-none focus:ring-0',
	normal:
		'bg-light border border-brand-beige text-body focus:border-brand-moss focus:bg-white',
	solid:
		'bg-brand-moss/10 border border-brand-moss text-brand-moss placeholder:text-brand-moss/70 focus:border-brand-moss focus:bg-white',
	outline:
		'border border-neutral-200 bg-white text-body focus:border-brand-moss',
	shadow: 'focus:shadow-md',
};


type SearchProps = {
	className?: string;
	shadow?: boolean;
	variant?: 'normal' | 'solid' | 'outline';
	inputClassName?: string;
	onSearch: (data: SearchValue) => void;
	placeholderText?: string;
};

type SearchValue = {
	searchText: string;
};

const Search: React.FC<SearchProps> = ({
	className,
	onSearch,
	variant = 'outline',
	shadow = false,
	inputClassName,
	placeholderText,
	...rest
}) => {
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: {errors},
	} = useForm<SearchValue>({
		defaultValues: {
			searchText: '',
		},
	});
	const searchText = watch('searchText');

	useEffect(() => {
		if (!searchText) {
			onSearch({searchText: ''});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[searchText]);

	const rootClassName = cn(
		classes.root,
		{
			[classes.normal]: variant === 'normal',
			[classes.solid]: variant === 'solid',
			[classes.outline]: variant === 'outline',
		},
		{
			[classes.shadow]: shadow,
		},
		inputClassName
	);

	function clear() {
		reset();
		onSearch({searchText: ''});
	}
	return (
		<form
			noValidate
			role="search"
			className={twMerge(cn('relative flex w-full items-center',className))}
			onSubmit={handleSubmit(onSearch)}
		>
			<label htmlFor="search" className="sr-only">
				{placeholderText ?? 'Search'}
			</label>
			<button className="absolute top-1/2 -translate-y-1/2 p-2 text-body outline-none start-1 focus:outline-none active:outline-none">
				<SearchIcon className="h-5 w-5" />
			</button>
			<input
				type="text"
				id="search"
				{...register('searchText')}
				className={twMerge(rootClassName)}
				placeholder={placeholderText ?? 'Search...'}
				aria-label="Search"
				autoComplete="off"
				{...rest}
			/>
			{errors.searchText && <p>{errors.searchText.message}</p>}
			{!!searchText && (
				<button
					type="button"
					onClick={clear}
					className="absolute top-1/2 -translate-y-1/2 p-2 text-body outline-none end-1 focus:outline-none active:outline-none"
				>
					<CloseIcon className="h-5 w-5" />
				</button>
			)}
		</form>
	);
};

export default Search;
