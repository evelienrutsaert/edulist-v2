import React from "react";
import ThemeSwitcher from "../components/ThemeSwitcher";

export default function NavBar() {
	return (
		<nav className="bg-white border-gray-200 dark:bg-gray-900">
			<div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
				<div className="flex items-center">
					{/* <Search topic="course" /> */}
				</div>
				<div className="flex items-center">
					<ThemeSwitcher className="justify-self-end" />
				</div>
			</div>
		</nav>
	);
}
