/* eslint-disable no-return-assign */
import { html, nothing } from 'lit';
import LitWithoutShadowDom from '../base/LitWithoutShadowDom';

class TextareaWithValidation extends LitWithoutShadowDom {
  static properties = {
    value: { type: String, reflect: true },
    rows: { type: Number, reflect: true },
    InputId: { type: String, reflect: true },

    validFeedbackMessage: { type: String, reflect: true },
    invalidFeedbackMessage: { type: String, reflect: true },

    required: { type: Boolean, reflect: true },
  };

  constructor() {
    super();

    this.rows = 3;
    this.required = false;
  }

  render() {
    return html`
        <textarea
        id=${this.InputId || nothing}
        class="form-control"
        rows=${this.rows}
        value=${this.value || nothing}
        ?required=${this.required}
        @input=${(e) => (this.value = e.target.value)}
        ></textarea>

        ${this._validFeedbackMessage()}
        <div class="invalid-feedback">${this.invalidFeedbackMessage}</div>
        `;
  }

  _validFeedbackMessage() {
    if (this.validFeedbackMessage) {
      return html`
            <div class="valid-feedback">${this.validFeedbackMessage}</div>
            `;
    }

    return html``;
  }
}

customElements.define('textarea-with-validation', TextareaWithValidation);
