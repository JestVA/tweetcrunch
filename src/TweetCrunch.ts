import * as path from "path";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as controllers from "./controllers";
import { Server } from "@overnightjs/core";
import { Logger } from "@overnightjs/logger";

class TweetCrunch extends Server {

	private readonly SERVER_START_MSG = "TweetCrunch Server listening on port: ";

	private readonly DEV_MSG = "TweetCrunch Server is running in development mode. You need to run prod build to see the CRA."

	constructor() {

		super(true);

		this.app.use(bodyParser.json());

		this.app.use(bodyParser.urlencoded({ extended: true }));

		this.setupControllers();


		if (process.env.NODE_ENV !== "production") {

			Logger.Info("Starting server in development mode");

			const msg = this.DEV_MSG;

			this.app.get("*", (req, res) => res.send(msg));
		}
		else {
			this.serveProdView();
		}
	}

	private setupControllers(): void {

		const ctrlInstances = [];

		for (const controller in controllers) {

			if (controllers.hasOwnProperty(controller)) {

				const Controller = (controllers as any)[controller];

				ctrlInstances.push(new Controller());
			}
		}

		super.addControllers(ctrlInstances);
	}

	private serveProdView(): void {
		const dir = path.join(__dirname, "public/react/tweet-crunch");
		this.app.set("views", dir);
		this.app.use(express.static(dir));
		this.app.get("*", (req, res) => {
			res.sendFile("index.html", { root: dir });
		});
	}

	public start(port: number): void {

		this.app.listen(port, () => {

			Logger.Imp(this.SERVER_START_MSG + port);

		});

	}
}

export default TweetCrunch;