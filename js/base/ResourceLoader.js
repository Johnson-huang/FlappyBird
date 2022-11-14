// 资源文件加载器，确保 canvas 在图片资源加载完成后才进行渲染
import {Resources} from "./Resources";

export class ResourceLoader {
    constructor() {
        this.map = new Map(Resources)
        for (let [key, value] of this.map) {
            const image = wx.createImage();
            image.src = value;
            this.map.set(key, image);
        }
    }

    onLoaded(callback) {
        let loadedCount = 0;
        // 给 map 中每个 image 对象增加一个 onload 事件
        // 通过 onload 事件触发全部 image 对象加载完成的 callback
        for (let value of this.map.values()) {
            value.onload = () => {
                loadedCount++;
                if (loadedCount >= this.map.size) {
                    callback(this.map);
                }
            }
        }
    }

    static create() {
        return new ResourceLoader();
    }
}