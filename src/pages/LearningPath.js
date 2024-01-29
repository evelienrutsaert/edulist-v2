import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CHECKLIST } from "../graphql/queries";
import Loader from "../components/Loader";
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
									bgColor: "bg-blue-500",
									inputProps: {
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
									bgColor: "bg-red-500",
									component: <YouTube />,
									inputProps: {
										youtubeId: item.youTube.id,
										videoId: item.youTube.videoId,
										youTubeTitle: youtubeTitle,
									},
									component: YouTube,
								};
								break;
							case "excercise":
								currentItem = {
									type: "excercise",
									id: item.exercise.id,
									viewType: "sidebar",
									title: item.description,
									bgColor: "bg-cyan-500",
									inputProps: {
										id: item.exercise.id,
									},
									component: Excercise,
								};
								break;
							case "github":
								currentItem = {
									type: "github",
									id: item.github.id,
									viewType: "link",
									title: item.description,
									bgColor: "bg-[#f8ae51]",
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
									bgColor: "bg-indigo-500",
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
									bgColor: "bg-pink-500",
									inputProps: {
										id: item.mdDoc.id,
									},
									component: MdDoc,
								};
								break;
							case "asset":
								currentItem = {
									type: "asset",
									id: item.asset.id,
									viewType: "modal",
									title: item.description,
									bgColor: "bg-rose-300",
									inputProps: {
										id: item.asset.id,
									},
									component: Asset,
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
