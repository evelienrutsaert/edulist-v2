import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CHECKLIST } from "../graphql/queries";
import Loader from "../components/Loader";
import LearningPathItemRow from "../components/learningpath/LearningPathSectionRow";
import BackButton from "../components/BackButton";
import Kuddos from "../components/Kuddos";
import LearningPathSection from "../components/learningpath/LearningPathSection";

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

	if (loading) return <Loader />;
	if (error || !data) return null;
	// if (data) console.log(data);

	return (
		<div>
			{timeForKuddos && <Kuddos />}
			{data?.checklist.checklistSections.map((learningPathSection, i) => {
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
