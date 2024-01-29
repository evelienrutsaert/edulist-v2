import React from "react";
import { GET_ASSET } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import ModalPopUp from "../ModalPopUp";

export default function AssetViewer({ assetId, openModal, setOpenModal }) {
	const { loading, error, data } = useQuery(GET_ASSET, {
		variables: { id: assetId },
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
