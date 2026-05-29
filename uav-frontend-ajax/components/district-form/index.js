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

        return `
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card mb-3" style="border-radius: 0; border: 1px solid #5c1154; background-color: #ffffff;">
                        <div class="card-header" style="background-color: #5c1154; color: white; border-radius: 0;">
                            <h4 class="mb-0" style="font-weight: bold;">${isEdit ? 'Редактирование района' : 'Добавление района'}</h4>
                        </div>
                        <div class="card-body" style="color: #000000;">
                            <div class="mb-3">
                                <label class="form-label" style="font-weight: bold;">Название:</label>
                                <input type="text" class="form-control" value="${title}" style="border-radius: 0; border: 1px solid #5c1154;" placeholder="Введите название района">
                            </div>
                            
                            <div class="mb-3">
                                <label class="form-label" style="font-weight: bold;">Описание:</label>
                                <textarea class="form-control" style="border-radius: 0; border: 1px solid #5c1154;" rows="3" placeholder="Введите описание">${description}</textarea>
                            </div>

                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label" style="font-weight: bold;">Площадь (кв.км):</label>
                                    <input type="number" class="form-control" value="${areaSize}" style="border-radius: 0; border: 1px solid #5c1154;">
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label" style="font-weight: bold;">Заявок БПЛА:</label>
                                    <input type="number" class="form-control" value="${uavCount}" style="border-radius: 0; border: 1px solid #5c1154;">
                                </div>
                            </div>

                            <div class="mb-3">
                                <label class="form-label" style="font-weight: bold;">Дата контроля:</label>
                                <input type="date" class="form-control" value="${controlDate}" style="border-radius: 0; border: 1px solid #5c1154;">
                            </div>

                            <div class="mb-3">
                                <label class="form-label" style="font-weight: bold;">Маршрут полета:</label>
                                <input type="text" class="form-control" value='${routePoints}' style="border-radius: 0; border: 1px solid #5c1154;">
                            </div>
                            
                            <div class="alert alert-warning mt-4" style="border-radius: 0; border: 1px solid #856404; background-color: #fff3cd; color: #856404;">
                                <strong>Внимание:</strong> Кнопка "Сохранить" отсутствует в рамках ЛР5. Сохранение данных будет реализовано в ЛР6.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}