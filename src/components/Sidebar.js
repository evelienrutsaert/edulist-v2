import React from "react";

export default function Sidebar({ children, metadata, isOpen, setIsOpen }) {
	return (
		<section
			className={
				" fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
				(isOpen
					? " transition-opacity opacity-100 duration-500 translate-x-0  "
					: " transition-all delay-500 opacity-0 translate-x-full  ")
			}
		>
			<section
				className={
					"text-left w-screen  max-w-3xl right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
					(isOpen ? " translate-x-0 " : " translate-x-full ")
				}
			>
				<article className=" p-6 relative w-screen max-w-3xl pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
					<h2 className="text-4xl font-extrabold ">
						{metadata && <>{metadata.title}</>}
					</h2>
					<div className="my-4 text-lg text-gray-400">
						{metadata && <p>{metadata.description}</p>}
					</div>
					<div className="mb-4 text-lg font-normal text-gray-600 ">
						{children}
					</div>
				</article>
			</section>
			<section
				className=" w-screen h-full cursor-pointer "
				onClick={() => {
					setIsOpen(false);
				}}
			></section>
		</section>
	);
}
