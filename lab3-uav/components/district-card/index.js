export class DistrictCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        const density = (data.uavCount / data.areaSize).toFixed(1);

        return (
            `
            <div class="card me-4 mb-4" style="width: 300px; border-radius: 0; border: 1px solid #4a235a;">
                <img class="card-img-top" src="${data.image}" alt="${data.title}" style="border-radius: 0; height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title" style="color: #4a235a; font-weight: bold;">${data.title}</h5>
                    <p class="card-text">${data.description}</p>
                    <p class="card-text mb-1"><small class="text-muted">Площадь: ${data.areaSize} кв.км</small></p>
                    <p class="card-text mb-1"><small class="text-muted">Заявок БПЛА: ${data.uavCount}</small></p>
                    
                    <p class="card-text mb-2"><span class="badge" style="background-color: #4a235a; border-radius: 0;">Плотность: ${density} ед/кв.км</span></p>
                    
                    <button class="btn btn-square me-2" id="click-card-${data.id}" data-id="${data.id}">Подробнее</button>
                    <button class="btn btn-square" id="delete-card-${data.id}" data-id="${data.id}" style="background-color: #dc3545;">Удалить</button>
                </div>
            </div>
            `
        );
    }

    addListeners(data, clickListener, deleteListener) {
        const clickBtn = document.getElementById(`click-card-${data.id}`);
        if (clickBtn && clickListener) {
            clickBtn.addEventListener("click", clickListener);
        }

        const deleteBtn = document.getElementById(`delete-card-${data.id}`);
        if (deleteBtn && deleteListener) {
            deleteBtn.addEventListener("click", deleteListener);
        }
    }

    render(data, clickListener, deleteListener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, clickListener, deleteListener);
    }
}