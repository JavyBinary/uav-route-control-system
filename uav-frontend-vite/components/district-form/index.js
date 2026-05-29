export class DistrictFormComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        const isEdit = !!data;
        const title = isEdit ? data.title : '';
        const description = isEdit ? data.description : '';
        const areaSize = isEdit ? data.areaSize : '';
        const uavCount = isEdit ? data.uavCount : '';
        const controlDate = isEdit ? data.controlDate : '';
        const routePoints = isEdit ? JSON.stringify(data.routePoints || []) : '[]';
        const image = isEdit ? data.image : 'images/1.jpg';

        return `
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card mb-3" style="border-radius: 0; border: 1px solid #5c1154; background-color: #ffffff;">
                        <div class="card-header" style="background-color: #5c1154; color: white; border-radius: 0;">
                            <h4 class="mb-0" style="font-weight: bold;">${isEdit ? 'Редактирование района' : 'Добавление района'}</h4>
                        </div>
                        <div class="card-body" style="color: #000000;">
                            <div id="form-error" class="alert alert-danger d-none" style="border-radius: 0; border: 1px solid #dc3545;"></div>

                            <div class="mb-3">
                                <label class="form-label" style="font-weight: bold;">Название:</label>
                                <input type="text" id="form-title" class="form-control" value="${title}" style="border-radius: 0; border: 1px solid #5c1154;" placeholder="Введите название района">
                            </div>
                            
                            <div class="mb-3">
                                <label class="form-label" style="font-weight: bold;">Описание:</label>
                                <textarea id="form-description" class="form-control" style="border-radius: 0; border: 1px solid #5c1154;" rows="3" placeholder="Введите описание">${description}</textarea>
                            </div>

                            <div class="mb-3">
                                <label class="form-label" style="font-weight: bold;">Путь к изображению:</label>
                                <input type="text" id="form-image" class="form-control" value="${image}" style="border-radius: 0; border: 1px solid #5c1154;" placeholder="Напр: images/1.jpg">
                            </div>

                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label" style="font-weight: bold;">Площадь (кв.км):</label>
                                    <input type="number" step="0.1" id="form-area" class="form-control" value="${areaSize}" style="border-radius: 0; border: 1px solid #5c1154;">
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label" style="font-weight: bold;">Заявок БПЛА:</label>
                                    <input type="number" id="form-uav-count" class="form-control" value="${uavCount}" style="border-radius: 0; border: 1px solid #5c1154;">
                                </div>
                            </div>

                            <div class="mb-3">
                                <label class="form-label" style="font-weight: bold;">Дата контроля:</label>
                                <input type="date" id="form-date" class="form-control" value="${controlDate}" style="border-radius: 0; border: 1px solid #5c1154;">
                            </div>

                            <div class="mb-3">
                                <label class="form-label" style="font-weight: bold;">Маршрут полета:</label>
                                <input type="text" id="form-route" class="form-control" value='${routePoints}' style="border-radius: 0; border: 1px solid #5c1154;">
                            </div>
                            
                            <button id="save-btn" class="btn btn-square mt-3 w-100">Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(data, saveListener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);

        const saveBtn = document.getElementById('save-btn');
        if (saveBtn && saveListener) {
            saveBtn.addEventListener('click', () => {
                const errorDiv = document.getElementById('form-error');
                errorDiv.classList.add('d-none');
                errorDiv.innerText = '';

                // Валидация JSON
                let parsedRoute = [];
                try {
                    const routeValue = document.getElementById('form-route').value;
                    parsedRoute = JSON.parse(routeValue);
                    if (!Array.isArray(parsedRoute)) {
                        throw new Error('Должен быть массивом');
                    }
                } catch (e) {
                    errorDiv.innerText = 'Ошибка: Маршрут полета должен быть валидным JSON массивом (напр: [10, 20]).';
                    errorDiv.classList.remove('d-none');
                    return;
                }

                // Валидация чисел
                const areaSize = parseFloat(document.getElementById('form-area').value);
                const uavCount = parseInt(document.getElementById('form-uav-count').value, 10);

                if (isNaN(areaSize) || areaSize < 0) {
                    errorDiv.innerText = 'Ошибка: Площадь должна быть положительным числом.';
                    errorDiv.classList.remove('d-none');
                    return;
                }
                
                if (isNaN(uavCount) || uavCount < 0) {
                    errorDiv.innerText = 'Ошибка: Количество заявок должно быть положительным целым числом.';
                    errorDiv.classList.remove('d-none');
                    return;
                }

                const formData = {
                    title: document.getElementById('form-title').value,
                    description: document.getElementById('form-description').value,
                    areaSize: areaSize,
                    uavCount: uavCount,
                    controlDate: document.getElementById('form-date').value,
                    routePoints: parsedRoute,
                    image: document.getElementById('form-image').value || "images/1.jpg"
                };

                saveListener(formData);
            });
        }
    }
}