function store(key, value){
    const valueToStore = typeof value === "object" ? JSON.stringify(value) : value;
    localStorage.setItem(key, valueToStore);
}

function retrieve(key, isJson, defaultValue = undefined) {
    const value = localStorage.getItem(key);

    if(value === null) {
        return defaultValue;
    }

    const valueToReturn = isJson ? JSON.parse(value) : value;
    return valueToReturn;
}

function purge(key) {
    localStorage.removeItem(key);
}

export default {
    purge,
    store,
    retrieve
}