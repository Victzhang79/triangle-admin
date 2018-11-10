const ONLINE_DOMAIN = '/';
const DEV_DOMAIN = 'http://apimanage.58corp.com/';
const DOMAIN =
	process.env.NODE_ENV == 'production' ? ONLINE_DOMAIN : DEV_DOMAIN;

export default DOMAIN;