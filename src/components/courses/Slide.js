import { useQuery } from "@apollo/client";
import React from "react";
import { SLIDE } from "../../graphql/queries";
import ModalPopUp from "../ModalPopUp";

export default function Slide({ slideId }) {
	const { loading, error, data } = useQuery(SLIDE, {
		variables: { id: slideId },
	});
	// if (data) console.log(data);

	return (
		<>
			{loading && <p>Loading data ....</p>}
			{error && <p>Error loading data ....</p>}
			{data && <ModalPopUp title={data.slide.title} slide={data.slide} />}
		</>
	);
}
