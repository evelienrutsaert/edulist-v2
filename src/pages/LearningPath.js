import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CHECKLIST } from "../graphql/queries";
import Loader from "../components/Loader";
import LearningPathItemRow from "../components/learningpath/LearningPathSectionRow";
import BackButton from "../components/BackButton";
import Kuddos from "../components/Kuddos";
import LearningPathSection from "../components/learningpath/LearningPathSection";
import Sidebar from "../components/Sidebar";
import { useYouTube } from "../hooks/useYouTube";
import Asset from "../views/Asset";
import MdDoc from "../views/MdDoc";
import LinkType from "../views/LinkType";
import Excercise from "../views/Exercise";
import YouTube from "../views/YouTube";
import Slide from "../views/Slide";

export default function LearningPath() {
	const { learningPathSlug } = useParams();
	const { loading, error, data } = useQuery(CHECKLIST, {
		variables: { checklistSlug: learningPathSlug },
	});

	const [timeForKuddos, setTimeForKuddos] = useState(false);
	useEffect(() => {
		// setTimeout(() => {
		// 	setTimeForKuddos(!timeForKuddos);
		// 	setTimeout(() => {
		// 		setTimeForKuddos(false);
		// 	}, 5000);
		// }, 5000);
	}, [timeForKuddos]);

	const [openModal, setOpenModal] = useState("");
	const [checkList, setChecklist] = useState([]);

	const { fetchYoutubeTitle } = useYouTube();
	useEffect(() => {
		const setAllItems = () => {
			data?.checklist.checklistSections.map(async (secion) => {
				let allItems = [];
				let items = [];
				await Promise.all(
					secion.checklistItems.map(async (item, i) => {
						let currentItem = {};
						switch (item.type) {
							case "slides":
								currentItem = {
									type: "slide",
									id: item.slide.id,
									viewType: "modal",
									title: item.description,
									path: "",
									videoId: "",
									inputProps: {
										openModal: openModal,
										setOpenModal: setOpenModal,
										id: item.slide.id,
									},
									component: Slide,
								};
								break;
							case "youtube":
								// Fetch youtube Information based on Youtube Video ID
								const youtubeTitle = await fetchYoutubeTitle(
									item.youTube.videoId
								);

								currentItem = {
									type: "youTube",
									id: item.youTube.id,
									viewType: "modal",
									title: youtubeTitle,
									path: "",
									videoId: item.youTube.videoId,
									component: <YouTube />,
									inputProps: {},
									component: YouTube,
								};
								break;
							case "excercise":
								currentItem = {
									type: "excercise",
									id: item.exercise.id,
									viewType: "sidebar",
									title: item.description,
									path: "",
									videoId: "",
									component: <Excercise id={item.exercise.id} />,
								};
								break;
							case "github":
								currentItem = {
									type: "github",
									id: item.github.id,
									viewType: "link",
									title: item.description,
									path: item.url,
									videoId: "",
									inputProps: {
										path: item.url,
									},
									component: LinkType,
								};
								break;
							case "link":
								currentItem = {
									type: "link",
									id: "",
									viewType: "link",
									title: item.description,
									path: item.url,
									videoId: "",
									inputProps: {
										path: item.url,
									},
									component: LinkType,
								};
								break;
							case "mddoc":
								currentItem = {
									type: "mdDoc",
									id: item.mdDoc.id,
									viewType: "sidebar",
									title: item.description,
									path: "",
									videoId: "",
									component: <MdDoc id={item.mdDoc.id} />,
								};
								break;
							case "asset":
								currentItem = {
									type: "asset",
									id: item.asset.id,
									viewType: "modal",
									title: item.description,
									path: "",
									videoId: "",
									component: <Asset id={item.asset.id} />,
								};
								break;
							default:
								break;
						}
						items = [...items, { ...currentItem }];
					})
				);
				allItems = { checklists: [...items] };
				setChecklist((prev) => [...prev, { ...allItems }]);
			});
		};
		setAllItems();
	}, [data]);

	if (loading) return <Loader />;
	if (error || !data) return null;

	return (
		<div>
			<Sidebar />
			{timeForKuddos && <Kuddos />}

			{checkList &&
				checkList.map((learningPathSection, i) => {
					return (
						<LearningPathSection
							learningPathSection={learningPathSection}
							key={`section-${i}`}
						/>
					);
				})}
			<BackButton backWord="Module" />
		</div>
	);
}
