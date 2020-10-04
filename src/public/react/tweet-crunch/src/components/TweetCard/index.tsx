import React from "react";
import { Box, Avatar } from "@chakra-ui/core";
import moment from "moment";
import { AiFillHeart } from "react-icons/ai";
import { FaRetweet } from "react-icons/fa";

const Spacer = ({ size }: { size: number }) => <Box px={size} ></Box>;

const TweetCard = (props: any) => {

	const {
		id: keyId,
		favorite_count: favoriteCount,
		retweet_count: retweetCount,
		created_at: createdAt,
		user: {
			id_str: id,
			name,
			screen_name: screenName,
			location,
			profile_image_url: imageUrl
		},
		full_text: fullText,
	} = props.tweetMetadata;



	return (
		<Box key={keyId} my={4} width={"100%"} borderWidth="1px" rounded="lg" overflow="hidden">
			<Box p={2}>
				<Box d="flex" alignItems="flex-start">
					<Avatar src={imageUrl} />
					<Box
						color="gray.500"
						fontWeight="semibold"
						letterSpacing="wide"
						fontSize="xs"
						textTransform="uppercase"
						ml="2"
					>
						{name} &bull; @{screenName}
					</Box>
				</Box>
				<Box
					mt="1"
					fontWeight="semibold"
					as="h4"
					lineHeight="tight"
				>
					{fullText}
				</Box>
				<Box display="inline-flex" alignItems="center">
					<AiFillHeart />
					<Spacer size={1} />
					{favoriteCount}
					<Spacer size={1} />
					<FaRetweet />
					<Spacer size={1} />
					{retweetCount}
					<Spacer size={1} />
				</Box>
			</Box>
		</Box>
	);
}

export default TweetCard;