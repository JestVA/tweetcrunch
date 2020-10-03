import React from "react";
import { Heading, Text, Box } from "@chakra-ui/core";
import Container from "../Container";


const HeroContainer = (props: any) => {
	return (
		<Container>
			<Box maxW={["auto", "md"]} width="100%" mx="auto" py={[8, 12]}>
				{props.children}
			</Box>
		</Container>
	);
};

const HeroHeading = (props: any) => {
	return (
		<Heading
			fontSize={["2xl", "2xl"]}
			fontWeight={600}
			mb={[2, 4]}
			maxW={["sm", "100%"]}
			textAlign={["left", "center"]}
		>
			{props.children}
		</Heading>
	);
};

const HeroSubHeading = (props: any) => {
	return (
		<Text
			fontSize={["md", "md"]}
			fontWeight={400}
			maxW={["sm", "100%"]}
			mb={4}
			textAlign={["left", "center"]}
		>
			{props.children}
		</Text>
	);
};

export { HeroHeading, HeroSubHeading, HeroContainer };