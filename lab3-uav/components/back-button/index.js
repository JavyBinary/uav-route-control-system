export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        const btn = document.getElementById("back-button");
        if (btn && listener) {
            btn.addEventListener("click", listener);
        }
    }

    getHTML() {
        return (
            `<button id="back-button" class="btn btn-square mb-4">Назад к списку</button>`
        );
    }

    render(listener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(listener);
    }
}