import React, { useEffect, useState } from 'react';
import { generateBearerToken } from "./utils/common";
import useLocalStorage from "./utils/customHooks/useLocalStorage";
import { getAPI } from './utils/requestAPI';
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import theme from "./utils/themes";
import { Input, InputGroup, InputLeftAddon, Box, Text, Spinner, Avatar, Button } from "@chakra-ui/core";
import { AiOutlinePlusCircle } from "react-icons/ai";
import ClickOut from "./utils/ClickOut";
import {
	HeroContainer,
	HeroHeading,
	HeroSubHeading,
	TweetCard
} from "./components";
import _ from "underscore";

export interface User {
	screen_name: string;
	profile_image_url: string;
	id_str: string;
}

export interface UserObjTimeline {
	// Typescript seems happy, I am happy
}

export interface Tweet {
	text: string;
}


const App = () => {

	const [bearer, setBearerToken] = useLocalStorage<any>('bearerToken', "");
	const [userTimeline, setUserTimeline] = useLocalStorage<any>('userTimeline', {});
	const [loadingQuery, setLoadingQuery] = useState(false);
	const [userSearchResults, setUserSearchResults] = useState<any>([]);
	const [query, setQuery] = useState("");
	const [displayTimelines, setDisplayTimelines] = useState<any>([]);

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

	const fetchUserTimeline = async (userId: string, bearerToken: string, maxId?: number) => {
		try {

			let qs = `/api/user-timeline/${userId}?bearer=${bearerToken}`;

			if (maxId)
				qs += `&since_id=${maxId}`;

			console.log(qs);
			const { timeline } = await getAPI(qs);

			// TODO: deal with REFRESH issue
			// do not lose state of cached timeline


			setUserTimeline({
				...userTimeline,
				[userId]: timeline
			});

			setDisplayTimelines([...displayTimelines, { [userId]: timeline }]);
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

		// if user is searching in async input, send query to Server/Twitter API
		if (query)
			handleAsyncSearch(query)

	}, [query]);


	const handleChange = (e: any) => {
		setQuery(e.target.value);
	}

	const addUserTimeline = (userId: string) => {

		setLoadingQuery(true);
		setUserSearchResults([]);
		setQuery("");

		// only touch API endpoint if we don't have user in localStorage
		if (userTimeline[userId]) {
			setDisplayTimelines([...displayTimelines, { [userId]: userTimeline[userId] }])
			setLoadingQuery(false);
			return;
		}

		fetchUserTimeline(userId, bearer);
	}

	const closeMenu = () => {
		setUserSearchResults([]);
	}

	const refreshTweets = (timelineToRefresh: any) => {
		console.log(timelineToRefresh, "TO BE REFRESHED");
		const [userId, tweetsArray] = [_.keys(timelineToRefresh), _.values(timelineToRefresh)];
		// since_id
		// loop through tweets to get max id
		let maxId = 0;

		_.first(tweetsArray).forEach((t: any) => t.id > maxId ? maxId = t.id : null);

		console.log(userId);

		// set up to date notification! 
		if (!maxId)
			return;

		// make a new request with since_id
		fetchUserTimeline(userId[0], bearer, maxId);


	}

	// the following is a sleepless night and hackathon. Beware those who enter, for there is no return!
	return (
		<>
			<ThemeProvider theme={theme}>
				<CSSReset />
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
									<ClickOut toggle={closeMenu}>
										<Box position="absolute" zIndex={100000} width={"100%"} maxH="400px" overflowY="scroll">
											{userSearchResults.map((user: User, i: string) =>
												<Box bg="gray.100" key={i}>
													<Box display="inline-flex" alignItems="center">
														<Box px="5">
															<AiOutlinePlusCircle onClick={() => addUserTimeline(user.id_str)} cursor="pointer" />
														</Box>
														<Avatar size="sm" src={user.profile_image_url} />
														<Text px="2" fontWeight={600}>{user.screen_name}</Text>
													</Box>
												</Box>)}
										</Box>
									</ClickOut>
								</Box>
							</Box>
							{loadingQuery ?
								<Box p={5} display="flex" flexDirection="column" alignItems="center">
									<Spinner />
									<Text display="block" p={3} fontWeight={600}>Loading...</Text>
								</Box> : null}
						</HeroContainer>
					</Box>
					<Box display="flex" flexDir="row-reverse" justifyContent="center" flexWrap="wrap-reverse">
						{
							displayTimelines.map((t: UserObjTimeline, i: number) => {
								return <Box key={i} p={2} m={4} width="320px" height="auto">
									<Button onClick={() => refreshTweets(t)} borderColor="gray.200" size="xs" rightIcon="repeat" variantColor="ghost" variant="outline">
										Refresh
									</Button>
									{
										_.values(t).map(timeline => {
											return timeline.map((tweet: Tweet) => {
												// the developer in me was crying so decided to make a component
												return <TweetCard tweetMetadata={tweet} />
											})
										})
									}
								</Box>
							})
						}
					</Box>
				</Box>
			</ThemeProvider>
		</>
	);
}

export default App;