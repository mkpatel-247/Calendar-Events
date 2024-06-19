import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { getLocalStorage } from '../common/function';
import { EVENT } from '../constant/keys.constant';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private render!: Renderer2;
  private body!: HTMLElement;
  constructor(private renderFactory: RendererFactory2) {
    this.render = renderFactory.createRenderer(null, null);
    this.body = this.render.selectRootElement('body', true); //Safe way to select body tag.
  }

  /**
   * Add Class at body tag.
   * @param className name of class that need to add.
   */
  addClassInBody(className: string) {
    this.render.addClass(this.body, className);
  }

  /**
   * Remove class from body tag.
   * @param className name of class that need to remove.
   */
  removeClassInBody(className: string) {
    this.render.removeClass(this.body, className);
  }
}
