import React, { useEffect, useState, SyntheticEvent } from 'react';
import { generateBearerToken } from "./utils/common";
import useLocalStorage from "./utils/customHooks/useLocalStorage";
import { getAPI } from './utils/requestAPI';
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import theme from "./utils/themes";
import { Input, InputGroup, InputLeftAddon, Box, Text, Spinner } from "@chakra-ui/core";
import { AiOutlinePlusCircle } from "react-icons/ai";
import {
	Container,
	HeroContainer,
	HeroHeading,
	HeroSubHeading,
	Avatar
} from "./components";

export interface User {
	screen_name: string;
	profile_image_url: string;
	id_str: string;
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

	const fetchUserTimeline = async (userId: string, bearerToken: string) => {

		try {
			const { timeline } = await getAPI(`/api/user-timeline/${userId}?bearer=${bearerToken}`);

			setUserTimeline({
				[userId]: timeline
			});

			setLoadingQuery(false);

		}
		catch (err) {
			alert(err);
			setLoadingQuery(false);
		}

	}

	const userSearch = (search: string) => `/api/user-timeline/search.json?q=${search}`;

	const handleAsyncSearch = async (query: string) => {



		try {
			const { users } = await getAPI(userSearch(query));

			setUserSearchResults(users);


		}
		catch (err) {

			console.log(err);
		}
	}




	useEffect(() => {
		// on first mount check if client has a bearer token in localStorage
		// and if not fetch a fresh one
		if (!bearer)
			fetchNewToken();

		//fetchUserTimeline("COERCITON", bearer);

		// if user is searching in async input, send query to Server/Twitter API
		if (query)
			handleAsyncSearch(query)

	}, [query]);


	const handleChange = (e: any) => {
		setQuery(e.target.value);
	}

	const addUserTimeline = (userId: string) => {

		// loading state
		setLoadingQuery(true);

		// clear users menu dropdown
		setUserSearchResults([]);

		// clear input
		setQuery("");

		fetchUserTimeline(userId, bearer);

	}

	console.log(userTimeline);

	return (
		<>
			<ThemeProvider theme={theme}>
				<CSSReset />

				{/*<Container>*/}
				<Box
					height={["auto", "100vh"]}
					display={["block", "flex"]}
					flexDirection={["unset", "column"]}
					overflowY="scroll"
					bg="gray.50"
				>
					<Box
						flex={1}
						display="flex"
						flexDirection="column"
						alignItems="center"
					>
						<HeroContainer>
							<HeroHeading>
								Welcome to TwitterCrunch! 🥳
								</HeroHeading>
							<HeroSubHeading>
								Simply search for a Twitter user handle name to see their latest tweets.
								</HeroSubHeading>
							<Box>
								<InputGroup>
									<InputLeftAddon size="lg" children="@" />
									<Input
										onChange={handleChange}
										value={query}
										placeholder="Twitter handle name"
										size="lg"
									/>
								</InputGroup>
								<Box position="relative" display="flex" flex={1}>
									<Box position="absolute" width={"100%"} maxH="400px" overflowY="scroll">
										{userSearchResults.map((user: User, i: string) =>
											<Box bg="gray.100" key={i}>
												<Box display="inline-flex" alignItems="center">
													<Box px="5">
														<AiOutlinePlusCircle onClick={() => addUserTimeline(user.id_str)} cursor="pointer" />
													</Box>

													<Avatar imgSrc={user.profile_image_url} />

													<Text px="2" fontWeight={600}>{user.screen_name}</Text>
												</Box>
											</Box>)}

									</Box>
								</Box>
							</Box>
							{loadingQuery ?
								<Box p={5} display="flex" flexDirection="column" alignItems="center">
									<Spinner />
									<Text display="block" p={3} fontWeight={600}>Loading...</Text>

								</Box> : null}
						</HeroContainer>

					</Box>

				</Box>









				{/*</Container>*/}



			</ThemeProvider>
		</>
	);
}

export default App;