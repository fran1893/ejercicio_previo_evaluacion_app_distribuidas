const divComputers = document.getElementById('computers');

const URL = 'http://localhost:4000/scraper';

fetch(URL)
    .then(response => {
        return response.json()
    })
    .then(data => {
        data.forEach(computer => {
            const names = '<h2>Nombre: ' + computer.computerName + '</h2>';
            const prices = '<p>Precio: '+computer.price +'</p>'
            const descriptions = '<p>Descripción: '+ computer.description +'</p>'

            divComputers.insertAdjacentHTML('beforeend', names);
            divComputers.insertAdjacentHTML('beforeend', prices);
            divComputers.insertAdjacentHTML('beforeend', descriptions);
        });
    })
    .catch(err => console.log(err));