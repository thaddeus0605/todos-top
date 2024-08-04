import { Project } from "../models/Project";
import { Todo } from "../models/Todo";
import { ProjectView } from "../Views/ProjectVIew";

export class AppController {
    constructor() {
        this.projects = [new Project('Default')];
        this.currentProject = this.projects[0];
        this.view = new ProjectView();

        this.view.setProjectClickHandler(this.switchProject.bind(this));
        this.view.setAddProjectHandler(this.addProject.bind(this));

        this.view.renderProjects(this.projects);
        this.view.setCurrentProjectName(this.currentProject.name);
        
    }

    createProject(name) {
        const newProject = new Project(name);
        this.projects.push(newProject);
        this.view.renderProjects(this.projects);
    }


    addProject(name) {
        this.createProject(name);
        
    }
    
    switchProject(project) {
        this.currentProject = project;
        this.view.setCurrentProjectName(this.currentProject.name);
    }
}