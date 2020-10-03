import React, { useEffect, useState, SyntheticEvent } from 'react';
import { generateBearerToken } from "./utils/common";
import useLocalStorage from "./utils/customHooks/useLocalStorage";
import { getAPI } from './utils/requestAPI';
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import theme from "./utils/themes";
//import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/core";

export interface User {
	screen_name: string;
}


const App = () => {

	const [bearer, setBearerToken] = useLocalStorage<any>('bearerToken', "");
	const [userTimeline, setUserTimeline] = useLocalStorage<any>('userTimeline', {});
	const [loadingQuery, setLoadingQuery] = useState(false);
	const [userSearchResults, setUserSearchResults] = useState<any>([]);
	const [query, setQuery] = useState("");

	const fetchNewToken = async () => {
		try {
			const { token } = await generateBearerToken("/api/user-timeline/auth/bearer");
			// sets it in localStorage
			setBearerToken(token);
		}
		catch (err) {
			alert(err);
		}
	}

	const fetchUserTimeline = async (user: string, bearerToken: string) => {

		if (!bearer)
			alert("Can't do this request at this time. Please check back later.");

		try {
			const { timeline } = await getAPI(`/api/user-timeline/${user}?bearer=${bearerToken}`);

			setUserTimeline({
				[user]: timeline
			});

		}
		catch (err) {
			alert(err);
		}

	}

	// TODO: need a better auth to hit this endpoint
	const userSearch = (search: string) => `/api/user-timeline/search.json?q=${search}`;

	const handleAsyncSearch = async (query: string) => {

		setLoadingQuery(true);

		try {
			const { users } = await getAPI(userSearch(query));

			setUserSearchResults(users);
			setLoadingQuery(false);

		}
		catch (err) {
			setLoadingQuery(false);
			console.log(err);
		}
	}




	useEffect(() => {
		console.log("mounting...")
		// on first mount check if client has a bearer token in localStorage
		// and if not fetch a fresh one
		if (!bearer)
			fetchNewToken();

		//console.log(userTimeline);
		//if (userTimeline["COERCITON"])
		//	return console.log("I HAVE COERCITON");

		//fetchUserTimeline("COERCITON", bearer);

		if (query)
			handleAsyncSearch(query)

	}, [query]);








	const handleChange = (e: any) => {
		setQuery(e.target.value);
	}


	return (
		<>
			<ThemeProvider theme={theme}>
				<CSSReset />


				You've go it!
				<InputGroup>
					<InputLeftAddon size="lg" children="@" />
					<Input
						onChange={handleChange}
						value={query}
						placeholder="handle"
						size="lg"
					/>
				</InputGroup>

				{userSearchResults.map((user: User, i: string) => <div key={i}>{user.screen_name}</div>)}




				{/*<AsyncTypeahead
					id="spooky"
					filterBy={["id_str"]}
					isLoading={loadingQuery}
					onSearch={handleAsyncSearch}
					options={userSearchResults}
					minLength={2}
					useCache
				/>*/}


			</ThemeProvider>
		</>
	);
}

export default App;