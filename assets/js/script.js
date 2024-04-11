const myForm = document.getElementById("myform");
myForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const searchTerm = document.getElementById('mysearch');
    const selectTerm = document.getElementById('mydropdown');
    console.log(`the values you have provided are ${searchTerm.value} and ${selectTerm.value}`);

    const apiUrl = `https://ww.loc.gov`
}
)