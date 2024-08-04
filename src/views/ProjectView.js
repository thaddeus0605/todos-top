export class ProjectView {
    constructor() {
        this.projectsContainer = document.querySelector('.projects-list-container');
        this.newProjectForm = document.querySelector('.project-form');
    }


    renderProjects(projects) {
        this.projectsContainer.innerHTML = '';
        projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.innerText = project.name;
            this.projectsContainer.appendChild(projectElement);
        })
    }


    setAddProjectHandler(handler) {
        this.newProjectForm.addEventListener('submit', event => {
            event.preventDefault();
            const projectName = document.getElementById('project-name').value;
            handler(projectName);
            projectName.value = '';
        })
    }
}