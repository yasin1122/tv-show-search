// Select the search form and results container
const form = document.querySelector('#searchForm');
const resultsContainer = document.querySelector('#results');

// Add event listener to the form for the submit event
form.addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the search term from the form input
    const searchTerm = form.elements.query.value;

    // Create the configuration object for the API request
    const config = { params: { q: searchTerm } };

    try {
        // Make the API request using axios
        const res = await axios.get('http://api.tvmaze.com/search/shows', config);

        // Display the shows in the results container
        displayShows(res.data);

        // Clear the search input
        form.elements.query.value = '';
    } catch (error) {
        // Handle errors and display an error message
        displayError(error);
    }
});

// Function to display the shows in the results container
const displayShows = (shows) => {
    resultsContainer.innerHTML = ''; // Clear the results container

    // Check if there are no shows found
    if (shows.length === 0) {
        resultsContainer.textContent = 'No shows found.';
        return;
    }

    // Loop through the shows and create a container for each show
    for (let result of shows) {
        const show = result.show;

        const showContainer = document.createElement('div');
        showContainer.classList.add('show-container');

        // Create an image element if the show has an image
        if (show.image) {
            const img = document.createElement('img');
            img.src = show.image.medium;
            showContainer.appendChild(img);
        }

        // Create a heading element for the show title
        const title = document.createElement('h2');
        title.textContent = show.name;
        showContainer.appendChild(title);

        // Create a paragraph element for the show summary
        const summary = document.createElement('p');
        summary.innerHTML = show.summary;
        showContainer.appendChild(summary);

        // Create a link element for more details
        const link = document.createElement('a');
        link.href = show.url;
        link.textContent = 'More details';
        showContainer.appendChild(link);

        // Append the show container to the results container
        resultsContainer.appendChild(showContainer);
    }
};

// Function to display an error message
const displayError = (error) => {
    resultsContainer.innerHTML = `<p class="error">Error: ${error.message}</p>`;
};
