// Selecciono la parte del contenido
const contentYoutube = null || document.getElementById('content-youtube')
const contentImdb = null || document.getElementById('content-imdb')
// Guardo la url de la API
const APIyoutube = 'https://youtube-v31.p.rapidapi.com/search?channelId=UC-5MT-BUxTzkPTWMediyV0w&part=snippet%2Cid&order=date&maxResults=8';
const APIimdb = 'https://imdb-top-100-movies.p.rapidapi.com/';
// Opciones por defecto de RapidAPI para Youtube
const optionsYoutube = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '50254dd43dmsh38fdebeb3525ba9p1e7991jsnb4d98105266d',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};
// Opciones por defecto de RapidAPI para IMDb
const optionsImdb = {
  method: 'GET',
	headers: {
		'X-RapidAPI-Key': '50254dd43dmsh38fdebeb3525ba9p1e7991jsnb4d98105266d',
		'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
	}
}

// Función asincrona para obtener los videos y convertirlos a forma .json
async function fetchData(urlApi, options) {
    try {
        const response = await fetch(urlApi, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

// Función asincrónica que se llama en el momento para escribir de forma dinámica en el DOM los videos y las películas
(async () => {
  try {
    // Obtener los datos de la API de YouTube y almacenarlos en la variable "videos"
    const videos = await fetchData(APIyoutube, optionsYoutube)
    // Crear una cadena de texto utilizando la función map() y slice() para recortar el array del primer al octavo elemento
    let view = `${videos.items.slice(0,8).map(video => `
      <a class="group relative" href="https://www.youtube.com/watch?v=${video.id.videoId}">
        <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
          <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
        </div>
        <div class="mt-4 flex justify-between">
          <h3 class="text-sm text-gray-700">
            <span aria-hidden="true" class="absolute inset-0"></span>
            ${video.snippet.title}
          </h3>
        </div>
      </a>
    `).join('')}`
    // Mostrar los videos en el DOM
    contentYoutube.innerHTML = view

    // Obtener los datos de la API de IMDB y almacenarlos en la variable "movies"
    const movies = await fetchData(APIimdb, optionsImdb)
    // Crear una cadena de texto utilizando la función map() y slice() para recortar el array del primer al octavo elemento
    view = `${movies.slice(0,8).map(movie => `
      <div class="group relative">
        <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
          <img src="${movie.image}" alt="${movie.title}" class="w-full">
        </div>
        <div class="mt-4 flex justify-between">
          <h3 class="text-sm text-gray-700">
            <span aria-hidden="true" class="absolute inset-0"></span>
            ${movie.title}
          </h3>
        </div>
      </div>
    `).join('')}`
    // Mostrar las películas en el DOM
    contentImdb.innerHTML = view
  } catch (error) {
    console.log(error)
  }
})()