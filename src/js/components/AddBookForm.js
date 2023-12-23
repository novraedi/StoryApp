/* eslint-disable class-methods-use-this */
import { html } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class AddBookForm extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
        <h1 class="mb-3">${msg('Add Book')}</h1>

            <form class="row g-3" id="addBookForm" novalidate>
              <div class="col-12">
                <label for="validationCustomDescription" class="form-label">${msg('Description')}</label>
                <textarea-with-validation
                InputId="validationCustomDescription"
                invalidFeedbackMessage=${msg('Wajib diisi')}
                required></textarea-with-validation>
              </div>
              <div class="col-12 col-md-6">
                <label for="validationCustomImage" class="form-label">${msg('Image')}</label>
                <input-image-with-preview
                InputId="validationCustomImage"
                invalidFeedbackMessage=${msg('Wajib diisi')}
                required></input-image-with-preview>
              </div>

              <div class="col-12 text-end mt-4">
                <button class="btn btn-primary" type="submit">${msg('Submit')}</button>
              </div>
            </form>
        `;
  }
}

customElements.define('add-book-form', AddBookForm);
