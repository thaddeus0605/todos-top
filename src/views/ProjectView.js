export class ProjectView {
    constructor() {
        // Cache DOM elements for efficiency
        this.projectsContainer = document.querySelector('.projects-list-container');
        this.newProjectForm = document.querySelector('.project-form');
        this.todosContainer = document.querySelector('.project-container');
        this.addTaskBtn = document.querySelector('.add-task-btn');
        this.currentProjectName = document.getElementById('current-project-name');
        this.todoModal = document.getElementById('todoModal');
        this.todoForm = document.getElementById('todoForm');
        this.closeModalBtn = document.querySelector('.close');

        // Initialize event listeners
        this.addTaskBtn.addEventListener('click', () => this.showModal()); // Show modal on "Add Task" button click
        this.closeModalBtn.addEventListener('click', () => this.closeModal()); // Close modal on close button click
        window.addEventListener('click', (event) => { // Close modal if clicking outside the modal
            if (event.target === this.todoModal) {
                this.closeModal();
            }
        });
    }

    // Render the list of projects in the sidebar
    renderProjects(projects) {
        this.projectsContainer.innerHTML = ''; // Clear existing project list

        projects.forEach(project => {
            const projectElement = document.createElement('div'); // Create a new div for each project
            projectElement.classList.add('project-item');

            const projectNameElement = document.createElement('span'); // Create a span for the project name
            projectNameElement.innerText = project.name;
            projectElement.appendChild(projectNameElement); // Add the project name span to the project div

            const deleteButton = document.createElement('button'); // Create a delete button
            deleteButton.classList.add('delete-project-btn');
            deleteButton.innerText = 'X';
            deleteButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent the click event from bubbling up
                this.onProjectDelete(project); // Call the project delete handler
            });

            projectElement.appendChild(deleteButton); // Add the delete button to the project div

            projectElement.addEventListener('click', () => {
                this.onProjectClick(project); // Call the project click handler
            });

            this.projectsContainer.appendChild(projectElement); // Add the project div to the projects container
        });
    }

    // Render the list of todos for the current project
    renderTodos(todos) {
        this.todosContainer.innerHTML = ''; // Clear existing todos

        todos.forEach(todo => {
            const todoCard = document.createElement('div'); // Create a new div for each todo
            todoCard.className = 'todo-card';
            this.todosContainer.appendChild(todoCard); // Add the todo card to the todos container

            const todoTitle = document.createElement('h2'); // Create an h2 element for the todo title
            todoTitle.innerText = todo.title;
            todoCard.appendChild(todoTitle); // Add the todo title to the todo card

            const deleteButton = document.createElement('button'); // Create a delete button for the todo
            deleteButton.classList.add('delete-todo-btn');
            deleteButton.innerText = 'X';
            deleteButton.addEventListener('click', () => {
                this.onTodoDelete(todo); // Call the todo delete handler
            });

            todoCard.appendChild(deleteButton); // Add the delete button to the todo card
        });
    }

    // Set up handler for adding a new project
    setAddProjectHandler(handler) {
        this.newProjectForm.addEventListener('submit', event => {
            event.preventDefault(); // Prevent form submission and page reload
            const projectName = document.getElementById('project-name').value; // Get the project name from the form
            handler(projectName); // Call the provided handler function with the project name
            document.getElementById('project-name').value = ''; // Clear the project name input field
        });
    }

    // Set up handler for adding a new todo
    setAddTodoHandler(handler) {
        this.todoForm.addEventListener('submit', event => {
            event.preventDefault(); // Prevent form submission and page reload
            const formData = new FormData(this.todoForm); // Extract form data

            // Create a todoData object from the form data
            const todoData = {
                title: formData.get('title'),
                description: formData.get('description'),
                dueDate: formData.get('dueDate'),
                priority: formData.get('priority')
            };

            handler(todoData); // Call the provided handler function with the todoData
            this.closeModal(); // Close the modal
            this.todoForm.reset(); // Reset the form fields
        });
    }

    // Set up handler for deleting a todo
    setTodoDeleteHandler(handler) {
        this.onTodoDelete = handler; // Assign the provided handler function to the onTodoDelete property
    }

    // Set up handler for clicking a project
    setProjectClickHandler(handler) {
        this.onProjectClick = handler; // Assign the provided handler function to the onProjectClick property
    }

    // Set up handler for deleting a project
    setProjectDeleteHandler(handler) {
        this.onProjectDelete = handler; // Assign the provided handler function to the onProjectDelete property
    }

    // Set the name of the current project in the view
    setCurrentProjectName(name) {
        this.currentProjectName.innerText = name; // Update the text of the current project name element
    }

    // Show the todo modal
    showModal() {
        this.todoModal.style.display = 'block'; // Set the modal's display to 'block' to make it visible
    }

    // Close the todo modal
    closeModal() {
        this.todoModal.style.display = 'none'; // Set the modal's display to 'none' to hide it
    }
}
