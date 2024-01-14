import React from "react";
import { Link } from "react-router-dom";

export default function CourseSectionRow({ courseCheckList }) {
	// console.log(courseCheckList);
	return (
		<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
			<td
				scope="row"
				className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
			>
				<Link to={`${courseCheckList.slug}`}>{courseCheckList.title}</Link>
			</td>

			<td className="px-6 py-4 text-right">
				<Link
					to={`/${courseCheckList.slug}`}
					className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
				>
					View
				</Link>
			</td>
		</tr>
	);
}