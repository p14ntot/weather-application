export const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';

export const geoApiOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '08d2014a21mshb4b8f04ce5f0062p163cd6jsn780240672ed0',
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
};

// try {
// 	const response = await fetch(url, geoApiOptions);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }