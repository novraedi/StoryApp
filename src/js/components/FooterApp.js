/* eslint-disable class-methods-use-this */
import { LitElement, html, css } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class FooterApp extends LitElement {
  static styles = css`
    :host{
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    p{
        color: white;
        text-align: center;
    }
    `;

  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
        <locale-picker></locale-picker>
        <p>${msg('Made by someone')}</p>
        `;
  }
}

customElements.define('footer-app', FooterApp);
