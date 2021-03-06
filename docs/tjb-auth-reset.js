import WebComponent from "https://tjb-webcomponents.github.io/tjb-webcomponent/tjb-wc.min.js";
import html from "https://tjb-webcomponents.github.io/html-template-string/html-template-string.js";
import { bounce } from "https://tjb-webcomponents.github.io/tjb-gfx/tjb-gfx.min.js";
import "https://tjb-webcomponents.github.io/tjb-input/tjb-input.min.js";
import "https://tjb-webcomponents.github.io/tjb-statusbar/tjb-statusbar.min.js";
import "https://tjb-webcomponents.github.io/tjb-notify/tjb-notify.min.js";

class tjbAuthReset extends WebComponent() {
  // Styles
  ////////////////////////////////////////////////////////////

  CSS() {
    return html`
      <style>
        :host {
          --reset-color-info: grey;

          /* notify */
          --reset-notify-background-error: #fa354c;
          --reset-notify-background-success: limegreen;
          --reset-notify-color-error: white;
          --reset-notify-color-success: white;
          --reset-notify-margin: -55px -40px 20px;
          --reset-notify-padding: 15px 15px 15px 35px;

          /* input */
          --reset-input-color-error: #fa354c;
          --reset-input-color-success: limegreen;
          --reset-input-padding: 10px;
          --reset-input-margin: 0 0 30px 0;
          --reset-input-width: 100%;
          --reset-input-border: 1px solid transparent;
          --reset-input-border-bottom: 1px solid lightgrey;
          --reset-input-border-radius: 0;
          --reset-input-font-size: 1rem;
          --reset-input-info-color: grey;
          --reset-input-info-font-size: 0.8rem;
          --reset-input-label-margin: 0 0 5px 0;

          background: #fff;
          display: block;
          max-width: 350px;
          box-sizing: border-box;
          overflow: hidden;
          position: relative;
          padding: 55px 40px 10px;
          box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
        }

        tjb-input {
          --input-color-error: var(--reset-input-color-error);
          --input-color-success: var(--reset-input-color-success);
          --input-padding: var(--reset-input-padding);
          --input-margin: var(--reset-input-margin);
          --input-width: var(--reset-input-width);
          --input-border: var(--reset-input-border);
          --input-border-bottom: var(--reset-input-border-bottom);
          --input-border-radius: var(--reset-input-border-radius);
          --input-font-size: var(--reset-input-font-size);
          --input-info-color: var(--reset-input-info-color);
          --input-info-font-size: var(--reset-input-info-font-size);
          --input-label-margin: var(--reset-input-label-margin);
        }

        tjb-notify {
          --notify-background-error: var(--reset-notify-background-error);
          --notify-background-success: var(--reset-notify-background-success);
          --notify-color-error: var(--reset-notify-color-error);
          --notify-color-success: var(--reset-notify-color-success);
          --notify-margin: var(--reset-notify-margin);
          --notify-padding: var(--reset-notify-padding);
        }

        .alert {
          animation: shake 150ms linear 3;
        }

        .fieldset {
          margin-bottom: 30px;
        }

        .fieldset--center {
          text-align: center;
        }

        .info {
          text-align: center;
          margin-bottom: 10px;
          color: var(--reset-color-info);
        }

        .footnote {
          text-align: center;
        }

        @keyframes blink {
          50% {
            background: transparent;
          }
        }

        @keyframes shake {
          25% {
            transform: translateX(-5%);
          }

          50% {
            transform: translateX(5%);
          }
        }
      </style>
    `;
  }

  // Markup
  ////////////////////////////////////////////////////////////

  HTML() {
    this.statusbar = html`
      <tjb-statusbar></tjb-statusbar>
    `;

    this.emailInput = !this.showkey ? html`
          <tjb-input
            label="Email"
            type="email"
            name="email"
            required="true"
            errormessage="Please check your email address"
          ></tjb-input>
        ` : "";

    this.keyInput = this.showkey ? html`
          <tjb-input
            label="Key"
            type="text"
            name="key"
            info="Enter the key you got via email here:"
            pattern=".{4,}"
            required="true"
            errormessage="Please check the key"
          ></tjb-input>
        ` : "";

    this.passwordInput = this.showkey ? html`
          <tjb-input
            label="New Password"
            type="password"
            name="password"
            info="Enter the new password you want to have here (minimum 8 digits):"
            pattern=".{8,}"
            required="true"
            errormessage="Please check your password"
          ></tjb-input>
        ` : "";

    this.messageNode = html`
      <tjb-notify></tjb-notify>
    `;

    return html`
      <form class="reset__form" onsubmit="${e => this.fetchHandler(e)}">
        ${this.messageNode}
        <div class="fieldset">
          ${!this.showkey ? html`
                  <div class="info">
                    Forgot your password?<br />
                    Enter your email here
                  </div>
                ` : html`
                  <div class="info">
                    Enter the email key and your new password:
                  </div>
                `}
        </div>
        <div class="fieldset">
          ${!this.showkey ? this.emailInput : html`
                  <data-fragment>
                    ${this.keyInput} ${this.passwordInput}
                  </data-fragment>
                `} <slot name="submit" onclick="${e => this.fetchHandler(e)}"></slot>
          <div class="footnote">
            ${!this.showkey ? html`
                    <div>
                      <a
                        href="#login"
                        class="link"
                        onclick="${e => this.openHandler(e, "login")}"
                        >Login</a
                      >
                      |
                      <a
                        href="#register"
                        class="link"
                        onclick="${e => this.openHandler(e, "register")}"
                        >Register</a
                      >
                    </div>
                  ` : html`
                    <div>
                      <span>${this.email || ""}</span> |
                      <a
                        href="#reset"
                        class="link"
                        onclick="${e => this.openHandler(e, "reset")}"
                        >Change Email</a
                      >
                    </div>
                  `}
          </div>
        </div>
        ${this.statusbar}
      </form>
    `;
  }

  // Attribute Handling
  ////////////////////////////////////////////////////////////

  static get observedAttributes() {
    return ["postbody", "posturl", "mailurl", "email", "showkey"];
  }

  connectedCallback() {
    super.connectedCallback();
    // rerenders
    this.handleShowkeyChange = this.reRender;
  }

  reRender() {
    super.reRender();

    if (this.email && this.showkey) {
      this.messageNode.success = `
        Email send to ${this.email}
      `;
    }
  }

  // Logic
  ////////////////////////////////////////////////////////////

  checkValidity() {
    const toCheck = [];
    if (this.emailInput) toCheck.push(this.emailInput.checkValidity());
    if (this.keyInput) toCheck.push(this.keyInput.checkValidity());
    if (this.passwordInput) toCheck.push(this.passwordInput.checkValidity());
    return toCheck.every(check => check);
  }

  openHandler(event, target) {
    event.preventDefault();
    bounce(event.target).then(this._location.bind(this, event.target.href, target));
  }

  _location(href, target) {
    if (target === "reset") return this.showkey = false;
    this.dispatchEvent("redirect", {
      href,
      target
    });
  }

  // Async Logic
  ////////////////////////////////////////////////////////////

  fetchHandler(event) {
    event.preventDefault();

    if (!this.checkValidity()) return false;

    this.statusbar.status = "loading";

    this.email = this.email || this.emailInput.value;

    const postbody = this.postbody && this.postbody.replace(/\'/g, '"');
    const body = JSON.parse(postbody || "{}");
    body.email = this.email;
    body.key = this.keyInput && this.keyInput.value;
    body.password = this.passwordInput && this.passwordInput.value;

    this.dispatchEvent(this.showkey ? "reset" : "sendmail", body);
    if (!this.posturl && !this.mailurl) return false;

    return fetch(this.showkey ? this.posturl : this.mailurl, {
      method: "POST",
      redirect: "follow",
      credentials: "include",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(body)
    }).then(resp => resp.json()).then(resp => {
      if (resp.error) throw resp;
      return this._success(resp);
    }).catch(resp => this._error(resp));
  }

  _success(resp) {
    console.log("success", resp);
    this.success().then(e => {
      if (!this.showkey) return this.showkey = true;
      return this.dispatchEvent("success", resp);
    });
  }

  _error(resp) {
    console.error("error", resp);
    this.dispatchEvent("error", resp);
    this.error();
  }

  success() {
    return bounce(this.domNode);
  }

  error() {
    return this.errorHandler();
  }

  errorHandler() {
    this.writeMessageError = this.writeMessageError.bind(this);
    this.statusbar.status = "alert";
    this.domNode.addEventListener("animationend", this.writeMessageError);
    this.domNode.classList.remove("alert");
    setTimeout(() => this.domNode.classList.add("alert"), 100);
  }

  writeMessageError() {
    this.domNode.removeEventListener("animationend", this.writeMessageError);

    this.messageNode.error = !this.showkey ? html`
          <ul>
            <li>
              <a
                onclick="${() => this.emailInput.inputNode.focus()}"
                href="#"
                class="message__link"
                >Wrong email</a
              >
            </li>
            <li>
              Don’t have an account yet?
              <a
                onclick="${e => this.openHandler(e, "login")}"
                href="#login"
                class="message__link"
                >Login here</a
              >
            </li>
          </ul>
        ` : html`
          <ul>
            <li>
              <a
                onclick="${() => this.keyInput.inputNode.focus()}"
                href="#"
                class="message__link"
                >Wrong Key</a
              >
              or
              <a
                onclick="${() => this.passwordInput.inputNode.focus()}"
                href="#"
                class="message__link"
                >Invalid Password</a
              >
            </li>
          </ul>
        `;

    if (this.emailInput) this.emailInput.showMessage("error");
    if (this.keyInput) this.keyInput.showMessage("error");
    if (this.passwordInput) this.passwordInput.showMessage("error");
  }
}

customElements.define("tjb-auth-reset", tjbAuthReset);
