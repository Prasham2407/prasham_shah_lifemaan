import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-project-edit',
  template: `
    <div class="container">
      <h1>{{ isNewProject ? 'Create New Project' : 'Edit Project' }}</h1>
      
      <form (ngSubmit)="saveProject()" #projectForm="ngForm">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Project Name</mat-label>
          <input matInput [(ngModel)]="project.name" name="name" required>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Description</mat-label>
          <textarea matInput [(ngModel)]="project.description" name="description" rows="4" required></textarea>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Status</mat-label>
          <mat-select [(ngModel)]="project.status" name="status" required>
            <mat-option value="Planning">Planning</mat-option>
            <mat-option value="In Progress">In Progress</mat-option>
            <mat-option value="Completed">Completed</mat-option>
            <mat-option value="On Hold">On Hold</mat-option>
          </mat-select>
        </mat-form-field>

        <div class="actions">
          <button mat-button type="button" (click)="cancel()">Cancel</button>
          <button *appGrant="'Projects'; action: isNewProject ? grants['create']: grants['update']" mat-raised-button color="primary" type="submit" [disabled]="!projectForm.form.valid">
            {{ isNewProject ? 'Create' : 'Save' }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    .full-width {
      width: 100%;
      margin-bottom: 20px;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 16px;
      margin-top: 20px;
    }
  `]
})
export class ProjectEditComponent implements OnInit {
  project: Project = {
    id: 0,
    name: '',
    description: '',
    status: 'Planning',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  isNewProject = true;
  grants: {[key: string]: string} = {
    create: 'Projects.CreateProjects',
    update: 'Projects.UpdateProjects'
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.isNewProject = false;
      const storedProjects = localStorage.getItem('projects');
      if (storedProjects) {
        const projects = JSON.parse(storedProjects);
        const project = projects.find((p: Project) => p.id === +id);
        if (project) {
          this.project = {
            ...project,
            createdAt: new Date(project.createdAt),
            updatedAt: new Date(project.updatedAt)
          };
        }
      }
    }
  }

  saveProject() {
    const storedProjects = localStorage.getItem('projects');
    let projects: Project[] = [];
    
    if (storedProjects) {
      projects = JSON.parse(storedProjects);
    }

    if (this.isNewProject) {
      this.project.id = projects.length + 1;
      this.project.createdAt = new Date();
      this.project.updatedAt = new Date();
      projects.push(this.project);
    } else {
      const index = projects.findIndex(p => p.id === this.project.id);
      if (index !== -1) {
        this.project.updatedAt = new Date();
        projects[index] = this.project;
      }
    }

    localStorage.setItem('projects', JSON.stringify(projects));
    this.router.navigate(['/projects']);
  }

  cancel() {
    this.router.navigate(['/projects']);
  }
} 