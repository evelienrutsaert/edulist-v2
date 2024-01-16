import { useQuery } from "@apollo/client";
import React from "react";
import { SLIDE } from "../../graphql/queries";
import ModalPopUp from "../ModalPopUp";

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
					slide={data.slide}
					openModal={openModal}
					setOpenModal={setOpenModal}
				/>
			)}
		</>
	);
}
