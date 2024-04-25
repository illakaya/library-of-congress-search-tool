const searchArray = [
    'legislation',
    'periodical',
    'personal+narrative',
    'software,+e-resource',
    'web-pages',
    '3d+object',
];
let searchInquiry = JSON.parse(localStorage.getItem('searchInquiry'));
// Create a list of items that required a different url format
const resultsDisplayEl = document.getElementById('results'),
    tabEl = document.querySelector('title'),
    backBtn = document.getElementById('back'),
    formTwo = document.getElementById('form-two'),
    searchVal = document.getElementById('search'),
    formatVal = document.getElementById('dropdown');

const getSearchResults = (searchTerm, format) => {
    let query = searchTerm.split(' ').join('+');
    let apiUrl = 'https://www.loc.gov/';
    if (format === 'search') {
        apiUrl += `search/?in&q=${query}&new=true&st=&fo=json`;
    } else if (searchArray.includes(format)) {
        apiUrl += `search/?fa=original-format:${format}&q=${query}&fo=json`;
    } else {
        apiUrl += `${format}/?q=${query}&fo=json`;
    }
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayResults(data.results);
            });
        } else {
            const cardEl = document.createElement('div'),
                divEl = document.createElement('div'),
                hEl = document.createElement('h3');
            cardEl.classList = 'card m-3';
            divEl.classList = 'card-body';
            hEl.textContent = 'No results found';
            divEl.append(hEl);
            cardEl.append(divEl);
            resultsDisplayEl.append(cardEl);
        }
    });
};

const displayResults = (results) => {
    const searchSpan = document.getElementById('search-key');
    resultsDisplayEl.innerHTML = '';
    searchSpan.textContent = searchInquiry[0];
    tabEl.append(searchInquiry[0]);
    searchVal.value = searchInquiry[0];
    formatVal.value = searchInquiry[1];
    if (results.length === 0) {
        const cardEl = document.createElement('div'),
            divEl = document.createElement('div'),
            hEl = document.createElement('h3');
        cardEl.classList = 'card m-3';
        divEl.classList = 'card-body';
        hEl.textContent = 'No results found';
        divEl.append(hEl);
        cardEl.append(divEl);
        resultsDisplayEl.append(cardEl);
    }
    for (const result of results) {
        const cardEl = document.createElement('div'),
            divEl = document.createElement('div'),
            hEl = document.createElement('h3'),
            datePEl = document.createElement('p'),
            subjectPEl = document.createElement('p'),
            descriptionPEl = document.createElement('p'),
            buttonEl = document.createElement('button');
        cardEl.classList = 'card m-3';
        divEl.classList = 'card-body';
        hEl.textContent = result.title;
        hEl.classList = 'card-title';
        if (result.date) {
            datePEl.innerHTML = `<strong>Date: </strong>${result.date.slice(0, 4)}`;
        } else {
            datePEl.innerHTML = '<strong>Date: </strong>No date for this entry';
        }
        if (result.subject) {
            subjectPEl.innerHTML = `<strong>Subjects: </strong>${result.subject.join(', ')}`;
        } else {
            subjectPEl.innerHTML = '<strong>Subjects: </strong>No subjects for this entry';
        }
        if (result.description) {
            descriptionPEl.innerHTML = `<strong>Description: </strong>${result.description}`;
        } else {
            descriptionPEl.innerHTML = '<strong>Description: </strong>No description for this entry';
        }
        buttonEl.innerHTML = 'Read More';
        buttonEl.classList = 'btn btn-dark';
        buttonEl.setAttribute('link', result.id);
        divEl.append(hEl, datePEl, subjectPEl, descriptionPEl, buttonEl);
        cardEl.append(divEl);
        resultsDisplayEl.append(cardEl);
    }
};

getSearchResults(searchInquiry[0], searchInquiry[1]);

formTwo.addEventListener('submit', function (event) {
    event.preventDefault();
    let searchInquiry = [searchVal.value, formatVal.value];
    localStorage.setItem('searchInquiry', JSON.stringify(searchInquiry));
    window.location.assign('results.html');
});

backBtn.addEventListener('click', function (event) {
    event.preventDefault();
    window.location.assign('search.html');
});

resultsDisplayEl.addEventListener('click', function (event) {
    if (event.target.classList.contains('btn')) {
        window.open(event.target.getAttribute('link'), 'blank');
    }
});
