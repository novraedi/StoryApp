/* eslint-disable class-methods-use-this */
import { LitElement, html, css } from 'lit';

class ToTopButton extends LitElement {
  static styles = css`
    :host{
        display:none;
    }
    a{
        display:flex;
        position: fixed;
        bottom: 25px;
        right: 25px;
        width: 60px;
        height: 60px;
        background-color: black;
        z-index: 9999999999;
        align-items: center;
        justify-content: center;
        border-radius:50%
    }

    span{
        display: block;
        border-top: 2px solid white;
        border-left: 2px solid white;
        width: 15px;
        height:15px;
        color: white;
        transform: rotate(45deg);
        margin-top: 6px
    }
    `;

  render() {
    return html`
        <a href="#home">
        <span></span>
        </a>
        `;
  }
}

customElements.define('to-top-button', ToTopButton);
