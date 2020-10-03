import React from "react";
import { Box, Image, Badge, Avatar } from "@chakra-ui/core";
import moment from "moment";
import { AiFillHeart } from "react-icons/ai";
import { FaRetweet } from "react-icons/fa";

const Spacer = ({ size }: { size: number }) => <Box px={size} ></Box>;

const TweetCard = (props: any) => {

	const {
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
		media
	} = props.tweetMetadata;



	return (
		<Box my={4} width={"100%"} borderWidth="1px" rounded="lg" overflow="hidden">
			{/*<Image src={property.imageUrl} />*/}

			<Box p={2}>
				<Box d="flex" alignItems="flex-start">
					<Avatar src={imageUrl} />
					{/*<Badge rounded="full" px="2" variantColor="teal">
						{moment(createdAt).format("MM DD")}
					</Badge>*/}
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

				{/*<Box d="flex" mt="2" alignItems="center">*/}
				{/*{Array(5)
						.fill("")
						.map((_, i) => (
							<StarIcon
								key={i}
								color={i < property.rating ? "teal.500" : "gray.300"}
							/>
						))}*/}
				{/*<Box as="span" ml="2" color="gray.600" fontSize="sm">
						{property.reviewCount} reviews
					</Box>*/}
				{/*</Box>*/}
			</Box>
		</Box>
	);
}

export default TweetCard;