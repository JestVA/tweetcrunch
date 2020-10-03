import React, { useRef, useEffect } from 'react';
import { Box } from "@chakra-ui/core";

const ClickOut = (props: any) => {

	const menuContainer = useRef<any>(null);

	const handleClickOutside = (event: any) => {

		if (menuContainer && !menuContainer.current.contains(event.target)) {
			props.toggle(event);
		}

	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);

		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return <Box style={{ width: '100%', height: '100%' }} ref={menuContainer}>{props.children}</Box>;
}

export default ClickOut;