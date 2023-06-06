/**
 * Enable website search.
 * @module SearchBox
 */

import React, { useState } from 'react';
import { HiSearch, HiX } from 'react-icons/hi';
import { website } from './helper';

export default function (props) {
	const { placeholder = '', filters = {}, handleSearch, live = true } = props;

	const style = { minWidth: '36px', height: '36px', ...props.style };
	const className = props.className;

	const search = website.localize({ en: 'Search', fr: 'Recherche' });

	const placeholderText = placeholder || search;

	const { searchText = '' } = filters;

	const [focused, setFocused] = useState(false);

	const [input, setInput] = useState(searchText);

	const focusClass = 'ring-2 ring-blue-400 border-transparent';

	const inputValue = live ? searchText : input;

	return (
		<div className={className} style={style}>
			<div
				className={`w-full h-full rounded-lg overflow-hidden bg-white relative border ${
					focused ? focusClass : 'border-gray-300 !shadow-sm'
				}`}
			>
				<input
					className={`w-full h-full pl-2.5 pr-8 border-0 shadow-none resize-none focus:ring-0 focus:outline-none`}
					placeholder={placeholderText}
					onFocus={() => {
						setFocused(true);
					}}
					onBlur={() => {
						setFocused(false);
					}}
					onChange={(e) => {
						if (live) handleSearch(e.target.value);
						else {
							setInput(e.target.value);

							if (e.target.value === '') handleSearch('');
						}
					}}
					onKeyDown={(e) => {
						if (e.key === 'Enter' && !live) {
							handleSearch(input);
						}
					}}
					value={inputValue}
				/>
				<div
					className={`w-9 h-full p-2 flex items-center justify-center absolute inset-y-0 right-0 ${
						inputValue ? '' : 'pointer-events-none'
					}`}
				>
					{inputValue ? (
						<button
							className="w-full h-full text-gray-300 hover:text-gray-700 focus:ring-0 focus:outline-none"
							onClick={() => {
								handleSearch('');
							}}
						>
							<HiX className="w-full h-full" />
						</button>
					) : (
						<HiSearch className="w-full h-full text-gray-500"></HiSearch>
					)}
				</div>
			</div>
		</div>
	);
}
