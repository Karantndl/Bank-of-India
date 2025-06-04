
const selectFields = document.getElementById('selectFields');
const selectedText = document.getElementById('selectedText');
const options = document.getElementsByClassName('options');
const list = document.getElementById('list');
const mortage_main = document.getElementById('mortage_main');

selectFields.onclick = function(){
    list.classList.toggle('hide');

    if (!list.classList.contains('hide')) {
        mortage_main.style.display = "none"; // Hide the radio buttons when showing dropdown
    } else {
        mortage_main.style.display = "block"; // Show the radio buttons if dropdown is closed
    }

}

for (option of options) {
    option.onclick = function () {
        selectedText.innerHTML = this.textContent;
        list.classList.add('hide'); 
        mortage_main.style.display = "block";
    };
}

document.getElementById('start-btn').addEventListener('click', function () {
    window.location.href = 'calcu-function.html';
});
