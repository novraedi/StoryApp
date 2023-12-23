/* eslint-disable no-return-assign */
import { html, nothing } from 'lit';
import LitWithoutShadowDom from '../base/LitWithoutShadowDom';

class InputGroupWithValidation extends LitWithoutShadowDom {
  static properties = {
    type: { type: String, reflect: true },
    value: { type: String, reflect: true },
    InputId: { type: String, reflect: true },

    inputGroupText: { type: String, reflect: true },
    inputGroupIcon: { type: String, reflect: true },
    inputGroupIcon2: { type: String, reflect: true },

    validFeedbackMessage: { type: String, reflect: true },
    invalidFeedbackMessage: { type: String, reflect: true },

    required: { type: Boolean, reflect: true },
    toggleSwitch: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    this._checkAvailabilityProperty();
    this.toggleSwitch = true;
  }

  _checkAvailabilityProperty() {
    if (!this.hasAttribute('type')) {
      throw new Error(`Atribut "type" harus diterapkan pada elemen ${this.localName}`);
    }

    if (!(this.hasAttribute('inputGroupText') || this.hasAttribute('inputGroupIcon'))) {
      throw new Error(
        `Salah satu dari atribut harus diterapkan pada elemen ${this.localName}: inputGroupText dan inputGroupIcon`,
      );
    }
  }

  render() {
    return html`
            <div class="input-group has-validation">
                <input 
                class="form-control" 
                id=${this.InputId || nothing} 
                type=${this.type}
                value=${this.value || nothing}
                ?required=${this.required}
                @input=${(e) => this.value = e.target.value}
                >
                <button 
                class="input-group-text d-flex gap-2"
                @click=${(e) => {
    e.preventDefault();
    this.toggleSwitch = !this.toggleSwitch;
    this.type = this.toggleSwitch ? 'password' : 'text';
  }}
                >${this.inputGroupTextTemplate()}</button>

                ${this._validFeedbackTemplate()}
                <div class="invalid-feedback">${this.invalidFeedbackMessage}</div>
            </div>
        `;
  }

  inputGroupTextTemplate() {
    let inputGroupIconTemplate = '';
    if (this.toggleSwitch) {
      inputGroupIconTemplate = html`<i class="bi ${this.inputGroupIcon}"></i>`;
    } else {
      inputGroupIconTemplate = html`<i class="bi ${this.inputGroupIcon2}"></i>`;
    }

    let inputGroupTextTemplate = '';
    if (this.inputGroupText) {
      inputGroupTextTemplate = html`${this.inputGroupText}`;
    }

    return html`${inputGroupIconTemplate}${inputGroupTextTemplate}`;
  }

  _validFeedbackTemplate() {
    if (this.validFeedbackMessage) {
      return html`<div class="valid-feedback">${this.validFeedbackMessage}</div>`;
    }

    return html``;
  }
}

customElements.define('input-group-with-validation', InputGroupWithValidation);
