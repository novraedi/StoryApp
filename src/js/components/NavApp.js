import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class NavApp extends LitWithoutShadowDom {
  static properties = {
    brandName: { type: String, reflect: true },
  };

  constructor() {
    super();
    this._checkAvailabilityProperty();
  }

  _checkAvailabilityProperty() {
    if (!this.hasAttribute('brandName')) {
      throw new Error(`Attribut "brandName" harus diterapkan pada elemen ${this.localname}`);
    }
  }

  render() {
    return html`
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">${this.brandName}</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse d-lg-flex justify-content-end" id="navbarSupportedContent">
          <nav-links class="d-lg-flex"></nav-links>
          </div>
        </div>
      </nav>
    `;
  }
}

customElements.define('nav-app', NavApp);
