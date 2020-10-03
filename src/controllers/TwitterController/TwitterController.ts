import { StatusCodes } from "http-status-codes";
import { Controller, Get } from "@overnightjs/core";
import { Logger } from "@overnightjs/logger";
import { Request, Response } from "express";
import axios from "axios";
import config from "../../../config";
const _ = require("underscore");

const OAuth = require('oauth');

const { OK, BAD_REQUEST } = StatusCodes;

@Controller("api/user-timeline")
class TwitterController {

	public static readonly SUCCESS_MSG = "Fetch user timeline success, for Twitter user with ID: ";
	public static readonly BEARER_TOKEN = "Bearer token generated / refreshed successfuly";
	public static readonly NO_BEARER_TOKEN = "No Bearer token was received from client";
	public static readonly USERS = "List of 1000 users fetched!";

	@Get('search.json')
	private async searchUsers(req: Request, res: Response) {

		const userPicks = ["id_str", "name", "screen_name", "location"];



		try {
			const { q } = req.query;

			var oauth = new OAuth.OAuth(
				'https://api.twitter.com/oauth/request_token',
				'https://api.twitter.com/oauth/access_token',
				config.get("twitter.API_KEY"),
				config.get("twitter.API_KEY_SECRET"),
				'1.0A',
				null,
				'HMAC-SHA1'
			);

			oauth.get(
				`https://api.twitter.com/1.1/users/search.json?q=${q}`,
				config.get("twitter.ACCESS_TOKEN"),
				config.get("twitter.ACCESS_TOKEN_SECRET"),
				function cb(e: Error, data: string) {

					const ret: [Object] = JSON.parse(data);

					const sanitizedUsers = ret.map((u) => _.pick(u, userPicks));

					return res.status(OK).json({
						message: TwitterController.USERS,
						users: sanitizedUsers
					});
				}
			);
		}
		catch (err) {
			Logger.Err(err.response.data.errors, true);

			return res.status(BAD_REQUEST).json({
				error: err.message,
			});
		}
	}


	@Get(':user_id')
	private async userTimeline(req: Request, res: Response) {

		try {

			const { user_id } = req.params;

			const { bearer } = req.query;

			if (!bearer)
				return res.status(BAD_REQUEST).json({
					error: TwitterController.NO_BEARER_TOKEN
				});

			const getUserTimeline = await axios.get(`https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=COERCITON`, {
				headers: {
					'authorization': `Bearer ${bearer}`
				}
			});

			// will need to do some manipulation / cleanup of data here

			return res.status(OK).json({
				message: TwitterController.SUCCESS_MSG + user_id,
				timeline: getUserTimeline.data
			});

		}
		catch (err) {

			Logger.Err(err.response.data.errors, true);

			return res.status(BAD_REQUEST).json({
				error: err.message,
			});
		}
	}


	@Get('auth/bearer')
	private async generateBearerToken(req: Request, res: Response) {
		console.log("Generating new bearer token");
		try {
			// generate a Bearer token for first request and save it in client storage
			const TWITTER_API_KEY = config.get("twitter.API_KEY");
			const TWITTER_API_SECRET = config.get("twitter.API_KEY_SECRET");

			const creds = `${TWITTER_API_KEY}:${TWITTER_API_SECRET}`;
			const credentialsEncoded = Buffer.from(creds).toString('base64');

			const auth = await axios.post('https://api.twitter.com/oauth2/token', {}, {
				headers: {
					'Authorization': `Basic ${credentialsEncoded}`,
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
				},
				transformRequest: [(data, header) => {
					data = 'grant_type=client_credentials';
					return data;
				}]
			})

			const bearerToken = auth.data.access_token;

			return res.status(OK).json({
				message: TwitterController.BEARER_TOKEN,
				token: bearerToken
			});

		}
		catch (err) {

			Logger.Err(err.response.data.errors, true);

			return res.status(BAD_REQUEST).json({
				error: err.message,
			});
		}
	}
}

export default TwitterController;