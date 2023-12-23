/* eslint-disable no-undef */
import { html, nothing } from 'lit';
import LitWithoutShadowDom from '../base/LitWithoutShadowDom';

class InputImageWithPreview extends LitWithoutShadowDom {
  static properties = {
    inputId: { type: String, reflect: true },
    defaultImage: { type: String, reflect: true },
    defaultImageAlt: { type: String, reflect: true },
    validFeedbackMessage: { type: String, reflect: true },
    invalidFeedbackMessage: { type: String, reflect: true },
    required: { type: Boolean, reflect: true },
  };

  constructor() {
    super();

    this.type = 'text';
    this.defaultImage = '';
    this.defaultImageAlt = '';
  }

  render() {
    return html`
      <div style="width: 100%; height: 20rem" class="mb-3 ${!this.defaultImage ? 'd-none' : ''}">
        ${this._imagePreviewTemplate()}
      </div>
      <input
        type="file"
        class="form-control"
        id=${this.inputId || nothing}
        accept="image/*"
        ?required=${this.required}
        @change=${this._updatePhotoPreview}
      />
 
      ${this._feedbackTemplate()}
    `;
  }

  _updatePhotoPreview() {
    const evidenceImgChange = document.querySelector('#validationCustomImageChange');
    const evidenceImgInput = document.querySelector('#validationCustomImage');

    let evidenceBookImg = null;
    if (this.defaultImage) {
      evidenceBookImg = document.querySelector('#validationCustomImage');
    }

    const photo = evidenceImgInput.files[0];

    const maxSizeInBytes = 1 * 1024 * 1024; // 2MB
    if (photo && photo.size > maxSizeInBytes) {
      window.alert('File size exceeds 1MB limit');

      evidenceImgInput.value = '';
      evidenceImgChange.style.backgroundImage = '';
      evidenceImgChange.classList.add('d-none');
      evidenceImgChange.parentElement.classList.add('d-none');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (this.defaultImage) {
        evidenceBookImg.classList.add('d-none');
      }
      evidenceImgChange.parentElement.classList.remove('d-none');
      evidenceImgChange.classList.remove('d-none');
      evidenceImgChange.style.backgroundImage = `url('${event.target.result}')`;
    };
    reader.readAsDataURL(photo);
  }

  _imagePreviewTemplate() {
    const imgChangeTemplate = html`
        <div
          class="w-100 h-100 ${this.defaultImage ? 'd-none' : ''}"
          style="
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
          "
          id="${this.inputId || nothing}Change"
        ></div>
      `;
    if (this.defaultImage) {
      return html`
        <img
          class="img-fluid h-100"
          src="${this.defaultImage}"
          alt="${this.defaultImageAlt}"
          id="${ifDefined(this.inputId)}"
        />
        ${imgChangeTemplate}
      `;
    }
    return html`${imgChangeTemplate}`;
  }

  _feedbackTemplate() {
    const validFeedbackMessage = html`
      <div class="valid-feedback">${this.validFeedbackMessage ?? ''}</div>
      `;
    const invalidFeedbackMessage = html`
          <div class="invalid-feedback">${this.invalidFeedbackMessage ?? ''}</div>
          `;
    return html`${validFeedbackMessage}${invalidFeedbackMessage}`;
  }
}

customElements.define('input-image-with-preview', InputImageWithPreview);
