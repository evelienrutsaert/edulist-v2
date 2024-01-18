import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Markdown from "react-markdown";
import gfm from "remark-gfm";
import parseMD from "parse-md";
import { MDDOC } from "../graphql/queries";
import Sidebar from "../components/Sidebar";
import style from "./exercise.module.css";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

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
					<Markdown
						rehypePlugins={[rehypeRaw]}
						remarkPlugins={[gfm]}
						skipHtml
						className={style.md}
						components={{
							code({ node, inline, className, children, ...props }) {
								const match = /language-(\w+)/.exec(className || "");

								return !inline && match ? (
									<SyntaxHighlighter
										style={dracula}
										PreTag="div"
										language={match[1]}
										{...props}
									>
										{String(children).replace(/\n$/, "")}
									</SyntaxHighlighter>
								) : (
									<code className={className} {...props}>
										{children}
									</code>
								);
							},
						}}
					>
						{mdData}
					</Markdown>
				</Sidebar>
			)}
		</>
	);
}
