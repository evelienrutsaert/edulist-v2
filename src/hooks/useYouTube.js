import { useEffect, useReducer, useState } from "react";

const youTubeReducer = (state, action) => {
	switch (action.type) {
		case "YOUTUBE_INIT":
			return { ...state, isLoading: true, isError: false };
		case "YOUTUBE_SUCCES":
			return {
				...state,
				isLoading: false,
				isError: false,
				data: action.payload,
			};
		case "YOUTUBE_FAILURE":
			return { ...state, isLoading: false, isError: true };
		default:
			throw new Error();
	}
};
export const useYouTube = (videoId = "", initialData = []) => {
	const initialState = {
		data: initialData,
		isLoading: true,
		isError: false,
	};
	const [id, setId] = useState(videoId);
	const YOUTUBE_API = process.env.REACT_APP_YOUTUBE_KEY;
	const [state, dispatch] = useReducer(youTubeReducer, initialState);
	let isMounted;

	const fetchData = async (id) => {
		dispatch({ type: "YOUTUBE_INIT" });
		if (!id) {
			dispatch({ type: "YOUTUBE_FAILURE" });
		} else {
			try {
				const res = await fetch(
					"https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" +
						id +
						"&key=" +
						YOUTUBE_API
				);
				const data = await res.json();
				if (isMounted) {
					dispatch({ type: "YOUTUBE_SUCCES", payload: data });
				}
			} catch (error) {
				if (isMounted) {
					dispatch({ type: "YOUTUBE_FAILURE" });
				}
			}
		}
	};

	useEffect(() => {
		isMounted = true;
		fetchData(id);
	}, [id]);

	const getYoutubeTitle = async (videoId) => {
		try {
			const res = await fetch(
				"https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" +
					videoId +
					"&key=" +
					YOUTUBE_API
			);
			const data = await res.json();
			const youtubeTitle = data.items[0].snippet.title;
			return youtubeTitle;
		} catch (error) {
			throw new Error(error);
		}
	};

	return { ...state, getYoutubeTitle };
};
