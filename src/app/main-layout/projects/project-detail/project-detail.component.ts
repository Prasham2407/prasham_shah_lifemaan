import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccessService } from '../../../core/services/access.service';

interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-project-detail',
  template: `
    <div class="container">
      <div class="header">
        <h1>Project Details</h1>
        <div class="actions">
          <button *appGrant="'Projects'; action: grants['update']" mat-raised-button color="primary" (click)="editProject()">
            <mat-icon>edit</mat-icon>
            Edit Project
          </button>
          <button mat-button (click)="goBack()">
            <mat-icon>arrow_back</mat-icon>
            Back to List
          </button>
        </div>
      </div>

      <mat-card class="detail-card">
        <mat-card-content>
          <div class="detail-section">
            <h2>Basic Information</h2>
            <div class="detail-row">
              <span class="label">Project Name:</span>
              <span class="value">{{ project.name }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Status:</span>
              <span class="value status-badge" [ngClass]="project.status.toLowerCase().replace(' ', '-')">
                {{ project.status }}
              </span>
            </div>
          </div>

          <div class="detail-section">
            <h2>Description</h2>
            <p class="description">{{ project.description }}</p>
          </div>

          <div class="detail-section">
            <h2>Timeline</h2>
            <div class="detail-row">
              <span class="label">Created:</span>
              <span class="value">{{ project.createdAt | date:'medium' }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Last Updated:</span>
              <span class="value">{{ project.updatedAt | date:'medium' }}</span>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .actions {
      display: flex;
      gap: 16px;
    }
    .detail-card {
      margin-bottom: 20px;
    }
    .detail-section {
      margin-bottom: 24px;
    }
    .detail-section h2 {
      color: #333;
      margin-bottom: 16px;
      font-size: 1.2em;
    }
    .detail-row {
      display: flex;
      margin-bottom: 12px;
      align-items: center;
    }
    .label {
      font-weight: 500;
      width: 120px;
      color: #666;
    }
    .value {
      flex: 1;
    }
    .description {
      line-height: 1.6;
      color: #444;
    }
    .status-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 0.9em;
      font-weight: 500;
    }
    .planning {
      background-color: #e3f2fd;
      color: #1976d2;
    }
    .in-progress {
      background-color: #fff3e0;
      color: #f57c00;
    }
    .completed {
      background-color: #e8f5e9;
      color: #388e3c;
    }
    .on-hold {
      background-color: #fce4ec;
      color: #c2185b;
    }
  `]
})
export class ProjectDetailComponent implements OnInit {
  project: Project = {
    id: 0,
    name: '',
    description: '',
    status: 'Planning',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  // hasEditAccess = false;
  grants: {[key: string]: string} = {
    update: 'Projects.UpdateProjects'
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
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
        } else {
          this.router.navigate(['/projects']);
        }
      }
    }
  }

  editProject() {
    this.router.navigate(['/projects', this.project.id, 'edit']);
  }

  goBack() {
    this.router.navigate(['/projects']);
  }
} 