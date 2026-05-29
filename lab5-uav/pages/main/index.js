import { HeaderComponent } from "../../components/header/index.js";
import { DistrictCardComponent } from "../../components/district-card/index.js";
import { DistrictPage } from "../district/index.js";
import { EditPage } from "../edit/index.js";
import { ajax } from "../../modules/ajax.js";
import { cityDistrictsUrls } from "../../modules/cityDistrictsUrls.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return (
            `
            <div class="container mt-4">
                <div class="d-flex justify-content-between mb-4 align-items-center">
                    <button id="add-card-btn" class="btn btn-square">+ Добавить район</button>
                    <div class="d-flex">
                        <input type="text" id="search-input" class="form-control me-2" style="max-width: 350px; border-radius: 0; border: 2px solid #5c1154; color: #000000; background-color: #ffffff;" placeholder="Поиск по названию...">
                        <button id="search-btn" class="btn btn-square" style="border: 2px solid #5c1154; background-color: #ffffff; color: #5c1154;">Найти</button>
                    </div>
                </div>
                <div id="main-page" class="d-flex flex-wrap justify-content-start"></div>
            </div>
            `
        );
    }

    getData(title = '') {
        ajax.get(cityDistrictsUrls.getDistricts(title), (data, status) => {
            if (status !== 200) {
                this.pageRoot.innerHTML = '<p class="text-danger w-100 text-center">Ошибка загрузки данных. Проверьте подключение к API</p>';
                return;
            }
            this.renderCards(data || []);
        });
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        const districtPage = new DistrictPage(this.parent, cardId);
        districtPage.render();
        window.scrollTo(0, 0);
        history.pushState({page: 'district', id: cardId}, '', `./district-${cardId}`);
    }

    editCard(e) {
        const cardId = e.target.dataset.id;
        const editPage = new EditPage(this.parent, cardId);
        editPage.render();
        window.scrollTo(0, 0);
        history.pushState({page: 'edit', id: cardId}, '', `./edit-${cardId}`);
    }

    clickAdd() {
        const editPage = new EditPage(this.parent);
        editPage.render();
        window.scrollTo(0, 0);
        history.pushState({page: 'add'}, '', `./add`);
    }

    deleteCard(e) {
        const cardId = parseInt(e.target.dataset.id);
        ajax.delete(cityDistrictsUrls.removeDistrictById(cardId), (res, status) => {
            if (status === 204 || status === 200) {
                this.applySearch();
            } else {
                console.error('Ошибка при удалении района');
            }
        });
    }

    applySearch() {
        const searchInput = document.getElementById('search-input');
        const query = searchInput ? searchInput.value : '';
        this.getData(query);
    }

    renderCards(dataToRender) {
        const root = this.pageRoot;
        root.innerHTML = ''; 
        
        if (dataToRender.length === 0) {
            root.innerHTML = '<p class="w-100 text-center">Районы не найдены</p>';
            return;
        }

        dataToRender.forEach((item) => {
            const districtCard = new DistrictCardComponent(root);
            districtCard.render(item, this.clickCard.bind(this), this.deleteCard.bind(this), this.editCard.bind(this));
        });
    }

    render() {
        document.title = "Aeroscript - Главная";
        history.replaceState({page: 'main'}, '', './');
        this.parent.innerHTML = '';
        const header = new HeaderComponent(this.parent);
        header.render(() => this.render());

        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const addCardBtn = document.getElementById('add-card-btn');
        if (addCardBtn) {
            addCardBtn.addEventListener('click', () => this.clickAdd());
        }

        const searchBtn = document.getElementById('search-btn');
        searchBtn.addEventListener('click', () => this.applySearch());

        document.getElementById('search-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.applySearch();
            }
        });

        this.getData();
    }
}