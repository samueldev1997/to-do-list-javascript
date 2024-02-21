const inputTask = document.getElementById('input-new-task');
const ulElement = document.getElementById('to-do-list');
const tarefas = JSON.parse(localStorage.getItem('to-do-list') || '[]');

function validateIfExistNewTask(){
    let inputValue = inputTask.value;
    for (let i = 0; i < tarefas.length; i++) {
        if (tarefas[i] === inputValue) {
            return true; 
        }
    }
    return false;
}


function renderTarefa(){
    ulElement.innerHTML = '';
    tarefas.map((item) => {
        let liElement = document.createElement('li');
        let textLi = document.createTextNode(item);
        liElement.appendChild(textLi);

        let position = tarefas.indexOf(item);

        let btnRemove = document.createElement('button');
        btnRemove.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" 
                    width="16" height="16" fill="currentColor" 
                    class="bi bi-check-lg" viewBox="0 0 16 16">
            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88
            12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0
            1 1.047 0l3.052 3.093 5.4-6.425z"/>
        </svg>`;
        btnRemove.classList.add('btn-remove');
        btnRemove.onclick = function() {
            removeItem(position);
        }

        liElement.appendChild(btnRemove);
        ulElement.appendChild(liElement);
    })
}
renderTarefa();

function newTask(){
    inputTask.style.border = '';
    
    if(inputTask.value === ''){
        inputTask.style.border = '1px solid red'
        alert('Digite algo para inserir em sua lista');
        return;
    } 

    if(validateIfExistNewTask()){
        alert('Já existe uma task com essa descrição');
        return;
    } 

    const inputValue = inputTask.value;
    tarefas.push(inputValue);
    inputTask.value = '';
    
    renderTarefa();
    salvarDados();
}

function removeItem(position){
    tarefas.splice(position, 1);
    renderTarefa();
    salvarDados();
}

function salvarDados(){
    localStorage.setItem('to-do-list', JSON.stringify(tarefas));
}
