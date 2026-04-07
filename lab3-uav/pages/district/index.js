import { HeaderComponent } from "../../components/header/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { DistrictDetailsComponent } from "../../components/district-details/index.js";
import { MainPage } from "../main/index.js";

export class DistrictPage {
    constructor(parent, id, allData) {
        this.parent = parent;
        this.id = parseInt(id);
        this.allData = allData;
    }

    getData() {
        return this.allData.find(item => item.id === this.id);
    }

    get pageRoot() {
        return document.getElementById('district-page');
    }

    getHTML() {
        return `<div class="container mt-4" id="district-page"></div>`;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent, this.allData);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        
        const header = new HeaderComponent(this.parent);
        header.render(() => this.clickBack());

        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        const data = this.getData();
        if (data) {
            const details = new DistrictDetailsComponent(this.pageRoot);
            details.render(data);
        } else {
            this.pageRoot.innerHTML = '<p>Район не найден</p>';
        }
    }
}