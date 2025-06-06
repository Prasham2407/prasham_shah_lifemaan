import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-project-list',
  template: `
    <div class="container">
      <div class="header">
        <h1>Projects</h1>
        <button *appGrant="'Projects'; action: grants['create']" mat-raised-button color="primary" (click)="createProject()">
          <mat-icon>add</mat-icon>
          Create New Project
        </button>
      </div>

      <div class="projects-grid">
        <mat-card *ngFor="let project of projects" class="project-card">
          <mat-card-header>
            <mat-card-title>{{ project.name }}</mat-card-title>
            <mat-card-subtitle>{{ project.status }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>{{ project.description }}</p>
            <p class="date">Created: {{ project.createdAt | date }}</p>
            <p class="date">Last Updated: {{ project.updatedAt | date }}</p>
          </mat-card-content>
          <mat-card-actions>
            <button *appGrant="'Projects'; action: grants['view']" mat-icon-button color="primary" (click)="viewProject(project)" matTooltip="View Details">
              <mat-icon>visibility</mat-icon>
            </button>
            <button *appGrant="'Projects'; action: grants['update']" mat-icon-button color="primary" (click)="editProject(project)" matTooltip="Edit Project">
              <mat-icon>edit</mat-icon>
            </button>
            <button *appGrant="'Projects'; action: grants['delete']" mat-icon-button color="warn" (click)="deleteProject(project)" matTooltip="Delete Project">
              <mat-icon>delete</mat-icon>
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }
    .project-card {
      height: 100%;
    }
    .date {
      color: #666;
      font-size: 0.9em;
      margin: 4px 0;
    }
    mat-card-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
  `]
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  grants: {[key: string]: string} = {
    create: 'Projects.GetProjects',
    update: 'Projects.UpdateProjects',
    delete: 'Projects.DeleteProjects',
    view: 'Projects.GetProjects'
  }

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
      const projects = JSON.parse(storedProjects);
      this.projects = projects.map((project: any) => ({
        ...project,
        createdAt: new Date(project.createdAt),
        updatedAt: new Date(project.updatedAt)
      }));
    } else {
      // Initialize with mock data
      this.projects = [
        {
          id: 1,
          name: 'Website Redesign',
          description: 'Complete overhaul of the company website with modern design and improved user experience',
          status: 'In Progress',
          createdAt: new Date('2024-01-15'),
          updatedAt: new Date('2024-01-20')
        },
        {
          id: 2,
          name: 'Mobile App Development',
          description: 'Development of a new mobile application for iOS and Android platforms',
          status: 'Planning',
          createdAt: new Date('2024-01-10'),
          updatedAt: new Date('2024-01-10')
        },
        {
          id: 3,
          name: 'Database Migration',
          description: 'Migration of legacy database to new cloud-based solution',
          status: 'Completed',
          createdAt: new Date('2024-01-05'),
          updatedAt: new Date('2024-01-18')
        }
      ];
      localStorage.setItem('projects', JSON.stringify(this.projects));
    }
  }

  createProject() {
    this.router.navigate(['/projects/new']);
  }

  viewProject(project: Project) {
    this.router.navigate(['/projects', project.id]);
  }

  editProject(project: Project) {
    this.router.navigate(['/projects', project.id, 'edit']);
  }

  deleteProject(project: Project) {
    if (confirm(`Are you sure you want to delete ${project.name}?`)) {
      const storedProjects = localStorage.getItem('projects');
      if (storedProjects) {
        const projects = JSON.parse(storedProjects);
        const updatedProjects = projects.filter((p: Project) => p.id !== project.id);
        localStorage.setItem('projects', JSON.stringify(updatedProjects));
        this.loadProjects();
      }
    }
  }
} 