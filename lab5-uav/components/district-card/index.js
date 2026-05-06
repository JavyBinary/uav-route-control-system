import { sumOfUnique } from "../../src/tasks.js";

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
                    <p class="card-text mb-1"><small style="color: #000000;"><strong>Площадь:</strong> ${data.areaSize} кв.км</small></p>
                    <p class="card-text mb-1"><small style="color: #000000;"><strong>Заявок БПЛА:</strong> ${data.uavCount}</small></p>
                    <p class="card-text mb-3"><span class="badge badge-custom text-white" style="font-size: 0.9rem;"><strong>Плотность:</strong> ${density} ед/кв.км</span></p>
                    
                    <div class="d-flex flex-wrap gap-2">
                        <button class="btn btn-square flex-grow-1" id="click-card-${data.id}" data-id="${data.id}">Подробнее</button>
                        <button class="btn btn-square flex-grow-1" id="edit-card-${data.id}" data-id="${data.id}">Редактировать</button>
                        <button class="btn btn-square flex-grow-1" id="delete-card-${data.id}" data-id="${data.id}">Удалить</button>
                    </div>
                </div>
            </div>
            `
        );
    }

    addListeners(data, clickListener, deleteListener, editListener) {
        const clickBtn = document.getElementById(`click-card-${data.id}`);
        if (clickBtn && clickListener) {
            clickBtn.addEventListener("click", clickListener);
        }

        const editBtn = document.getElementById(`edit-card-${data.id}`);
        if (editBtn && editListener) {
            editBtn.addEventListener("click", editListener);
        }

        const deleteBtn = document.getElementById(`delete-card-${data.id}`);
        if (deleteBtn && deleteListener) {
            deleteBtn.addEventListener("click", () => {
                const checkCode = sumOfUnique(data.droneIds || []);
                const modalBody = document.getElementById('deleteModalBody');
                modalBody.innerHTML = `Вы уверены, что хотите удалить район <strong>${data.title}</strong>?<br><br>Контрольный код сектора: <strong>${checkCode}</strong>`;
                
                const confirmBtn = document.getElementById('confirmDeleteBtn');
                const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
                
                const newConfirmBtn = confirmBtn.cloneNode(true);
                confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
                
                newConfirmBtn.addEventListener('click', () => {
                    deleteListener({ target: { dataset: { id: data.id } } });
                    modal.hide();
                });
                
                modal.show();
            });
        }
    }

    render(data, clickListener, deleteListener, editListener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, clickListener, deleteListener, editListener);
    }
}