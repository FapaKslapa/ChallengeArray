const findCombinations = (numbers, target, index = 0, current = [], combinations = [], uniqueCombinations = new Set()) => {
    const sommaCorrente = current.reduce((acc, val) => acc + val, 0);
    if (sommaCorrente === target) {
        const combinationKey = current.sort((a, b) => a - b).join(',');
        if (!uniqueCombinations.has(combinationKey)) {
            combinations.push([...current]);
            uniqueCombinations.add(combinationKey);
        }
        return;
    }
    if (index >= numbers.length || sommaCorrente > target) return;
    findCombinations(numbers, target, index + 1, [...current, numbers[index]], combinations, uniqueCombinations);
    findCombinations(numbers, target, index + 1, current, combinations, uniqueCombinations);
}

const renderAccordion = (data, div) => {
    let accordionHTML = '<div class="accordion" id="dataAccordion">';
    data.forEach((row, index) => {
        accordionHTML += `
            <div class="accordion-item">
                <h2 class="accordion-header" id="heading${index}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                        Index ${index}
                    </button>
                </h2>
                <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#dataAccordion">
                    <div class="accordion-body">
                        ${row.join(', ')}
                    </div>
                </div>
            </div>
        `;
    });
    accordionHTML += '</div>';
    div.innerHTML = accordionHTML;
}

const generateRandomArray = (n) => {
    const randomNumbers = [];
    for (let i = 0; i < n; i++) {
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        randomNumbers.push(randomNumber);
    }
    return randomNumbers;
}

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const renderTable = (numbers) => {
    let tableHTML = '<div class="table-responsive"><table class="table"><tbody><tr>';
    numbers.forEach((number, index) => {
        tableHTML += `<td>${number}</td>`;
    });
    tableHTML += '</tr></tbody></table></div>';
    document.getElementById('arrayContainer').innerHTML = tableHTML;
}
const content = document.getElementById('content');
document.getElementById("cerca").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const target = parseInt(this.value, 10);
        if (!isNaN(target)) {
            const combinations = [];
            n = getRandomInt(1, 50);
            numbers = generateRandomArray(n);
            renderTable(numbers);
            findCombinations(numbers, target, 0, [], combinations);
            content.classList.remove('d-none');
            renderAccordion(combinations, document.getElementById('tableContainer'));
        }
    }
});

