import React from "react";
import LearningPathSectionRow from "./LearningPathSectionRow";

export default function LearningPathSection({ learningPathSection }) {
	return (
		<table
			key={learningPathSection.id}
			className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-6"
		>
			<caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
				{learningPathSection.title}
				<p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400"></p>
			</caption>
			<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
				<tr>
					<th scope="col" className="px-6 py-3">
						Checklist
					</th>

					<th scope="col" className="px-6 py-3">
						<span className="sr-only">Edit</span>
					</th>
				</tr>
			</thead>
			<tbody>
				{learningPathSection &&
					learningPathSection.checklistItems.map((learningPathItem) => {
						return (
							<LearningPathSectionRow
								learningPathItem={learningPathItem}
								key={learningPathItem.id}
							/>
						);
					})}
			</tbody>
		</table>
	);
}
