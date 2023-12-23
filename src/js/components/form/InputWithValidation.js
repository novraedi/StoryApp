/* eslint-disable no-return-assign */
import { html, nothing } from 'lit';
import LitWithoutShadowDom from '../base/LitWithoutShadowDom';

class InputWithValidation extends LitWithoutShadowDom {
  static properties = {
    type: { type: String, reflect: true },
    InputId: { type: String, reflect: true },
    value: { type: String, reflect: true },

    validFeedbackMessage: { type: String, reflect: true },
    invalidFeedbackMessage: { type: String, reflect: true },

    required: { type: Boolean, reflect: true },
  };

  constructor() {
    super();

    this.type = 'text';
    this.required = false;
  }

  render() {
    return html`
        <input
        class="form-control"
        type=${this.type}
        id=${this.InputId || nothing}
        value=${this.value || nothing}
        ?required=${this.required}
        @input=${(e) => (this.value = e.target.value)}
        >
        
        ${this._validFeedbackTemplate()}
        <div class="invalid-feedback">${this.invalidFeedbackMessage}</div>
        `;
  }

  _validFeedbackTemplate() {
    if (this.validFeedbackMessage) {
      return html`
            <div class="valid-feedback">${this.validFeedbackMessage}</div>
            `;
    }

    return html``;
  }
}

customElements.define('input-with-validation', InputWithValidation);
