/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 *
 */
let baseUrl = 'http://localhost:10086';
let routerMode = 'hash';
let baseImgPath='http://localhost:10086/images/';
let filePath ='http://localhost:10086/upload/download/';

export {
	baseUrl,
	routerMode,
	baseImgPath,
    filePath
}
