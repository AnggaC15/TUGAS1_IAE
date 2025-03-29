// Load dog breeds and enable random dog button on page load
window.onload = () => {
    loadBreeds();
    const randomDogButton = document.getElementById('randomDogButton');
    randomDogButton.addEventListener('click', loadRandomDog);
};

// Fetch and display a list of dog breeds
async function loadBreeds() {
    try {
        const response = await fetch('https://dog.ceo/api/breeds/list/all');
        const data = await response.json();
        displayBreeds(Object.keys(data.message));
    } catch (error) {
        console.error('Error fetching breeds:', error);
        document.getElementById('dogList').innerHTML = '<p>Error loading breeds. Please try again later.</p>';
    }
}

// Display dog breeds
function displayBreeds(breeds) {
    const dogList = document.getElementById('dogList');
    dogList.innerHTML = '';
    breeds.forEach(breed => {
        const div = document.createElement('div');
        div.className = 'dog-item';
        div.innerHTML = `<p>${breed}</p><button onclick="viewBreed('${breed}')">View Breed</button>`;
        dogList.appendChild(div);
    });
}

// Fetch and display a random dog image along with its breed
async function loadRandomDog() {
    try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();
        const dogDetails = document.getElementById('dogDetails');
        const breed = data.message.split('/')[4];
        dogDetails.innerHTML = `<h3>${breed}</h3><img src="${data.message}" alt="${breed}"><br><button onclick="backToList()">Back to Dog List</button>`;
    } catch (error) {
        console.error('Error fetching random dog:', error);
        document.getElementById('dogDetails').innerHTML = '<p>Error loading random dog. Please try again later.</p>';
    }
}

// View a specific breed's images
async function viewBreed(breed) {
    try {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
        const data = await response.json();
        const dogDetails = document.getElementById('dogDetails');
        dogDetails.innerHTML = `<h3>${breed}</h3><img src="${data.message}" alt="${breed}"><br><button onclick="backToList()">Back to Dog List</button>`;
    } catch (error) {
        console.error('Error fetching breed image:', error);
        document.getElementById('dogDetails').innerHTML = '<p>Error loading breed image. Please try again later.</p>';
    }
}

// Go back to the list of dogs
function backToList() {
    const dogDetails = document.getElementById('dogDetails');
    dogDetails.innerHTML = '';
    loadBreeds();
}

// Search breeds based on user input
function searchBreeds() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const dogItems = document.querySelectorAll('.dog-item');
    dogItems.forEach(item => {
        const breed = item.querySelector('p').textContent.toLowerCase();
        item.style.display = breed.includes(searchInput) ? 'block' : 'none';
    });
}
