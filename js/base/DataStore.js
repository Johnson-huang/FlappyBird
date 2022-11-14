// 变量缓存器，方便在不同类中访问和修改变量
export class DataStore {
    static getInstance() {
        if (!DataStore.instance) {
            DataStore.instance = new DataStore();
        }
        return DataStore.instance;
    }

    constructor() {
        this.map = new Map();
    }

    put(key, value) {
        // 用于简化写法，Background => new Background()
        if (typeof value === 'function') {
            value = new value();
        }
        this.map.set(key, value);
        // 用于链式操作
        return this;
    }

    get(key) {
        return this.map.get(key);
    }

    destroy() {
        for (let value of this.map.values()) {
            value = null;
        }
    }
}