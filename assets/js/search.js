// Create a list of items that required a different url format
const mainForm = document.getElementById('form-main'),
    searchVal = document.getElementById('search'),
    formatVal = document.getElementById('dropdown');

mainForm.addEventListener('submit', function (event) {
    event.preventDefault();
    let searchInquiry = [searchVal.value, formatVal.value];
    localStorage.setItem('searchInquiry', JSON.stringify(searchInquiry));
    window.location.assign('results.html');
});
