import { Modal } from "flowbite-react";
import React, { useState } from "react";

export default function ModalPopUp({
	title,
	content,
	src,
	openModal,
	setOpenModal,
}) {
	return (
		<>
			<div
				onClick={() => setOpenModal("default")}
				color="gray"
				className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
			>
				View
			</div>
			<Modal
				show={openModal === "default"}
				onClose={() => setOpenModal(undefined)}
				className="min-h-screen"
				size="5xl"
			>
				<Modal.Header>{title}</Modal.Header>
				<Modal.Body className="min-h-[80vh] ">
					{content && content}
					{src && (
						<iframe
							// ref={iFrameRef}
							width="100%"
							// height="95%"
							title={title}
							src={src}
							scrolling="no"
							frameBorder="0"
							allowFullScreen
							className="min-h-[80vh]"
						/>
					)}
				</Modal.Body>
			</Modal>
		</>
	);
}
