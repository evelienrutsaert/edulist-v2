import "./App.css";
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import Root from "./layout/Root";
import { ThemeArea } from "./context/ThemeContext";
import Courses from "./pages/Courses";
import Course from "./pages/Course";
import ErrorPage from "./pages/ErrorPage";
import LearningPath from "./pages/LearningPath";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Root />}>
			<Route path="/" element={<Courses />} />
			<Route path="courses">
				<Route index element={<Courses />} />
				<Route
					path=":courseSlug"
					element={<Course />}
					errorElement={<ErrorPage />}
				/>
				<Route
					path=":courseSlug/:learningPathSlug"
					element={<LearningPath />}
					errorElement={<ErrorPage />}
				/>
			</Route>
		</Route>
	)
);

function App() {
	return (
		<ThemeArea>
			<RouterProvider router={router} />
		</ThemeArea>
	);
}

export default App;
