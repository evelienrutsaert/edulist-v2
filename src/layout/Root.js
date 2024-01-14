import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import NavBar from "./NavBar";

export default function Root() {
	const [darkMode] = useContext(ThemeContext);
	useEffect(() => {
		darkMode
			? document.body.classList.add("dark")
			: document.body.classList.remove("dark");
	}, [darkMode]);
	return (
		<>
			<div className={darkMode ? "bg-slate-900 text-white min-h-screen" : null}>
				<div className="container mx-auto ">
					<NavBar />
					<main className="max-w-screen-xl  mx-auto">
						<Outlet />
					</main>
				</div>
			</div>
		</>
	);
}
