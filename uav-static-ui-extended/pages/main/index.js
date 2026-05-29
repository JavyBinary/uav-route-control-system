import { HeaderComponent } from "../../components/header/index.js";
import { DistrictCardComponent } from "../../components/district-card/index.js";
import { DistrictPage } from "../district/index.js";

export class MainPage {
    constructor(parent, initialData = null) {
        this.parent = parent;
        
        if (initialData) {
            this.data = initialData;
        } else {
            this.data = [
                { 
                    id: 1, 
                    title: "Пресненский район", 
                    image: "images/1.jpg", 
                    description: "Центральный район. Строгий контроль.", 
                    areaSize: 11.7, 
                    uavCount: 45, 
                    controlDate: "2026-04-08",
                    droneIds: [101, 102, 103, 101, 105],
                    routePoints: [10, [20, 30, [40, 50]]]
                },
                { 
                    id: 2, 
                    title: "Район Хамовники", 
                    image: "images/2.jpg", 
                    description: "Исторический район. Спец. пропуска.", 
                    areaSize: 10.0, 
                    uavCount: 12, 
                    controlDate: "2026-04-09",
                    droneIds: [201, 202, 201, 204],
                    routePoints: [15, [25, 35]]
                },
                { 
                    id: 3, 
                    title: "Басманный район", 
                    image: "images/3.jpg", 
                    description: "Транзитная зона грузовых дронов.", 
                    areaSize: 8.3, 
                    uavCount: 28, 
                    controlDate: "2026-04-10",
                    droneIds: [301, 302, 303],
                    routePoints: [[10, 20], [30, 40]]
                },
                { 
                    id: 4, 
                    title: "Тверской район", 
                    image: "images/4.jpg", 
                    description: "Запретная зона для полетов.", 
                    areaSize: 7.3, 
                    uavCount: 5, 
                    controlDate: "2026-04-11",
                    droneIds: [401, 401, 401],
                    routePoints: [50, 60]
                }
            ];
        }
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
                    <input type="text" id="search-input" class="form-control" style="max-width: 350px; border-radius: 0; border: 2px solid #5c1154; color: #000000; background-color: #ffffff;" placeholder="Поиск по названию...">
                </div>
                <div id="main-page" class="d-flex flex-wrap justify-content-start"></div>
                
                <!-- Модальное окно удаления -->
                <div class="modal fade" id="deleteModal" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content" style="border-radius: 0; border: 2px solid #5c1154;">
                            <div class="modal-header" style="background-color: #5c1154; color: white; border-radius: 0;">
                                <h5 class="modal-title">Aeroscript - Подтверждение</h5>
                            </div>
                            <div class="modal-body" id="deleteModalBody"></div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary btn-square" data-bs-dismiss="modal">Отмена</button>
                                <button type="button" class="btn btn-square" id="confirmDeleteBtn">Удалить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        );
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        const districtPage = new DistrictPage(this.parent, cardId, this.data);
        districtPage.render();
        window.scrollTo(0, 0);
        history.pushState({page: 'district', id: cardId}, '', `./district-${cardId}`);
    }

    deleteCard(e) {
        const cardId = parseInt(e.target.dataset.id);
        this.data = this.data.filter(item => item.id !== cardId);
        this.applySearch(); 
    }

    addCard() {
        if (this.data.length > 0) {
            const firstItem = this.data[0];
            const newId = Date.now();
            let copyNumber = 1;
            let newTitle = `${firstItem.title} (Копия ${copyNumber})`;
            
            while (this.data.some(item => item.title === newTitle)) {
                copyNumber++;
                newTitle = `${firstItem.title} (Копия ${copyNumber})`;
            }

            const newItem = { ...firstItem, id: newId, title: newTitle };
            this.data.push(newItem);
            this.applySearch(); 
        }
    }

    applySearch() {
        const searchInput = document.getElementById('search-input');
        const query = searchInput ? searchInput.value.toLowerCase() : '';
        const filteredData = this.data.filter(item => item.title.toLowerCase().includes(query));
        this.renderCards(filteredData);
    }

    renderCards(dataToRender) {
        const root = this.pageRoot;
        root.innerHTML = ''; 
        dataToRender.forEach((item) => {
            const districtCard = new DistrictCardComponent(root);
            districtCard.render(item, this.clickCard.bind(this), this.deleteCard.bind(this));
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

        document.getElementById('add-card-btn').addEventListener('click', this.addCard.bind(this));
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input', () => this.applySearch());

        this.renderCards(this.data);
    }
}