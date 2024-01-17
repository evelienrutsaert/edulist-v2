import React from "react";
import ModalPopUp from "../components/ModalPopUp";
import { useQuery } from "@apollo/client";
import { SLIDE } from "../graphql/queries";

export default function Slide({ slideId, openModal, setOpenModal }) {
	const { loading, error, data } = useQuery(SLIDE, {
		variables: { id: slideId },
	});

	return (
		<>
			{loading && <p>Loading data ....</p>}
			{error && <p>Error loading data ....</p>}
			{data && (
				<ModalPopUp
					title={data.slide.title}
					src={`${data.slide.slideUrl}#/${data.slide.slideX}/${data.slide.slideY}`}
					openModal={openModal}
					setOpenModal={setOpenModal}
				/>
			)}
		</>
	);
}
