import React from "react";
import { useQuery } from "@apollo/client";
import { EXERCISE } from "../graphql/queries";
import Sidebar from "../components/Sidebar";
import MarkdownViewer from "../components/MarkdownViewer";

export default function Excercise({ id, openModal, setOpenModal }) {
	const { loading, error, data } = useQuery(EXERCISE, {
		variables: { id: id },
	});

	return (
		<>
			{loading && <p>Loading data ....</p>}
			{error && <p>Error loading data ....</p>}
			<button
				className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
				onClick={() => setOpenModal(true)}
			>
				View
			</button>
			{data && (
				<Sidebar isOpen={openModal} setIsOpen={setOpenModal}>
					<MarkdownViewer mdData={data.exercise.description} />
				</Sidebar>
			)}
		</>
	);
}
