import { Project } from "../models/Project";
import { Todo } from "../models/Todo";
import { ProjectView } from "../Views/ProjectVIew";

export class AppController {
    constructor() {
        this.projects = [new Project('Default')];
        this.view = new ProjectView();


        this.view.setAddProjectHandler(this.addProject.bind(this));

        this.view.renderProjects(this.projects);
        
    }

    createProject(name) {
        const newProject = new Project(name);
        this.projects.push(newProject);
        this.view.renderProjects(this.projects);
    }


    addProject(name) {
        this.createProject(name);
    }
}