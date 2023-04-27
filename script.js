
// Function to create a Bootstrap card for a given country object
function createCountryCard(country) {
    // Create card elements
    const card = document.createElement('div');
    card.classList.add('col-lg-4', 'col-sm-12', 'mb-4');
    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    const flag = document.createElement('img');
    flag.src = country.flags.svg;
    flag.classList.add("mr");

    const weatherBtn = document.createElement('button');
    weatherBtn.classList.add('btn', 'btn-primary');
    weatherBtn.textContent = 'Click for Weather';

    // Populate card elements with country data
    cardHeader.textContent = country.name;
    cardTitle.textContent = `Capital: ${country.capital}`;
    cardText.innerHTML = `Region: ${country.region}<br>
                          Country Code: ${country.alpha2Code}`;
    flag.innerHTML = `${country.flags.svg}`
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(weatherBtn);
    cardHeader.appendChild(flag);
    card.appendChild(cardHeader);
    card.appendChild(cardBody);


    // Add click event listener to weather button
    weatherBtn.addEventListener('click', () => {
        const lat = country.latlng[0];
        const lng = country.latlng[1];
        fetch(`https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert(`Current weather in ${country.name}: ${data.weather[0].description}, ${data.main.temp}°C`);
            })
            .catch(error => {
                console.error(error);
                alert('Unable to get weather data. Please try again later.');
            });
    });

    return card;
}


// Function to add country cards to the HTML page
function displayCountryCards(countries) {
    const row = document.querySelector('.row');
    countries.forEach(country => {
        const card = createCountryCard(country);
        row.appendChild(card);
    });
}

// Fetch countries data from the REST Countries API
fetch('https://restcountries.com/v2/all')
    .then(response => response.json())
    .then(data => {
        displayCountryCards(data);
    })
    .catch(error => {
        console.error(error);
        alert('Unable to get country data. Please try again later.');
    });
