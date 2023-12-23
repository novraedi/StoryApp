import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class ModalCard extends LitWithoutShadowDom {
  static properties = {
    title: { type: String, reflect: true },
  };

  render() {
    return html`
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${this.title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <img src="" id="imgDetailBook" class="img-fluid" alt="${this.title}" />
            </div>

            <table class="table table-borderless">
              <tbody>
                <tr>
                  <td class="fw-bold">Name</td>
                  <td class="fw-bold">:</td>
                  <td id="nameDetailBook"></td>
                </tr>
                <tr>
                  <td class="fw-bold">Created At</td>
                  <td class="fw-bold">:</td>
                  <td id="dateDetailBook"></td>
                </tr>
                <tr>
                  <td class="fw-bold">Description</td>
                  <td class="fw-bold">:</td>
                  <td id="descriptionDetailBook"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('modal-card', ModalCard);
