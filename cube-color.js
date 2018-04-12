import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

class CubeColor extends PolymerElement {
  static get is() {return 'cube-color'}

  static get template() { return html``}

  static get properties()
  {
    return {
      theme: {type: String},
      grade: {type: Number},
      out:   {type: String, notify: true}
    }
  }

  static get observers()
  {
    return [
      '_computeColor(theme, grade)'
    ]
  }

  _computeColor(theme, grade)
  {
    let self = this;
    this.out = '';
    import('./styles/' + this.theme + '.js')
      .then(
        module => {
          let style = self.querySelector('style');
          if(!style)
          {
            style = document.createElement('style');
            self.root.appendChild(style);
          }
          style.innerHTML = module.default;

          self.out = getComputedStyle(self).getPropertyValue('--' + theme + '-' + grade + '-color');
        }
      );
  }
}

customElements.define(CubeColor.is, CubeColor);