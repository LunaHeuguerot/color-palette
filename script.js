document.getElementById('generate').addEventListener('click', generatePalette);

function generatePalette() {
    const palette = document.getElementById('palette');
    palette.innerHTML = ''; 
    colors = [];

    for (let i = 0; i < 5; i++) {
        const color = getRandomColor();
        colors.push(color);
        const colorBox = createColorBox(color);
        palette.appendChild(colorBox);
    }

    document.body.style.background = `linear-gradient(to right, ${colors.join(', ')})`;
}

function createColorBox(color) {
    const colorBox = document.createElement('div');
    colorBox.classList.add('color-box');
    colorBox.style.backgroundColor = color;
    colorBox.textContent = color;
    colorBox.style.color = getContrastYIQ(color);

    // Crear botón de copiar
    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copy';
    copyButton.classList.add('copy-btn');

    copyButton.addEventListener('click', (event) => {
        event.stopPropagation(); 
        navigator.clipboard.writeText(color);
        copyButton.textContent = '✅';
        setTimeout(() => (copyButton.textContent = 'Copy'), 1000);
    });

    colorBox.appendChild(copyButton);

    return colorBox;
}



function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getContrastYIQ(hexcolor) {
    const r = parseInt(hexcolor.slice(1, 3), 16);
    const g = parseInt(hexcolor.slice(3, 5), 16);
    const b = parseInt(hexcolor.slice(5, 7), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return (yiq >= 128) ? 'black' : 'white';
}

