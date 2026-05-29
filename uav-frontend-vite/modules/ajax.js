class Ajax {
    async get(url, callback) {
        try {
            const response = await fetch(url);
            let data = null;
            if (response.status !== 204) {
                const text = await response.text();
                if (text) data = JSON.parse(text);
            }
            callback(data, response.status);
        } catch (e) {
            console.error('Ошибка GET запроса:', e);
            callback(null, 500);
        }
    }

    async post(url, data, callback) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            let responseData = null;
            if (response.status !== 204) {
                const text = await response.text();
                if (text) responseData = JSON.parse(text);
            }
            callback(responseData, response.status);
        } catch (e) {
            console.error('Ошибка POST запроса:', e);
            callback(null, 500);
        }
    }

    async patch(url, data, callback) {
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            let responseData = null;
            if (response.status !== 204) {
                const text = await response.text();
                if (text) responseData = JSON.parse(text);
            }
            callback(responseData, response.status);
        } catch (e) {
            console.error('Ошибка PATCH запроса:', e);
            callback(null, 500);
        }
    }

    async delete(url, callback) {
        try {
            const response = await fetch(url, {
                method: 'DELETE'
            });
            let data = null;
            if (response.status !== 204) {
                const text = await response.text();
                if (text) data = JSON.parse(text);
            }
            callback(data, response.status);
        } catch (e) {
            console.error('Ошибка DELETE запроса:', e);
            callback(null, 500);
        }
    }
}

export const ajax = new Ajax();