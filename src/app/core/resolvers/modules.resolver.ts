import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ModuleService } from '../services/module.service';

@Injectable({
  providedIn: 'root'
})
export class ModulesResolver implements Resolve<string[]> {
  constructor(private moduleService: ModuleService) {}

  resolve(): Observable<string[]> {
    return this.moduleService.getAvailableModules();
  }
}