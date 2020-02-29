import React from 'react';
import './Select.scss';

const Select = props => {
	const id = `${props.label}-${Math.random()}`;
	return (
		<div className="Select">
			<label htmlFor={id}>{props.label}</label>
			<select id={id} value={props.value} onChange={props.onChange}>
				{props.options.map((option, index) => {
					return (
						<option key={option.value + index} value={option.value}>
							{option.text}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export default Select;
