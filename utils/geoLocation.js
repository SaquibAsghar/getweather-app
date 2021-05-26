const request = require("postman-request");

const getGeoInfo = (location, cb) => {
	const map_access_token =
		"pk.eyJ1Ijoic2FxdWliYXNnaGFyLTE2IiwiYSI6ImNrcDJleXRpNDB4ZWoyb3RlNXBlaDEzNmsifQ.2FF5AHzXcZs9NqMXtEBsPw";
	const mapUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		location
	)}.json?access_token=${map_access_token}&limit=1`;

	request({ url: mapUrl, json: true }, (err, res) => {
		let message = "";
		let status;
		let statusCode;
		if (err) {
			status = false;
			statusCode = 404
			message = "Something went wrong";
			const data = {
				status,
				statusCode,
				message,
			};
			return cb(data);
		} else if (!res.body.features.length) {
			status = false;
			statusCode = 400
			message = "Address not correct";
			const data = {
				status,
				statusCode,
				message
				
			};
			return cb(data);
		}
		const [feature] = res.body.features;
		statusCode = 200
		const locData = {
			status: true,
			statusCode,
			place_name: feature.place_name,
			co_ordinate: feature.center.reverse(),
		};

		return cb(locData);
	});
};

module.exports = getGeoInfo;
