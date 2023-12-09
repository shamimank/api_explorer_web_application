// GET: fetching data from Google books API
const fetchAPIdata = async(book) => {
    try {
        const apiURL = `https://www.googleapis.com/books/v1/volumes?q=${book}`
        const response = await fetch(apiURL)
        const data = await response.json()
        return data
    }
    catch (error) {
        console.error('Fetch error ', error)
    }
}

// POST: posting search results (in json format) to my mock API
const postToMockAPI = async (data) => {
    try {
        const mockApiURL = 'https://655fa8d8879575426b45a303.mockapi.io/books'; // my mock API endpoint
        const response = await fetch(mockApiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    } catch (error) {
        console.error('Error posting to mock API ', error);
    }
};

//const bookFinds = async() => {
//    const books = await fetchAPIdata()
//    console.log(books)
//}

//bookFinds()


const searchButton = document.getElementById('search-button');  
const searchResult = document.getElementById('search-result');

searchButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const searchInput = document.getElementById('search');
    const inputVal = searchInput.value;
    searchInput.value = '';

    const foundBooks = await fetchAPIdata(inputVal);  // found book list (json) after the search
    //console.log(foundBooks);

    let output = '';
    foundBooks.items.forEach(function(book) {
        output += `
            <h3>${book.volumeInfo.title}</h3>
            <a href="${book.volumeInfo.previewLink}" target="_blank">Read More</a>
        `;
    });

    searchResult.innerHTML = output;
    
    const postResult = await postToMockAPI(foundBooks); // posting results on my mock API
    //console.log(postResult);
})

