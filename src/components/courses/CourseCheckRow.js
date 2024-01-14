import React from "react";
import Slide from "./Slide";

export default function CourseCheckRow({ courseCheckList }) {
	// console.log(courseCheckList);
	return (
		<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
			<td
				scope="row"
				className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
			>
				{courseCheckList.description}
				{courseCheckList.slide && (
					<button className="ml-8 py-1 px-2 bg-blue-500 rounded-full text-xs cursor-auto">
						Slides
					</button>
				)}
			</td>

			<td className="px-6 py-4 text-right">
				{courseCheckList.slide && <Slide slideId={courseCheckList.slide.id} />}
			</td>
		</tr>
	);
}
