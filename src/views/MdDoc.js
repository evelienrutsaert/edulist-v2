import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Markdown from "react-markdown";
import gfm from "remark-gfm";
import { MDDOC } from "../graphql/queries";
import Sidebar from "../components/Sidebar";
import parseMD from "parse-md";

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
					<Markdown remarkPlugins={[gfm]} skipHtml>
						{mdData}
					</Markdown>
				</Sidebar>
			)}
		</>
	);
}
