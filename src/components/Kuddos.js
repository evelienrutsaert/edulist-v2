import { Toast } from "flowbite-react";
import { HiFire } from "react-icons/hi";
import React from "react";

export default function Kuddos() {
	return (
		<>
			<Toast className="mb-9  outline outline-offset-2 outline-1 shadow-xl">
				<div className="inline-flex  h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
					<HiFire className="h-5 w-5" />
				</div>
				<div className="ml-3 text-sm font-normal">
					Goed bezig, you are on fire!
				</div>
				<Toast.Toggle />
			</Toast>
		</>
	);
}
