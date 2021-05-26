console.log("File is loaded on to clent side");

const weatherForm = document.querySelector("form");
const messageOne = document.querySelector(".status")
const usrInp = document.querySelector("#searchLocation");
const image = document.querySelector('img')
console.log(image.src)

const searchLocation = (name) => {
	fetch(`/weather?location=${name}`)
		.then((res) => {
			res.json().then((data) => {
                // console.log(data)
				if (!data.status) {
                    messageOne.textContent = data.message
					return console.log(data.message);
				}
                messageOne.textContent = data.current.temperature+ "  " 
                // console.log(data.current.weather_icons[0])
                // image.attributes[0] = data.current.weather_icons[0]
                // console.log(image)

				return console.log(data);
			});
		})
		.catch((err) => console.log("Error catch"));
};


messageOne.textContent = ""

weatherForm.addEventListener("submit", (e) => {
	e.preventDefault();
    messageOne.textContent = "Loading..."
	// console.log(usrInp.value);
    if(!usrInp.value){
        return console.log("Empty string")
        
    }
    return searchLocation(usrInp.value)
	// console.log("Loading");
	// console.log("Submit");
});
