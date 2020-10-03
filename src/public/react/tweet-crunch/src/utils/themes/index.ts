import { theme } from "@chakra-ui/core";
import { typography } from "./typography";
import { colours } from "./colours";

const customTheme = {
	...theme,
	...typography,
	colours: {
		...colours
	}
}

export default customTheme;