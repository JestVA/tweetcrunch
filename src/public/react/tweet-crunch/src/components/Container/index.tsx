import React from "react";
import { Box } from "@chakra-ui/core";

const Container = (props: any) => {
	return (
		<Box
			maxW="1080px"
			mx="auto"
			width={"100%"}
			px={4}
			bg="gray.50"
			{...props}
		>
			{props.children}
		</Box>
	);
}

export default Container;