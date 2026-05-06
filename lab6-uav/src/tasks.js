export const sumOfUnique = (arr) => {
    const counts = {};
    arr.forEach(x => {
        counts[x] = (counts[x] || 0) + 1;
    });
    
    let sum = 0;
    for (const key in counts) {
        if (counts[key] === 1) {
            sum += Number(key);
        }
    }
    return sum;
};

export const flattenRoute = (arr) => {
    let result = [];
    arr.forEach(item => {
        if (Array.isArray(item)) {
            result = result.concat(flattenRoute(item));
        } else {
            result.push(item);
        }
    });
    return result;
};
