{
    function SynapsianBit([char, accent]) {
        const elem = document.createElement("span");
        elem.classList.add("synapsian_bit");

        switch (accent) {
            default:  elem.innerHTML = char;       break;
            case "A": elem.innerHTML = char + "}"; break;
            case "B": elem.innerHTML = "{" + char; break;
        }

        return elem;
    }

    function SynapsianCharacter([size, char, accent, bar]) {
        const elem = document.createElement("div");
        elem.classList.add("synapsian_character");

        switch (size) {
            case "F": elem.classList.add("full");   break;
            case "W": elem.classList.add("wide");   break;
            case "T": elem.classList.add("thin");   break;
            case "S": elem.classList.add("single"); break;
        }

        elem.append(SynapsianBit(char + accent));

        switch (bar) {
            case "S": elem.classList.add("single_bar"); break;
            case "D": elem.classList.add("double_bar"); break;
        }

        return elem;
    }

    function SynapsianSpace(markup) {
        const [type, ...chars] = markup.split(",");


        const elem = document.createElement("div");
        elem.classList.add("synapsian_space");

        switch (type) {
            case "G": elem.classList.add("ground"); break;
            case "S": elem.classList.add("sky");    break;
            case "B": elem.classList.add("both");   break;
        }

        chars.map(SynapsianCharacter).forEach(e => elem.append(e));

        return elem;
    }

    function Synapsian(markup) {
        const spaces = markup.split(";").filter(s => s.length > 0);


        const elem = document.createElement("div");
        elem.classList.add("synapsian");

        spaces.map(SynapsianSpace).forEach(e => elem.append(e));

        return elem;
    }

    function dirname(path) {
        const components = path
            .split("/")
            .filter(e => e.length > 0);

        components.pop();

        return "/" + components.join("/");
    }


    const SCRIPT_DIR = (() => {
        const url = new URL(document.currentScript.src);
        url.pathname = dirname(url.pathname);

        return url.toString();
    })();


    class SynapsianElement extends HTMLElement {
        constructor() {
            super();

            this.attachShadow({mode: "open"});
            this.shadowRoot.append(SynapsianElement._stylesheet.cloneNode());

            setTimeout(() => {
                this.render();

                const observer = new MutationObserver(() => this.render());
                observer.observe(this, {subtree: true, characterData: true});
            });
        }

        render() {
            this.shadowRoot.children[1]?.remove();
            this.shadowRoot.append(Synapsian(this.textContent));
        }

        static _stylesheet = (() => {
            const elem = document.createElement("link");

            elem.rel = "stylesheet";
            elem.href = `${SCRIPT_DIR}/synapsian.css`;

            return elem;
        })();
    }

    customElements.define("syn-", SynapsianElement);


    // @font-face currently does nothing when used in
    // shadow DOM, here we work around that by dumping
    // our rules into the root document's head
    {
        const elem = document.createElement("style");

        elem.textContent = `
            @font-face {
                font-family: "Synapsian";
                src: url("${SCRIPT_DIR}/synapsian.ttf");
            }
        `;

        document.head.append(elem);
    }
}
