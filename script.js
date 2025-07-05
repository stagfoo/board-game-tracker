class ResourceRow extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["name", "color", "defaultamount", "icon"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const name = this.getAttribute("name") || "Resource";
    const color = this.getAttribute("color") || "#cccccc";
    const defaultAmount = parseInt(this.getAttribute("defaultamount") || "0");
    const icon = this.getAttribute("icon");

    const iconHTML = icon
      ? `<img src="${icon}" width="32" style="margin-right: 10px;">`
      : "";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        .resource {
          display: flex;
          align-items: center;
          margin: 10px 0;
          padding: 15px;
          border-radius: 8px;
          color: white;
        }

        .controls {
          display: flex;
          align-items: center;
          margin-left: auto;
          gap: 10px;
        }

        button {
          width: 50px;
          height: 50px;
          cursor: pointer;
          border: none;
          border-radius: 25px;
          background-color: rgba(0, 0, 0, 0.2);
          color: white;
          font-size: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s;
        }

        button:hover {
          background-color: rgba(0, 0, 0, 0.3);
        }

        .amount {
          font-size: 24px;
          font-weight: bold;
          min-width: 40px;
          text-align: center;
        }

        @media (max-width: 480px) {
          .resource {
            padding: 12px;
          }

          button {
            width: 40px;
            height: 40px;
            font-size: 20px;
          }

          .amount {
            font-size: 20px;
          }
        }
      </style>
      <div class="resource" style="background-color: #${color}">
        <div class="controls">
          ${iconHTML}
          <button onclick="this.getRootNode().host.updateAmount(-1)">−</button>
          <span class="amount">${defaultAmount}</span>
          <button onclick="this.getRootNode().host.updateAmount(1)">+</button>
        </div>
      </div>
    `;

    this.amount = defaultAmount;
  }

  updateAmount(change) {
    const newAmount = this.amount + change;
    if (newAmount >= 0) {
      this.amount = newAmount;
      this.shadowRoot.querySelector(".amount").textContent = this.amount;
    }
  }
}

customElements.define("resource-row", ResourceRow);
