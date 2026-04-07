export class HeaderComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        const homeBtn = document.getElementById("home-button");
        if (homeBtn && listener) {
            homeBtn.addEventListener("click", listener);
        }
    }

    getHTML() {
        return (
            `
            <nav class="navbar navbar-expand-lg mb-4" style="background-color: #f8f9fa; border-bottom: 2px solid #4a235a;">
                <div class="container-fluid d-flex justify-content-start">
                    <button id="home-button" class="btn btn-square me-4">Домой</button>
                    <span class="navbar-brand mb-0 h1" style="color: #4a235a; font-weight: bold;">Система контроля БПЛА</span>
                </div>
            </nav>
            `
        );
    }

    render(listener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(listener);
    }
}