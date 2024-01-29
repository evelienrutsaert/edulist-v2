import { useReducer } from "react";

const fetchReducer = (state, action) => {
	switch (action.type) {
		case "FETCH_INIT":
			return { ...state, isLoading: true, isError: false };
		case "FETCH_SUCCES":
			return {
				...state,
				isLoading: true,
				isError: false,
				data: action.payload,
			};
		case "FETCH_FAILURE":
			return {
				...state,
				isLoading: false,
				isError: true,
			};
		default:
			throw new Error();
	}
};

export const useFetch = (url = "", initalData = []) => {
	const initalState = {
		data: initalData,
		isLoading: true,
		isError: false,
	};
	const [state, dispatch] = useReducer(fetchReducer, initalState);

	useEffect(() => {
		let isMounted = true;
		const fetchData = async () => {
			dispatch({ type: "FETCH_INIT" });
			try {
				const res = await fetch(url);
				const data = await res.json();
				if (isMounted) {
					dispatch({ type: "FETCH_SUCCES", payload: data });
				}
			} catch (error) {
				if (isMounted) {
					dispatch({ type: "FETCH_FAILURE" });
				}
			}
			fetchData();
			return () => {
				return (isMounted = false);
			};
		};
	}, [url]);
};
