import { Injectable, TemplateRef } from "@angular/core";


@Injectable({ providedIn: 'root' })

export class ToastService{
  toasts: any[] = [];

  public showStandard(msj: string) {
    this.show(msj, {
      classname: 'bg-primary text-white border-0',
      delay: 4000,
      autohide: true,
      headertext: 'Toast Header'
    });
  }

  public showSuccess(msj: string) {
    this.show(msj, {
      classname: 'bg-success text-light',
      delay: 4000
    });
  }

  public showWarning(msj: string) {
    this.show(msj, {
      classname: 'bg-warning text-light',
      delay: 4000
    });
  }

  public showDanger(dangerTpl) {
    this.show(dangerTpl, {
      classname: 'bg-danger text-light',
      delay: 4000
    });
  }

  private show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  public remove(toast) {
    this.toasts = this.toasts.filter(t => t != toast);
  }

}