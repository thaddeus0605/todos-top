import { Project } from "../models/Project"; // Importing the Project class from the Project model
import { Todo } from "../models/Todo"; // Importing the Todo class from the Todo model

export class AppController {
    // Constructor to initialize the controller
    constructor(view) {
        this.view = view; // Set the view instance
        this.projects = this.loadProjects(); // Load projects from local storage and initialize the projects array
        this.currentProject = this.projects.length > 0 ? this.projects[0] : null; // Set the first project as the current project if any projects exist, otherwise set to null

        this.initializeView(); // Set up event handlers and initial rendering
        this.renderCurrentProject(); // Render the current project details
    }

    // Method to initialize view event handlers
    initializeView() {
        this.view.setProjectClickHandler(this.switchProject.bind(this)); // Bind the switchProject method to the view's project click handler
        this.view.setAddProjectHandler(this.addProject.bind(this)); // Bind the addProject method to the view's add project handler
        this.view.setAddTodoHandler(this.addTodo.bind(this)); // Bind the addTodo method to the view's add todo handler
        this.view.setProjectDeleteHandler(this.deleteProject.bind(this)); // Bind the deleteProject method to the view's delete project handler
        this.view.setTodoDeleteHandler(this.deleteTodoFromCurrentProject.bind(this)); // Bind the deleteTodoFromCurrentProject method to the view's delete todo handler
        this.view.renderProjects(this.projects); // Render the list of projects in the view
    }

    // Method to render the details of the current project
    renderCurrentProject() {
        if (this.currentProject) {
            this.view.setCurrentProjectName(this.currentProject.name); // Set the name of the current project in the view
            this.view.renderTodos(this.currentProject.getTodos()); // Render todos of the current project in the view
        } else {
            this.view.setCurrentProjectName('No Project Selected'); // Indicate that no project is selected
            this.view.renderTodos([]); // Render an empty list of todos
        }
    }

    // Method to add a new project
    addProject(projectName) {
        if (projectName.trim() === '') return; // Prevent creating projects with empty names

        const newProject = new Project(projectName); // Create a new Project instance with the given name
        this.projects.push(newProject); // Add the new project to the projects array
        this.saveProjects(); // Save the updated projects list to local storage
        this.updateView(); // Update the project list in the view
        this.switchProject(newProject); // Switch to the newly added project
    }

    // Method to add a todo to the current project
    addTodoToCurrentProject(todo) {
        if (this.currentProject) { // Check if there is a current project
            this.currentProject.addTodo(todo); // Add the todo to the current project
            this.saveProjects(); // Save the updated projects list to local storage
            this.view.renderTodos(this.currentProject.getTodos()); // Update the todos list in the view
        }
    }

    // Method to delete a todo from the current project
    deleteTodoFromCurrentProject(todo) {
        if (this.currentProject) { // Check if there is a current project
            this.currentProject.deleteTodo(todo); // Delete the todo from the current project
            this.saveProjects(); // Save the updated projects list to local storage
            this.view.renderTodos(this.currentProject.getTodos()); // Update the todos list in the view
        }
    }

    // Method to add a new todo with detailed data
    addTodo(todoData) {
        const { title, description, dueDate, priority } = todoData; // Destructure the todo data

        const newTodo = new Todo(title, description, new Date(dueDate), priority); // Create a new Todo instance with the provided data

        this.addTodoToCurrentProject(newTodo); // Add the new todo to the current project
    }

    // Method to switch the current project
    switchProject(project) {
        this.currentProject = project; // Update the current project to the selected project
        this.renderCurrentProject(); // Render the current project details
    }

    // Method to delete a project
    deleteProject(project) {
        const index = this.projects.indexOf(project); // Find the index of the project to delete
        if (index > -1) {
            this.projects.splice(index, 1); // Remove the project from the projects array
            this.saveProjects(); // Save the updated projects list to local storage
            this.updateView(); // Update the project list in the view

            if (this.currentProject === project) { // Check if the deleted project was the current project
                this.currentProject = null; // Clear the current project
                this.renderCurrentProject(); // Render the updated view with no project selected
            }
        } else {
            console.error('Project not found in the list'); // Log an error if the project was not found
        }
    }

    // Method to delete a todo by its index from the current project
    deleteTodo(todo) {
        const todos = this.currentProject.getTodos(); // Get the list of todos from the current project
        const index = todos.indexOf(todo); // Find the index of the todo to delete
        if (index > -1) {
            this.currentProject.removeTodoAtIndex(index); // Remove the todo at the specified index
            this.view.renderTodos(todos); // Update the todos list in the view
        }
    }

    // Method to update the view with the latest projects
    updateView() {
        this.view.renderProjects(this.projects); // Render the list of projects in the view
    }

    // Method to save the projects list to local storage
    saveProjects() {
        localStorage.setItem('projects', JSON.stringify(this.projects)); // Convert the projects array to a JSON string and save it to local storage
    }

    // Method to load projects from local storage
    loadProjects() {
        const projectsData = localStorage.getItem('projects'); // Retrieve the JSON string of projects from local storage
        if (!projectsData) return []; // Return an empty array if no projects data is found

        // Parse the JSON string and convert it into Project instances
        return JSON.parse(projectsData).map(projectData => {
            const project = new Project(projectData.name); // Create a Project instance with the name
            project.todos = projectData.todos.map(todoData => 
                new Todo( // Create Todo instances for each todo in the project
                    todoData.title,
                    todoData.description,
                    new Date(todoData.dueDate),
                    todoData.priority
                )
            );
            return project; // Return the project with todos
        });
    }
}
