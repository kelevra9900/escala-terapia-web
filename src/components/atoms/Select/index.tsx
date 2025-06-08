/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ReactSelect,{Props} from 'react-select';
import {selectStyles} from './select.styles';

export type Ref = any;

// Extend the props of ReactSelect to include any additional props you want to pass
export interface SelectProps extends Props {
	label?: string; // Optional label prop
}

export const Select = React.forwardRef<Ref,SelectProps>((props,ref) => {
	return (
		<>
			{props.label && (
				<label className="block mb-2 text-sm font-medium text-gray-700">
					{props.label}
				</label>
			)}
			<ReactSelect
				ref={ref}
				styles={selectStyles}
				{...props}
			/>
		</>
	);
});

Select.displayName = 'Select';

export default Select;
