const header = document.querySelector('header');
document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);

function createGrid(rows, cols) {
    const main = document.querySelector('main');
    main.innerHTML = ''; // 清空原有内容
    
    const list = document.createElement('ol');
    list.classList.add('list');
    
    for (let i = 0; i < rows; i++) {
        const row = document.createElement('li');
        const line = document.createElement('ol');
        line.classList.add('line');
        
        for (let j = 0; j < cols; j++) {
            const block = document.createElement('li');
            block.classList.add('block');
            block.id = `block-${i}-${j}`;
            line.appendChild(block);
        }
        
        row.appendChild(line);
        list.appendChild(row);
    }
    
    main.appendChild(list);
}

