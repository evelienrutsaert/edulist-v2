import { Modal } from "flowbite-react";
import React, { useState } from "react";

export default function ModalPopUp({ title, content, slide }) {
	const [openModal, setOpenModel] = useState("");
	return (
		<>
			<div
				onClick={() => setOpenModel("default")}
				color="gray"
				className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
			>
				View
			</div>
			<Modal
				show={openModal === "default"}
				onClose={() => setOpenModel(undefined)}
				className="min-h-screen"
			>
				<Modal.Header>{title}</Modal.Header>
				<Modal.Body className="min-h-[50vh]">
					{content && content}
					{slide && (
						<iframe
							// ref={iFrameRef}
							width="100%"
							// height="95%"
							title={slide.title}
							src={`${slide.slideUrl}#/${slide.slideX}/${slide.slideY}`}
							scrolling="no"
							frameBorder="0"
							allowFullScreen
							className="min-h-[50vh]"
						/>
					)}
				</Modal.Body>
			</Modal>
		</>
	);
}
