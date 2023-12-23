import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class NavLink extends LitWithoutShadowDom {
  static properties = {
    content: { type: String, reflect: true },
    to: { type: String, reflect: true },
  };

  constructor() {
    super();
    this._checkAvailAbilityProperty();
  }

  _checkAvailAbilityProperty() {
    if (!this.hasAttribute('to')) {
      throw new Error(`Attribute "to" harus diterapkan pada elemen ${this.localName}`);
    }
  }

  render() {
    return html`
      <li class="nav-item">
        <a class="nav-link" href="${this.to}">${this.content}</a>
      </li>
    `;
  }
}

customElements.define('nav-link', NavLink);
