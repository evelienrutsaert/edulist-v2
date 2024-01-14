import { createContext, useState } from "react";

export const ThemeContext = createContext();
export const ThemeArea = ({ children }) => {
	const [darkMode, setDarkMode] = useState(true);
	return (
		<ThemeContext.Provider value={[darkMode, setDarkMode]}>
			{children}
		</ThemeContext.Provider>
	);
};
