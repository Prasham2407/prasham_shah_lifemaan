export interface ModuleGrant {
  moduleName: string;
  allowedActions: string[];
}

export interface GrantResponse {
  [key: string]: string[]; // moduleName -> allowedActions
} 