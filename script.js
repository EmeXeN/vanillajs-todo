const todoSearchBar = document.querySelector('.todo-list__searchbar')
const todoAddBar = document.querySelector('.todo-list__addbar')
const todoItemsContainer = document.querySelector('.todo-list__items')

const refreshTodoItems = (todoObj) => {
    todoItemsContainer.textContent = ''
    todoObj.forEach((element) => {
        let insertElement = 
        `
        <div class="todo-list__item">
            <p class="todo-list__item__title">${element.todoTitle}</p>
            <a href="#" class="todo-list__item__icon">
                <i class="fa-solid fa-trash-can"></i>
            </a>
        </div>
        `
        todoItemsContainer.insertAdjacentHTML('afterbegin', insertElement)
    })
}

if (localStorage.getItem('todoList')) {
    try {
        this.todoItems = JSON.parse(localStorage.getItem('todoList'))
        refreshTodoItems(this.todoItems)
    } catch (e) {
        console.error(e)
    }
} else {
    this.todoItems = []
}

todoSearchBar.addEventListener('input',(e) => {
    const searchedTodoItems = this.todoItems.filter(filteredElement => filteredElement.todoTitle.includes(e.target.value))
    refreshTodoItems(searchedTodoItems)
})

todoAddBar.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.target.value.length > 0 && !this.todoItems.find(evt => evt.todoTitle == e.target.value)) {
        let todoItem = 
            `
            <div class="todo-list__item">
                <p class="todo-list__item__title">${e.target.value}</p>
                    <a href="#" class="todo-list__item__icon">
                        <i class="fa-solid fa-trash-can"></i>
                    </a>
            </div>
            `
        this.todoItems.push({todoTitle: e.target.value})
        localStorage.setItem('todoList', JSON.stringify(this.todoItems))
        todoItemsContainer.insertAdjacentHTML('afterbegin', todoItem)
        e.target.value = ''
    }
})

todoItemsContainer.addEventListener('click', (e) => {
    if(e.target.className.includes('fa-trash-can')) {
        let parentDiv = e.target.parentElement.parentElement
        let parentDivText = parentDiv.textContent.replace(/\s/g, '')
        let filtered = this.todoItems.filter(evt => {
            return evt.todoTitle.replace(/\s/g, '') !== parentDivText
        })
        this.todoItems = filtered
        localStorage.setItem('todoList', JSON.stringify(this.todoItems))
        parentDiv.remove()
    }
})