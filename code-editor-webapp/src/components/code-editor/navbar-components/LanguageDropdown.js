import React from 'react'
import Select from "react-select";
import { LANGUAGES } from '../../utils/languages';

export default function LangugeDropdown({ language, setLanguage }) {
	return (
		<Select
			placeholder={language.label}
			options={LANGUAGES}
			value={language.label}
			className="w-full"
			onChange={(language) => {
				setLanguage((prev) => ({...prev, ...language}));
			}}
		/>
	)
}
