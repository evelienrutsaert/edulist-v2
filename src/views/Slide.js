import React, { useEffect, useState } from "react";
import ModalPopUp from "../components/ModalPopUp";
import { useQuery } from "@apollo/client";
import { SLIDE } from "../graphql/queries";

export default function Slide({ id, openModal, setOpenModal }) {
	const { loading, error, data } = useQuery(SLIDE, {
		variables: { id: id },
	});
	const [src, setSrc] = useState("");

	useEffect(() => {
		if (data) {
			if (data.slide.slideX == 0 && data.slide.slideY == 0) {
				setSrc(`${data.slide.slideUrl}`);
			} else {
				setSrc(
					`${data.slide.slideUrl}#/${data.slide.slideX}/${data.slide.slideY}`
				);
			}
		}
	}, [data]);
	return (
		<>
			{loading && <p>Loading data ....</p>}
			{error && <p>Error loading data ....</p>}
			{data && (
				<ModalPopUp
					title={data.slide.title}
					src={src}
					openModal={openModal}
					setOpenModal={setOpenModal}
				/>
			)}
		</>
	);
}
