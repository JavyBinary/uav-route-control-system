import { HeaderComponent } from "../../components/header/index.js";
import { DistrictDetailsComponent } from "../../components/district-details/index.js";
import { MainPage } from "../main/index.js";
import { ajax } from "../../modules/ajax.js";
import { cityDistrictsUrls } from "../../modules/cityDistrictsUrls.js";

export class DistrictPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = parseInt(id);
    }

    getData() {
        ajax.get(cityDistrictsUrls.getDistrictById(this.id), (data, status) => {
            if (status !== 200) {
                this.pageRoot.innerHTML = '<p class="text-danger">Ошибка загрузки данных. Проверьте подключение к API</p>';
                return;
            }
            this.renderData(data);
        });
    }

    get pageRoot() {
        return document.getElementById('district-page');
    }

    getHTML() {
        return `<div class="container mt-4" id="district-page"></div>`;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    renderData(data) {
        if (data) {
            document.title = `${data.title} - Контроль БПЛА`;
            const details = new DistrictDetailsComponent(this.pageRoot);
            details.render(data);
        } else {
            document.title = "Район не найден";
            this.pageRoot.innerHTML = '<p>Район не найден</p>';
        }
    }

    render() {
        this.parent.innerHTML = '';
        
        const header = new HeaderComponent(this.parent);
        header.render(() => this.clickBack());

        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        this.getData();
    }
}