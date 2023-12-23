/* eslint-disable class-methods-use-this */
import { html } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class GuestText extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
    <h1 class="text-center d-none">${msg('Please log in first to explore many amazing stories :D')}</h1>`;
  }
}

customElements.define('guest-text', GuestText);
