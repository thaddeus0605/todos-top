import './style.css';
import { AppController } from './controller/AppController';
import { ProjectView } from './Views/ProjectVIew';




document.addEventListener('DOMContentLoaded', () => {
    const view = new ProjectView();
    const app = new AppController(view);
})