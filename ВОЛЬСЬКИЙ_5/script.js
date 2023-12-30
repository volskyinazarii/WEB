const citiesByCountry = {
    ukr: ['Kyiv', 'Lviv', 'Ivano-Frankivsk'],
    pol: ['Warsaw', 'Krakow', 'Gdansk'],
    usa: ['New York', 'Los Angeles', 'Chicago']
};

function updateCities() {
    const countrySelect = document.getElementById('country');
    const citiesSelect = document.getElementById('cities');
    const resultParagraph = document.getElementById('result');

    const selectedCountry = countrySelect.value;

    citiesSelect.innerHTML = '';

    citiesByCountry[selectedCountry].forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        citiesSelect.appendChild(option);
    });

    updateResultParagraph();
}

function updateResultParagraph() {
    const countrySelect = document.getElementById('country');
    const citiesSelect = document.getElementById('cities');
    const resultParagraph = document.getElementById('result');

    resultParagraph.textContent = `Обрана країна і місто:${countrySelect.options[countrySelect.selectedIndex].text}, ${citiesSelect.value}`;
}

updateCities();

document.getElementById('cities').addEventListener('change', updateResultParagraph);