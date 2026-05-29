export class DistrictDetailsComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        const density = (data.uavCount / data.areaSize).toFixed(1);

        return (
            `
            <div class="row">
                <div class="col-md-12">
                    <div class="card mb-3" style="border-radius: 0; border: 1px solid #5c1154; background-color: #ffffff;">
                        <img class="card-img-top" src="${data.image}" alt="${data.title}" style="border-radius: 0; height: 400px; object-fit: cover; border-bottom: 2px solid #5c1154;">
                        <div class="card-body" style="color: #000000;">
                            <h2 class="card-title" style="color: #000000; font-weight: bold;">${data.title}</h2>
                            <p class="card-text">${data.description}</p>
                            <ul class="list-group list-group-flush mb-3">
                                <li class="list-group-item" style="border-color: #5c1154; background-color: transparent;"><strong>Площадь:</strong> ${data.areaSize} кв.км</li>
                                <li class="list-group-item" style="border-color: #5c1154; background-color: transparent;"><strong>Заявок БПЛА:</strong> ${data.uavCount}</li>
                                <li class="list-group-item" style="border-color: #5c1154; background-color: transparent;"><strong>Дата контроля:</strong> ${data.controlDate}</li>
                                <li class="list-group-item" style="border-color: #5c1154; background-color: transparent; font-weight: bold; color: #5c1154;">
                                    <strong>Плотность:</strong> ${density} ед/кв.км
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            `
        );
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}