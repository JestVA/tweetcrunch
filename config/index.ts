const convict = require("convict");

// Define a schema
const config = convict({
	twitter: {
		API_KEY: {
			doc: "The Twitter API key",
			format: String,
			default: "fNcpPjl57KOc43BaEz4lHAIBt",
			env: "API_KEY",
		},
		API_KEY_SECRET: {
			doc: "The Twitter API key secret",
			format: String,
			default: "u3qZfvIdcx653rtMqIadTGt1jHwzRyI9Vc67vufaIFHz3IcfUS",
			env: "API_KEY_SECRET",
		},
		ACCESS_TOKEN: {
			doc: "The Twitter consumer key",
			format: String,
			default: "2256573766-CIsgu0tE0rf5Dx88dZ9d4QXuTyThBqTCBr4ixnU",
			env: "ACCESS_TOKEN",
		},
		ACCESS_TOKEN_SECRET: {
			doc: "The Twitter consumer key",
			format: String,
			default: "fguVotE9fPTBof7GmmmQ8j0fNU4PtDOh9xSZrJf5mfuVP",
			env: "ACCESS_TOKEN_SECRET",
		}
	}
});

export default config;