import { useQuery } from "@apollo/client";
import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { COURSE } from "../graphql/queries";
import CourseSectionRow from "../components/courses/CourseSectionRow";
import BackButton from "../components/BackButton";

export default function Course() {
	const { courseSlug } = useParams();
	const { loading, error, data } = useQuery(COURSE, {
		variables: { courseSlug },
	});

	// useEffect(() => {
	// 	let coursSections;
	// 	coursSections = data?.course.courseSections;
	// 	// console.log(coursSections);
	// }, [data]);
	if (loading) return <Loader />;
	if (error || !data) return null;
	// if (data) console.log(data);

	return (
		<div>
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
						{data && data.course.title}
						<p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
							List of all the modules of the course {data && data.course.title}
						</p>
					</caption>
					{data &&
						data.course.courseSections.map((section, i) => {
							return (
								<Fragment key={`section-${i}`}>
									<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
										<tr>
											<th scope="col" className="px-6 py-3">
												{section?.title}
											</th>

											<th scope="col" className="px-6 py-3">
												<span className="sr-only">Edit</span>
											</th>
										</tr>
									</thead>
									<tbody>
										{data &&
											data.course.courseSections[0].checklists.map(
												(courseCheckList, num) => {
													return (
														<CourseSectionRow
															key={`section-${i}-row-${num}`}
															courseCheckList={courseCheckList}
														/>
													);
													// console.log(courseCheckList);
												}
											)}
									</tbody>
								</Fragment>
							);
						})}
				</table>
			</div>

			<BackButton backWord="Cursus" />
		</div>
	);
}
