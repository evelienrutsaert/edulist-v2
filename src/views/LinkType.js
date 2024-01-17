import React from "react";
import { Link } from "react-router-dom";

export default function LinkType({ path, title, openModal, setOpenModal }) {
	return (
		<>
			{path && (
				<Link to={path} target="_blank">
					{title}
				</Link>
			)}
		</>
	);
}
