// Selecciono la parte del contenido
const content = null || document.getElementById('content')
// Guardo la url de la API
const url = 'https://youtube-v31.p.rapidapi.com/search?channelId=UC-5MT-BUxTzkPTWMediyV0w&part=snippet%2Cid&order=date&maxResults=5';
// Opciones por defecto de RapidAPI
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '50254dd43dmsh38fdebeb3525ba9p1e7991jsnb4d98105266d',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

// Función asincrona para obtener los videos y convertirlos a forma .json
async function fetchVideos() {
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

// Función asincrona que se llama en el momento para escribir de forma dinámica en el DOM los videos
(async () => {
  try {
    const videos = await fetchVideos()
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
      `).slice(0,4).join('')}
    `;
    /* 
    Para los videos, recorto del primer al quinto video usando slice(0,4), y join('') para juntar nuevamente el view.
    */
    content.innerHTML = view
  } catch (error) {
    console.log(error)
  }
})()