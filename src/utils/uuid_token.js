import { v4 as uuidv4 } from 'uuid';
// 要生成一个随机字符串，且每次执行不发生变化，游客身份持久存储localStorage
export const getUUID=()=>{
    // 先从本地存储获取uuid--（看一下本地存储是否有）
    let uuid_token=localStorage.getItem('UUIDTOKEN');
    // 如果没有，生成一个
    if( !uuid_token ){
        // 生成游客身份
        uuid_token = uuidv4();
        // 本次存储一次
        localStorage.setItem('UUIDTOKEN',uuid_token);
    }
    return uuid_token;
}