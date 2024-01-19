import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import parseMD from "parse-md";
import { MDDOC } from "../graphql/queries";
import Sidebar from "../components/Sidebar";
import MarkdownViewer from "../components/MarkdownViewer";

export default function MdDoc({ mdDocId, openModal, setOpenModal }) {
	const { loading, error, data } = useQuery(MDDOC, {
		variables: { id: mdDocId },
	});
	const [mdData, setMdData] = useState("");
	const [mdMetaData, setMdMetaData] = useState({});
	useEffect(() => {
		if (data) {
			fetch(data.mdDoc.mdRawUrl)
				.then((res) => res.text())
				.then((text) => {
					const { metadata, content } = parseMD(text);
					setMdData(content);
					setMdMetaData(metadata);
				});
		}
	}, [data]);

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
			{data && mdMetaData && (
				<Sidebar
					isOpen={openModal}
					setIsOpen={setOpenModal}
					metadata={mdMetaData}
				>
					<MarkdownViewer mdData={mdData} />
				</Sidebar>
			)}
		</>
	);
}
