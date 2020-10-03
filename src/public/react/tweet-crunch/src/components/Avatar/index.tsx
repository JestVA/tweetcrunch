import React from "react";
import { AspectRatioBox, Image } from "@chakra-ui/core";

export const Avatar = (props: any) => {
	return (
		<AspectRatioBox
			width="30px"
			height="30px"
			ratio={1}
			rounded="full"
			display="block"
			border={`2px solid`}
			borderColor={"gray.100"}
			objectFit="cover"
		>
			<Image src={props.imgSrc} />
		</AspectRatioBox>
	);
};