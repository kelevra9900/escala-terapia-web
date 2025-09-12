import classNames from 'classnames';
import {twMerge} from 'tailwind-merge';

type PageHeadingProps = {
	title: string;
	subtitle?: string;
	className?: string;
};

const PageHeading = ({title,subtitle,className,...props}: PageHeadingProps) => {
	return (
		<div className={twMerge(classNames('mb-4',className))} {...props}>
			<h2
				className="relative text-lg font-semibold text-heading before:absolute before:-top-0.5 before:h-8 before:w-1 before:rounded-tr-md before:rounded-br-md before:bg-current ltr:before:-left-8 rtl:before:-right-8"
			>
				{title}
			</h2>
			{subtitle && (
				<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
					{subtitle}
				</p>
			)}
		</div>
	);
};

export default PageHeading;
