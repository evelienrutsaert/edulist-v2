import React, { useEffect, useState } from "react";
import Slide from "./Slide";
import { allItemTypes } from "../../data/item-types";

export default function LearningPathSectionRow({ learningPathItem }) {
	const [itemType, setItemType] = useState({
		slug: "default",
		title: "no title",
		colorClass: "black-500",
	});
	const [openModal, setOpenModal] = useState("");

	// console.log(allItemTypes);
	useEffect(() => {
		const filteredType = allItemTypes.filter((type) => {
			return type.slug === learningPathItem.type;
		});
		if (filteredType.length != 0) setItemType(() => filteredType[0]);
	}, []);

	return (
		<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
			<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
				{learningPathItem.description}
				<button
					onClick={
						learningPathItem.slide ? () => setOpenModal("default") : undefined
					}
					className={`ml-8 py-1 px-2 rounded-full text-xs cursor-auto ${
						itemType.bgColor
					} ${learningPathItem.slide ? "cursor-pointer" : ""}`}
				>
					{itemType.title}
				</button>
			</td>

			<td className="px-6 py-4 text-right">
				{learningPathItem.slide && (
					<Slide
						slideId={learningPathItem.slide.id}
						openModal={openModal}
						setOpenModal={setOpenModal}
					/>
				)}
			</td>
		</tr>
	);
}
