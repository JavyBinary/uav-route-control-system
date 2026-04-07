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
                { id: 1, title: "Пресненский", image: "images/1.jpg", description: "Центральный район. Строгий контроль.", areaSize: 11.7, uavCount: 45, controlDate: "2026-04-08" },
                { id: 2, title: "Хамовники", image: "images/2.jpg", description: "Исторический район. Спец. пропуска.", areaSize: 10.0, uavCount: 12, controlDate: "2026-04-09" },
                { id: 3, title: "Басманный", image: "images/3.jpg", description: "Транзитная зона грузовых дронов.", areaSize: 8.3, uavCount: 28, controlDate: "2026-04-10" },
                { id: 4, title: "Тверской", image: "images/4.jpg", description: "Запретная зона для полетов.", areaSize: 7.3, uavCount: 5, controlDate: "2026-04-11" }
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
                    <button id="add-card-btn" class="btn btn-square" style="background-color: #28a745;">+ Добавить заявку</button>
                    
                    <input type="text" id="search-input" class="form-control" style="max-width: 350px; border-radius: 0; border: 2px solid #4a235a;" placeholder="Поиск по названию района...">
                </div>
                
                <div id="main-page" class="d-flex flex-wrap justify-content-start"></div>
            </div>
            `
        );
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        const districtPage = new DistrictPage(this.parent, cardId, this.data);
        districtPage.render();
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