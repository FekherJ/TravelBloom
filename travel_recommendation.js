document.addEventListener('DOMContentLoaded', function() {

// display the time in the country you recommend
const options = { timeZone: 'America/New_York', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
//creates a new Date object representing the current date and time
//formats the time according to the specified options in the ‘en-US’ locale (English - United States) and the provided options object (options)
//returns a string representing the time in the specified format
const newYorkTime = new Date().toLocaleTimeString('en-US', options);   
//outputs the string “Current time in New York:” along with the formatted time retrieved in the newYorkTime variable
console.log("Current time in New York:", newYorkTime);

document.getElementById('search-button').addEventListener('click', function() {
    // Get user input and convert it to lowercase
    const userInput = document.getElementById('search-input').value.toLowerCase();

    // Fetch the data from the JSON file
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            let results = [];

            // Dynamically build the keywords from the JSON data
            let keywords = [];
            data.forEach(country => {
                country.cities.forEach(city => {
                    const cityName = city.name.toLowerCase();
                    const description = city.description.toLowerCase();

                    // Add city name and keywords from description to keywords array
                    keywords.push(cityName);
                    if (description.includes("beach")) {
                        keywords.push("beach", "beaches");
                    }
                    if (description.includes("temple")) {
                        keywords.push("temple", "temples");
                    }
                    if (description.includes("country")) {
                        keywords.push("country", "countries");
                    }
                });
            });

            // Check if the input matches any of the keywords
            data.forEach(country => {
                country.cities.forEach(city => {
                    const cityName = city.name.toLowerCase();
                    const description = city.description.toLowerCase();

                    if (cityName.includes(userInput) || description.includes(userInput)) {
                        results.push({
                            name: city.name,
                            description: city.description,
                            imageUrl: city.imageUrl
                        });
                    }
                });
            });

            // Display the results
            console.log(results);
            displayResults(results, 5);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
})});


function displayResults(results, n) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    if (results.length > 0) {
        resultsDiv.style.display = 'flex'; 
        const limitedResults = results.slice(0, n); // Get the first n results
        limitedResults.forEach(item => {
            resultsDiv.innerHTML += `
                <div class="result-item">
                    <img src="${item.imageUrl}" alt="${item.name}" class="result-image"/>
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <button class="visit-button">Visit</button>
                </div>
            `;
        });
    } else {
        resultsDiv.innerHTML = '<p>No results found.</p>';
    }
}



document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('clear-button').addEventListener('click', function() {
        const resultsDiv = document.getElementById('results'); 
        resultsDiv.innerHTML = '';
})})




// Display all (explore busson)
/*
document.getElementById('explore-button').addEventListener('click', function() {
    // Get user input and convert it to lowercase
    const userInput = document.getElementById('search-input').value.toLowerCase();

    // Fetch the data from the JSON file
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            let results = [];

            // Dynamically build the keywords from the JSON data
            let keywords = [];
            data.forEach(country => {
                country.cities.forEach(city => {
                    const cityName = city.name.toLowerCase();
                    const description = city.description.toLowerCase();

                    // Add city name and keywords from description to keywords array
                    keywords.push(cityName);
                    if (description.includes("beach")) {
                        keywords.push("beach", "beaches");
                    }
                    if (description.includes("temple")) {
                        keywords.push("temple", "temples");
                    }
                    if (description.includes("country")) {
                        keywords.push("country", "countries");
                    }
                });
            });

            // Check if the input matches any of the keywords
            data.forEach(country => {
                country.cities.forEach(city => {
                    const cityName = city.name.toLowerCase();
                    const description = city.description.toLowerCase();

                    if (cityName.includes(userInput) || description.includes(userInput)) {
                        results.push({
                            name: city.name,
                            description: city.description,
                            imageUrl: city.imageUrl
                        });
                    }
                });
            });

            // Display the results
            console.log(results);
            displayResults(results, 5);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

})});
*/








