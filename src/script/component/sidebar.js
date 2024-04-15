class Sidebar extends HTMLElement {
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
        }
   
        aside {
          width: 200px;
          padding: 20px;
          background-color: #f0f0f0;
        }
   
        ul {
          list-style-type: none;
          margin: 0;
          padding: 0;
        }
   
        li {
          margin: 5px 0;
        }
   
        a {
          text-decoration: none;
          color: #333;
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
        <aside>
          <ul>
            <li><a href="#">Menu 1</a></li>
            <li><a href="#">Menu 2</a></li>
            <li><a href="#">Menu 3</a></li>
          </ul>
        </aside>
      `;
    }
  }
  
  customElements.define("sidebar-menu", Sidebar);
  