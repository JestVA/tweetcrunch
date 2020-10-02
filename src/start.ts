import TweetCrunch from "./TweetCrunch";

if (process.argv[2] !== "test") {

	const server = new TweetCrunch();

	server.start(3001);

}
else {
	// to do
}