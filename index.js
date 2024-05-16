const findCombinations = async (numbers, target, index = 0, current = []) => {
    const sumCurrent = current.reduce((acc, val) => acc + val, 0);
    if (sumCurrent === target) {
        return [current];
    }
    if (index >= numbers.length || sumCurrent > target) return [];
    const withCurrentNumber = await findCombinations(numbers, target, index + 1, [...current, numbers[index]]);
    const withoutCurrentNumber = await findCombinations(numbers, target, index + 1, current);
    return [...withCurrentNumber, ...withoutCurrentNumber];
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
const num = document.getElementById('elementi');
const invia = document.getElementById('submit');
const cerca = document.getElementById('cerca');
invia.onclick = async () => {
    const target = parseInt(cerca.value, 10);
    if (!isNaN(target)) {
        if (num.value === "") {
            alert("Inserisci il numero di elementi")
            return
        }
        const numbers = generateRandomArray(num.value);
        renderTable(numbers);
        const combinations = await findCombinations(numbers, target);
        content.classList.remove('d-none');
        renderAccordion(combinations, document.getElementById('tableContainer'));
    }
}

