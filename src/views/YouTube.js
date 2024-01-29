import React from "react";
import { YOUTUBE } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import ModalPopUp from "../components/ModalPopUp";

export default function YouTube({
	youtubeId,
	videoId,
	youTubeTitle,
	openModal,
	setOpenModal,
}) {
	const { loading, error, data } = useQuery(YOUTUBE, {
		variables: { id: youtubeId },
	});

	return (
		<>
			{loading && <p>Loading data ....</p>}
			{error && <p>Error loading data ....</p>}
			{data && (
				<ModalPopUp
					title={youTubeTitle}
					src={`https://www.youtube.com/embed/${videoId}`}
					openModal={openModal}
					setOpenModal={setOpenModal}
				/>
			)}
		</>
	);
}
