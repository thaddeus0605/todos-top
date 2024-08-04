export class ProjectView {
    constructor() {
        this.projectsContainer = document.querySelector('.projects-list-container');
        this.newProjectForm = document.querySelector('.project-form');
        this.todosContainer = document.querySelector('.project-container');
        this.addTaskBtn = document.querySelector('.add-task-btn');
        this.currentProjectName = document.getElementById('current-project-name');
    }


    renderProjects(projects) {
        this.projectsContainer.innerHTML = '';
        projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.innerText = project.name;
            projectElement.addEventListener('click', () => {
                this.onProjectClick(project);
            })
            this.projectsContainer.appendChild(projectElement);
        })
    }

    renderTodos(todos) {

    }

    setAddProjectHandler(handler) {
        this.newProjectForm.addEventListener('submit', event => {
            event.preventDefault();
            const projectName = document.getElementById('project-name').value;
            handler(projectName);
            document.getElementById('project-name').value = '';
        })
    }

    setProjectClickHandler(handler) {
        this.onProjectClick = handler;
    }

    setCurrentProjectName(name) {
        this.currentProjectName.innerText = name;
    }
}