import React from "react";
import ModalPopUp from "../components/ModalPopUp";
import { useQuery } from "@apollo/client";
import { GET_ASSET } from "../graphql/queries";

export default function Asset({ id, openModal, setOpenModal }) {
	const { loading, error, data } = useQuery(GET_ASSET, {
		variables: { id: id },
	});

	return (
		<>
			{loading && <p>Loading data ....</p>}
			{error && <p>Error loading data ....</p>}
			{data && (
				<ModalPopUp
					title={data.asset.title}
					src={data.asset.url}
					openModal={openModal}
					setOpenModal={setOpenModal}
				/>
			)}
		</>
	);
}
