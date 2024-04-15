class NoteHeader extends HTMLElement {
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
          display: flex;
          align-items: center;
        }
   
        div {
          width: 100%;
          margin: 0 auto;
          padding: 24px 20px;
          background-color: #13df91;
          margin-bottom: 30px;
          box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2);
        }
   
        .brand-name {
          margin: 0;
          color: beige;
          font-size: 1.7em;
          text-align: center;
        }
      `;
    }
  
    _emptyContent() {
      this._shadowRoot.innerHTML = "";
    }
  
    connectedCallback() {
      this.render();
    }
  
    render() {
      this._emptyContent();
      this._updateStyle();
  
      this._shadowRoot.appendChild(this._style);
      this._shadowRoot.innerHTML += `      
        <div>
          <h1 class="brand-name">My Notes</h1>
        </div>
      `;
    }
  }
  
  customElements.define("note-header", NoteHeader);
  