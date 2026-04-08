export class DistrictCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        const density = (data.uavCount / data.areaSize).toFixed(1);

        return (
            `
            <div class="card me-4 mb-4" style="width: 300px; border-radius: 0; border: 1px solid #5c1154; background-color: #ffffff;">
                <img class="card-img-top" src="${data.image}" alt="${data.title}" style="border-radius: 0; height: 200px; object-fit: cover;">
                <div class="card-body" style="color: #000000;">
                    <h5 class="card-title" style="color: #000000; font-weight: bold;">${data.title}</h5>
                    <p class="card-text">${data.description}</p>
                    <p class="card-text mb-1"><small style="color: #000000;">Площадь: ${data.areaSize} кв.км</small></p>
                    <p class="card-text mb-1"><small style="color: #000000;">Заявок БПЛА: ${data.uavCount}</small></p>
                    
                    <p class="card-text mb-3"><span class="badge badge-custom text-white" style="font-size: 0.9rem;">Плотность: ${density} ед/кв.км</span></p>
                    
                    <button class="btn btn-square me-2" id="click-card-${data.id}" data-id="${data.id}">Подробнее</button>
                    <button class="btn btn-square" id="delete-card-${data.id}" data-id="${data.id}">Удалить</button>
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