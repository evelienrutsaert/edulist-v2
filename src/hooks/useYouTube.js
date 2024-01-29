// const youTubeReducer = (state, action) => {
// 	switch (action.type) {
// 		case "YOUTUBE_INIT":
// 			return { ...state, isLoading: true, isError: false };
// 		case "YOUTUBE_SUCCES":
// 			return {
// 				...state,
// 				isLoading: false,
// 				isError: false,
// 				data: action.payload,
// 			};
// 		case "YOUTUBE_FAILURE":
// 			return { ...state, isLoading: false, isError: true };
// 		default:
// 			throw new Error();
// 	}
// };
// export const useYouTube = (videoId = "", initialData = []) => {
// 	const initialState = {
// 		data: initialData,
// 		isLoading: true,
// 		isError: false,
// 	};
// 	const [id, setId] = useState(videoId);
// 	const YOUTUBE_API = process.env.REACT_APP_YOUTUBE_KEY;
// 	const [state, dispatch] = useReducer(youTubeReducer, initialState);

// 	const fetchData = async (isMounted) => {
// 		dispatch({ type: "YOUTUBE_INIT" });
// 		if (!id) {
// 			dispatch({ type: "YOUTUBE_FAILURE" });
// 		}
// 		try {
// 			const res = await fetch(
// 				"https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" +
// 					id +
// 					"&key=" +
// 					YOUTUBE_API
// 			);
// 			console.log("id", id);
// 			const data = await res.json();
// 			if (isMounted) {
// 				console.log(data);
// 				dispatch({ type: "YOUTUBE_SUCCES", payload: data });
// 			}
// 		} catch (error) {
// 			if (isMounted) {
// 				dispatch({ type: "YOUTUBE_FAILURE" });
// 			}
// 		}
// 	};
// 	useEffect(() => {
// 		let isMounted = true;

// 		fetchData(isMounted);
// 		return () => {
// 			return (isMounted = false);
// 		};
// 	}, [id]);

// 	// const reFetchYoutube = useCallback(() => {
// 	// 	console.log(id);
// 	// 	let isMounted = true;
// 	// 	fetchData(isMounted);
// 	// 	return () => {
// 	// 		return (isMounted = false);
// 	// 	};
// 	// }, [id]);

// 	const setNewVideoId = (newVideoId) => {
// 		console.log(newVideoId);
// 		setId(newVideoId);
// 	};

// 	return { ...state, setNewVideoId };
// };

export const useYouTube = () => {
	const YOUTUBE_API = process.env.REACT_APP_YOUTUBE_KEY;

	const fetchYoutubeTitle = async (videoId) => {
		const res = await fetch(
			"https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" +
				videoId +
				"&key=" +
				YOUTUBE_API
		);
		const data = await res.json();
		return data.items[0].snippet.title;
	};
	return { fetchYoutubeTitle };
};
