const searchArray = [
    'legislation',
    'periodical',
    'personal+narrative',
    'software,+e-resource',
    'web-pages',
    '3d+object',
];
let searchInquiry = JSON.parse(localStorage.getItem('searchInquiry'));

const getSearchResults = (searchTerm, format) => {
    let query = searchTerm.split(' ').join('+');
    console.log(query);
    let apiUrl = 'https://www.loc.gov/';
    if (format === 'search') {
        apiUrl += `search/?in&q=${query}&new=true&st=&fo=json`;
    } else if (searchArray.includes(format)) {
        apiUrl += `search/?fa=original-format:${format}&q=${query}&fo=json`;
    } else {
        apiUrl += `${format}/?q=${query}&fo=json`;
    }
    console.log(apiUrl);
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data.results);
            });
        } else {
            alert(`Error: ${response.statusText}`);
        }
    });
};
