import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CHECKLIST } from "../graphql/queries";
import Loader from "../components/Loader";
import CourseCheckRow from "../components/courses/CourseCheckRow";
import BackButton from "../components/BackButton";
import Kuddos from "../components/Kuddos";

export default function CheckList() {
	const { courseSlug, checklistSlug } = useParams();
	const { loading, error, data } = useQuery(CHECKLIST, {
		variables: { checklistSlug },
	});
	const [timeForKuddos, setTimeForKuddos] = useState(false);
	useEffect(() => {
		setTimeout(() => {
			setTimeForKuddos(!timeForKuddos);
			setTimeout(() => {
				setTimeForKuddos(false);
			}, 5000);
		}, 5000);
	}, []);

	if (loading) return <Loader />;
	if (error || !data) return null;
	// if (data) console.log(data);

	return (
		<div>
			{timeForKuddos && <Kuddos />}
			{data?.checklist.checklistSections.map((checklistSection) => {
				return (
					<table
						key={checklistSection.id}
						className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-6"
					>
						<caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
							{checklistSection.title}
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
							{data &&
								checklistSection.checklistItems.map((check) => {
									return (
										<CourseCheckRow courseCheckList={check} key={check.id} />
									);
								})}
						</tbody>
					</table>
				);
			})}
			<BackButton backWord="Module" />
		</div>
	);
}
