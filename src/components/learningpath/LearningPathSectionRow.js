import React, { useEffect, useState } from "react";
import { allItemTypes } from "../../data/item-types";
import Slide from "../../views/Slide";
import Asset from "../../views/Asset";
import LinkType from "../../views/LinkType";
import MdDoc from "../../views/MdDoc";
import Excercise from "../../views/Exercise";
import YouTube from "../../views/YouTube";

export default function LearningPathSectionRow({ learningPathItem }) {
	const [itemType, setItemType] = useState({
		slug: "default",
		title: "no title",
		colorClass: "black-500",
	});
	const [itemTitle, setItemTitle] = useState("");
	const [openModal, setOpenModal] = useState("");
	const YOUTUBE_API = process.env.REACT_APP_YOUTUBE_KEY;

	// console.log(allItemTypes);
	useEffect(() => {
		if (learningPathItem.type === "youtube") {
			fetch(
				"https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" +
					learningPathItem.youTube.videoId +
					"&key=" +
					YOUTUBE_API
			)
				.then((data) => {
					return data.json();
				})
				.then((data) => {
					setItemTitle(data.items[0].snippet.title);
				});
		}

		const filteredType = allItemTypes.filter((type) => {
			return type.slug === learningPathItem.type;
		});
		// console.log(filteredType);
		if (filteredType.length !== 0) setItemType(() => filteredType[0]);
	}, [learningPathItem.type]);

	return (
		<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
			<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
				{itemTitle ? itemTitle : learningPathItem.description}
				<button
					onClick={itemType.modal ? () => setOpenModal("default") : undefined}
					className={`ml-8 py-1 px-2 rounded-full text-xs cursor-auto ${
						itemType.bgColor
					} ${itemType.modal ? "cursor-pointer" : ""}`}
				>
					{itemType.title}
				</button>
			</td>

			<td className="px-6 py-4 text-right">
				{(() => {
					switch (itemType.type) {
						case "asset":
							return (
								<Asset
									assetId={learningPathItem.asset.id}
									openModal={openModal}
									setOpenModal={setOpenModal}
								/>
							);
						case "slide":
							return (
								<Slide
									slideId={learningPathItem.slide.id}
									openModal={openModal}
									setOpenModal={setOpenModal}
								/>
							);
						case "link":
							return (
								<LinkType
									title={learningPathItem.description}
									path={learningPathItem.url}
									openModal={openModal}
									setOpenModal={setOpenModal}
								/>
							);
						case "mdDoc":
							return (
								<MdDoc
									mdDocId={learningPathItem.mdDoc.id}
									openModal={openModal}
									setOpenModal={setOpenModal}
								/>
							);
						case "excercise":
							return (
								<Excercise
									exerciseId={learningPathItem.exercise.id}
									openModal={openModal}
									setOpenModal={setOpenModal}
								/>
							);
						case "youTube":
							return (
								<YouTube
									youtubeId={learningPathItem.youTube.id}
									videoId={learningPathItem.youTube.videoId}
									openModal={openModal}
									setOpenModal={setOpenModal}
									youTubeTitle={itemTitle}
								/>
							);
						default:
							return null;
					}
				})()}
			</td>
		</tr>
	);
}
