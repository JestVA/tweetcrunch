import { StatusCodes } from "http-status-codes";
import { Controller, Get } from "@overnightjs/core";
import { Logger } from "@overnightjs/logger";
import { Request, Response } from "express";

const { OK, BAD_REQUEST } = StatusCodes;

@Controller("api/user-timeline")
class TwitterController {

	public static readonly SUCCESS_MSG = "Fetch user timeline success, for Twitter user with ID: ";

	@Get(':user_id')
	private userTimeline(req: Request, res: Response) {

		try {

			const { user_id } = req.params;

			return res.status(OK).json({
				message: TwitterController.SUCCESS_MSG + user_id,
			});

		}
		catch (err) {

			Logger.Err(err, true);

			return res.status(BAD_REQUEST).json({
				error: err.message,
			});

		}
	}
}

export default TwitterController;