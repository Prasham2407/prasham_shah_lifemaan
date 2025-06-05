import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, ChangeDetectorRef } from '@angular/core';
import { AccessService } from '../services/access.service';

@Directive({
  selector: '[appGrant]'
})
export class GrantDirective implements OnInit {
  @Input('appGrant') module: string = '';
  @Input('appGrantAction') action: string = '';
  private hasAccess = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private accessService: AccessService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.accessService.getModulePermissions(this.module).subscribe(actions => {
      this.hasAccess = actions.includes(this.action);
      this.updateView();
      this.cdr.detectChanges();
    });
  }

  private updateView() {
    if (this.hasAccess) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
} 