export const environment = {
	production: true,
	apiUrl: 'https://localhost:8080',

	tokenAllowedDomains: [ new RegExp('localhost:8080')],
	tokenDisallowedRoutes: [ new RegExp('\/oauth\/token')]

};
