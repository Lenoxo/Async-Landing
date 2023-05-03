// Selecciono la parte del contenido
const contentYoutube = null || document.getElementById('content-youtube')
const contentImdb = null || document.getElementById('content-imdb')
// Guardo la url de la API
const APIyoutube = 'https://youtube-v31.p.rapidapi.com/search?channelId=UC-5MT-BUxTzkPTWMediyV0w&part=snippet%2Cid&order=date&maxResults=8';
const APIimdb = 'https://imdb-top-100-movies.p.rapidapi.com/';
// Opciones por defecto de RapidAPI
const optionsYoutube = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': RAPIDAPIKEY,
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};
const optionsImdb = {
  method: 'GET',
	headers: {
		'X-RapidAPI-Key': '50254dd43dmsh38fdebeb3525ba9p1e7991jsnb4d98105266d',
		'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
	}
}
// Opciones por defecto de RapidAPI

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

// Función asincrona que se llama en el momento para escribir de forma dinámica en el DOM los videos
(async () => {
  try {
    const videos = await fetchData(APIyoutube, optionsYoutube)
    let view = `
      ${videos.items.map(video => `
      <div class="group relative">
        <div
          class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
          <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
        </div>
        <div class="mt-4 flex justify-between">
          <h3 class="text-sm text-gray-700">
            <span aria-hidden="true" class="absolute inset-0"></span>
            ${video.snippet.title}
          </h3>
        </div>
      </div>
      `).slice(0,8).join('')}
    `;
    /* 
    Para los videos, recorto del primer al quinto video usando slice(0,4), y join('') para juntar nuevamente el view.
    */
    contentYoutube.innerHTML = view
    console.log(videos)
    const movies = await fetchData(APIimdb, optionsImdb)
    console.log(movies)
    view = `
    ${movies.map(movie => `
    <div class="group relative">
      <div
        class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
        <img src="${movie.image}" alt="${movie.title}" class="w-full">
      </div>
      <div class="mt-4 flex justify-between">
        <h3 class="text-sm text-gray-700">
          <span aria-hidden="true" class="absolute inset-0"></span>
          ${movie.title}
        </h3>
      </div>
    </div>
    `).slice(0,8).join('')}
  `;
    contentImdb.innerHTML = view
  } catch (error) {
    console.log(error)
  }
})()
