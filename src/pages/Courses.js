import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { COURSES } from "../graphql/queries";
import Loader from "../components/Loader";

import CourseItem from "../components/courses/CourseItem";
import Search from "../components/Search";
import ModalPopUp from "../components/ModalPopUp";

export default function Courses() {
	const { loading, error, data } = useQuery(COURSES);
	const [filterdData, setFilterData] = useState([]);
	const [filter, setFilter] = useState("");

	useEffect(() => {
		setFilterData(data?.courses);
		if (filter && data) {
			setFilterData(
				data.courses.filter((course) => {
					return course.title.toLowerCase().includes(filter.toLowerCase());
				})
			);
		}
	}, [filter, data]);
	if (loading) return <Loader />;
	if (error || !data) return null;

	return (
		<>
			<Search topic="course" setFilter={setFilter} filter={filter} />
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
				{filterdData && filterdData.length < 1 ? (
					<div>No courses founds, search again</div>
				) : null}
				{filterdData &&
					filterdData.map((course) => (
						<CourseItem course={course} key={course.id} />
					))}
			</div>
		</>
	);
}
