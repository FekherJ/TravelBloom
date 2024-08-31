document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('search-button');
    const clearButton = document.getElementById('clear-button');

    if (searchButton && clearButton) {
        searchButton.addEventListener('click', function() {
            // Get user input and convert it to lowercase
            const userInput = document.getElementById('search-input').value.toLowerCase();

            // Fetch the data from the JSON file
            fetch('travel_recommendation_api.json')
                .then(response => response.json())
                .then(data => {
                    let results = [];

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
                    displayResults(results, 5);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        });

        clearButton.addEventListener('click', function() {
            const resultsDiv = document.getElementById('results');
            if (resultsDiv) {
                resultsDiv.innerHTML = '';
            }
        });
    }

    function displayResults(results, n) {
        const resultsDiv = document.getElementById('results');
        if (resultsDiv) {
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
    }
});
