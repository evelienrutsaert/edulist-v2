import React from "react";
import { Link } from "react-router-dom";
import defaultImage from "../../images/default.jpg";

export default function CourseItem({ course }) {
	return (
		<Link
			to={`./courses/${course.slug}`}
			className="md:m-2 flex flex-col items-center bg-white dark:bg-gray-800 border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
		>
			<img
				className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-40 md:rounded-none md:rounded-l-lg"
				src={course.image ? course.image : defaultImage}
				alt="Course Image"
			/>
			<div className="flex flex-col justify-between p-4 leading-normal">
				<h2 className="mb-2 text-xl lg:text-lg font-bold tracking-tight text-gray-900 dark:text-white">
					{course.title}
				</h2>
			</div>
		</Link>
	);
}
