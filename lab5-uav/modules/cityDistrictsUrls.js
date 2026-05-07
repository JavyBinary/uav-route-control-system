class CityDistrictsUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3010';
    }

    getDistricts(title = '') {
        const url = new URL(`${this.baseUrl}/city_districts`);
        if (title) {
            url.searchParams.append('title', title);
        }
        return url.toString();
    }

    getDistrictById(id) {
        return `${this.baseUrl}/city_districts/${id}`;
    }

    createDistrict() {
        return `${this.baseUrl}/city_districts`;
    }

    removeDistrictById(id) {
        return `${this.baseUrl}/city_districts/${id}`;
    }

    updateDistrictById(id) {
        return `${this.baseUrl}/city_districts/${id}`;
    }
}

export const cityDistrictsUrls = new CityDistrictsUrls();