import { useQuery } from "@apollo/client";
import React from "react";
import { COURSES } from "../graphql/queries";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import defaultImage from "../images/default.jpg";
import { div } from "@tensorflow/tfjs";

export default function CoursesView() {
	const { loading, error, data, client } = useQuery(COURSES);

	if (loading) return <Loader />;
	if (error || !data) return null;
	const { courses } = data;

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
			{courses.map((course) => (
				<Link
					key={course.id}
					className="md:m-2 flex flex-col items-center bg-white dark:bg-gray-800 border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
				>
					<img
						className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-40 md:rounded-none md:rounded-l-lg"
						src={course.image ? course.image : defaultImage}
						alt="Course Image"
					/>
					<div className="flex flex-col justify-between p-4 leading-normal">
						<h2 className="mb-2 text-xl lg:text-lg font-bold tracking-tight text-gray-900 dark:text-white">
							{" "}
							{course.title}
						</h2>
					</div>
				</Link>
			))}
		</div>
	);
}
