import { HeaderComponent } from "../../components/header/index.js";
import { DistrictFormComponent } from "../../components/district-form/index.js";
import { MainPage } from "../main/index.js";
import { ajax } from "../../modules/ajax.js";
import { cityDistrictsUrls } from "../../modules/cityDistrictsUrls.js";

export class EditPage {
    constructor(parent, id = null) {
        this.parent = parent;
        this.id = id ? parseInt(id) : null;
    }

    getData() {
        if (!this.id) {
            this.renderData(null);
            return;
        }
        ajax.get(cityDistrictsUrls.getDistrictById(this.id), (data, status) => {
            if (status !== 200) {
                this.pageRoot.innerHTML = '<p class="text-danger text-center mt-5">Ошибка загрузки данных. Проверьте подключение к API</p>';
                return;
            }
            this.renderData(data);
        });
    }

    get pageRoot() {
        return document.getElementById('edit-page');
    }

    getHTML() {
        return `<div class="container mt-4" id="edit-page"></div>`;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    handleSave(formData) {
        if (this.id) {
            ajax.patch(cityDistrictsUrls.updateDistrictById(this.id), formData, (data, status) => {
                if (status === 200 || status === 204) {
                    this.clickBack();
                } else {
                    console.error('Ошибка при обновлении района');
                }
            });
        } else {
            ajax.post(cityDistrictsUrls.createDistrict(), formData, (data, status) => {
                if (status === 201 || status === 200) {
                    this.clickBack();
                } else {
                    console.error('Ошибка при создании района');
                }
            });
        }
    }

    renderData(data) {
        const form = new DistrictFormComponent(this.pageRoot);
        form.render(data, this.handleSave.bind(this));
    }

    render() {
        this.parent.innerHTML = '';
        document.title = this.id ? "Aeroscript - Редактирование" : "Aeroscript - Добавление";
        
        const header = new HeaderComponent(this.parent);
        header.render(() => this.clickBack());

        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        this.getData();
    }
}