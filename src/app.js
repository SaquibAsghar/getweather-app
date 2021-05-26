const express = require("express");
const path = require("path");
const hbs = require("hbs");
const getWeatherForcast = require("../utils/getWeather");
const getGeoInfo = require("../utils/geoLocation");

// console.log(__dirname);
// console.log(__filename)

const publicDirectory = path.join(__dirname, "../static/public/");

// app.use(path.join(__dirname + '../static/public/css'))

const app = express();
const port = process.env.PORT || 3000;

const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Set template engine to hbs
app.set("view engine", "hbs");

// tell the express where to look for template files other than default 'views' folder present at root folder
app.set("views", viewsPath);

hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

app.get("/", (req, res) => {
	res.render("index", {
		title: "Weather App",
		name: "Saquib Asghar",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About Me",
		name: "Saquib Asghar",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help Page",
		name: "Saquib Asghar",
		mess: "Some test message",
	});
});

app.get("/weather", (req, res) => {
	const userSearchLocation = req.query.location;
	console.log(userSearchLocation)
	if (!userSearchLocation) {
		return res.status(400).json(
			{
				status: false,
				message: "Address must be provided",
			},
		);
	}

	getGeoInfo(userSearchLocation, (data) => {
		if (!data.status) {
			return res.status(data.statusCode).json(data);
		} else {
			getWeatherForcast(data, (send_data) => {
				return res.status(send_data.statusCode).json(send_data);
			});
		}
	});
});
app.get("/help/*", (req, res) => {
	res.status(404).render("404", {
		title: "404 Error",
		name: "Saquib Asghar",
		mess: "Help article not found",
	});
});

app.get("/*", (req, res) => {
	res.status(404).render("404", {
		title: "404 Error",
		name: "Saquib Asghar",
		mess: "Page not found",
	});
});

app.listen(port, () => {
	console.log(`Server is running at port number ${port}`);
});
