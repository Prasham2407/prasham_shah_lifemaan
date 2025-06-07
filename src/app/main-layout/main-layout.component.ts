import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import MainLayoutResolver, { MainLayoutData } from '../core/resolvers/main-layout.resolver';

@Component({
  selector: 'app-main-layout',
  template: `
    <mat-sidenav-container class="main-layout">
      <mat-sidenav #sidenav mode="side" opened class="sidebar">
        <mat-toolbar color="primary">Dashboard</mat-toolbar>
        <mat-nav-list>
          <a mat-list-item *ngFor="let module of modules" 
             [routerLink]="['/', module.toLowerCase()]"
             routerLinkActive="active">
            <span matListItemTitle>{{ module }}</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content class="content">
        <mat-toolbar color="primary">
          <button mat-icon-button (click)="sidenav.toggle()">
            <mat-icon>menu</mat-icon>
          </button>
          <span>LifeMaan</span>
        </mat-toolbar>
        <div class="content-wrapper">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .main-layout {
      height: 100vh;
      display: flex;
    }
    .sidebar {
      width: 250px;
      background-color: #fafafa;
    }
    .content {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .content-wrapper {
      padding: 20px;
      flex: 1;
      overflow: auto;
    }
    .active {
      background-color: rgba(0, 0, 0, 0.04);
    }
    mat-toolbar {
      position: sticky;
      top: 0;
      z-index: 1;
    }
  `]
})
export class MainLayoutComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  modules: string[] = [];
  moduleActions: { [key: string]: string[] } = {};

  private readonly moduleIcons: { [key: string]: string } = {
    Reports: 'assessment',
    Files: 'folder',
    Users: 'people',
    Projects: 'work',
    Settings: 'settings',
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    console.log('MainLayoutComponent: Constructor called');
  }

  ngOnInit() {
    console.log('MainLayoutComponent: ngOnInit called');
    this.route.data.subscribe({
      next: (data) => {
        console.log('MainLayoutComponent: Received route data:', data);
        const layoutData = data['layoutData'] as MainLayoutData;
        this.modules = layoutData.modules;
        this.moduleActions = layoutData.moduleActions;
        
        console.log('MainLayoutComponent: Updated modules:', this.modules);
        console.log('MainLayoutComponent: Updated moduleActions:', this.moduleActions);
        
        if (this.modules.length === 0) {
          console.warn('MainLayoutComponent: No modules available for the current user');
        }
      },
      error: (error) => {
        console.error('MainLayoutComponent: Error receiving route data:', error);
      }
    });
  }

  ngAfterViewInit() {
    console.log('MainLayoutComponent: ngAfterViewInit called');
    this.sidenav.open();
  }

  getModuleIcon(moduleName: string): string {
    return this.moduleIcons[moduleName] || 'extension';
  }

  hasAction(moduleName: string, action: string): boolean {
    return this.moduleActions[moduleName]?.includes(action) ?? false;
  }
} 