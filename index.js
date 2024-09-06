const inputColor = document.getElementById('input-color')
const colorBtn = document.getElementById('color-btn')
const main = document.getElementsByTagName('main')
const colorSelect = document.getElementById('color-select')
const colors = document.querySelector('.colors')

let colorsArr = [];

colorBtn.addEventListener('click', () => {
    const color = inputColor.value.slice(1, 7)
    const option = colorSelect.value
    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${option}`)
        .then(res => res.json())
        .then(data => {
            const dataColors = data.colors.map(color => color.hex.value)
            colorsArr = dataColors
            renderData(colorsArr)
        })
})

const renderData = (data) => {
    const html = data.map(color => `
        <div class="color-grid">
            <div class="color" onclick="getColor('${color}')"></div>
            <div class="color-name">${color}</div>
        </div>`
    ).join('')
    
    colors.innerHTML = html

    document.querySelectorAll('.color').forEach((element, index) => {
        element.style.backgroundColor = data[index]
    })
}

 function getColor(colorValue) {
    navigator.clipboard.writeText(colorValue);
    alert("Copied the Hex Code " + colorValue);
 }