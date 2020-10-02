import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { getAPI } from "./utils/requestAPI";

const App = () => {

	const [userTimeline, setUserTimeline] = useState({
		message: ""
	});

	const testAPi = async (endpoint: string) => {
		try {
			const apiRes = await getAPI(endpoint);

			setUserTimeline(apiRes);
		}
		catch (err) {
			alert(err);
		}

	}

	useEffect(() => {

		testAPi(`/api/user-timeline/100200`);

	}, []);


	return (
		<div className="App">
			API Returned: {userTimeline.message}
		</div>
	);
}

export default App;