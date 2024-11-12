// Lista de números almacenados para verificar duplicados
const storedNumbers = new Set();

// Función para agregar un número a la lista
function addNumber() {
    const input = document.getElementById('inputNumber');
    const number = input.value.trim();
    const list = document.getElementById('numberList');
    let listItem = document.createElement('li');
    
    if (!validateNumber(number)) {
        listItem.textContent = `${number} - Error en el número`;
        listItem.className = 'error';
    } else if (storedNumbers.has(number)) {
        listItem.textContent = `${number} - Duplicado`;
        listItem.className = 'duplicate';
    } else {
        storedNumbers.add(number);
        listItem.textContent = `${number} - Guardado`;
        listItem.className = 'valid';
    }

    list.appendChild(listItem);
    input.value = '';
}

// Función para validar el número (ejemplo simple de validación)
function validateNumber(number) {
    // Verifica si el número tiene 10 dígitos
    return /^\d{10}$/.test(number);
}
