import React, { useEffect, useState } from "react";
import { allItemTypes } from "../../data/item-types";
import Slide from "../../views/Slide";
import Asset from "../../views/Asset";
import LinkType from "../../views/LinkType";
import MdDoc from "../../views/MdDoc";
import Excercise from "../../views/Exercise";
import YouTube from "../../views/YouTube";

export default function LearningPathSectionRow({ learningPathItem }) {
	// console.log(learningPathItem);
	const { component: Component } = learningPathItem;
	const [openModal, setOpenModal] = useState("");
	return (
		<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
			<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
				{learningPathItem && learningPathItem.title}
				<button
					onClick={
						learningPathItem.viewType === "modal"
							? () => setOpenModal("default")
							: undefined
					}
					className={`ml-8 py-1 px-2 rounded-full text-xs cursor-auto ${
						learningPathItem.bgColor
					} ${learningPathItem.viewType === "modal" ? "cursor-pointer" : ""}`}
				>
					{learningPathItem.type}
				</button>
			</td>

			<td className="px-6 py-4 text-right">
				<Component
					{...learningPathItem.inputProps}
					openModal={openModal}
					setOpenModal={setOpenModal}
				/>
			</td>
		</tr>
	);
}
