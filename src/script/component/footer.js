class FooterBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
      }
  
      div.container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 35px; /* Tinggi konten footer */
      }

      div.content {
        padding: 0 20px; /* Menambahkan padding kiri dan kanan */
        text-align: center;
        background-color: #13df91;
        color: beige;
        font-size: 20px;
        width: 100%; /* Lebar konten footer */
      }
    `;
  }
  

  _emptyContent() {
    this.shadowRoot.innerHTML = "";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div class="container">
        <div class="content">2024@Notes App Awal</div>
      </div>
      `;
  }
}

customElements.define("footer-note", FooterBar);
