const loadbutton = document.querySelector('.spinner');
const container = document.querySelector('.table');
const template = document.querySelector('#fetch-row');
const errorMessage = document.querySelector('.fetch__oops');
const btn = document.getElementById("get-table-btn");

(() => {
    const getNewIdentity = async () => {

        container.style.display = 'none !important';
        container.innerHTML = "";


        loadbutton.style.display = 'inherit';
        await new Promise(r => setTimeout(r, 2000));
        loadbutton.style.display = 'none';
        errorMessage.style.display = 'none';

        const complete = (Math.random() > 0.5);
        const url = 'https://jsonplaceholder.typicode.com/todos?completed=';
        try {
        const response = await fetch( url + complete);
        
        var data = await response.json();
        }
        catch(err) {
            console.log(err);
            errorMessage.style.display = 'inherit';
        }
        const header =  document.getElementById('header_template').content.cloneNode(true);
        container.appendChild(header);
        
        for (let i = 0; i < data.length; i++) {
            const clone = template.content.cloneNode(true);
            const userId = clone.querySelector('.table__row__userId');
            const todoId = clone.querySelector('.table__row__todoId');
            const title = clone.querySelector('.table__row__title');
            const completed = clone.querySelector('.table__row__completed');
            
            userId.innerHTML = data[i]['userId'];
            todoId.innerHTML = data[i]['id'];
            title.innerHTML = data[i]['title'];
            completed.innerHTML = data[i]['completed'];

            container.appendChild(clone);
        }
    
      

    };
    btn.onclick = getNewIdentity;
})();

