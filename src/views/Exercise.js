import React from "react";
import { useQuery } from "@apollo/client";
import { EXERCISE } from "../graphql/queries";
import Markdown from "react-markdown";
import gfm from "remark-gfm";
import Sidebar from "../components/Sidebar";
import style from "./exercise.module.css";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

export default function Excercise({ exerciseId, openModal, setOpenModal }) {
	const { loading, error, data } = useQuery(EXERCISE, {
		variables: { id: exerciseId },
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
						{data.exercise.description}
					</Markdown>
				</Sidebar>
			)}
		</>
	);
}
