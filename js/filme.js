const apiKey = '4188759ec935272c236d27f5b0009d50';

document.addEventListener('DOMContentLoaded', () => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=1`)
    .then(response => response.json())
    .then(data => displayMovies(data.results))
    .catch(error => console.error('Erro ao carregar filmes populares', error))
})

function searchMovies() {
    const query = document.getElementById('searchInput').value;
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&query=${query}`)
    .then(response => response.json())
    .then(data => displayMovies(data.results))
    .catch(error => console.error('Erro ao buscar filmes', error));
}

function displayMovies(movies){
    const container = document.getElementById('filme');
    container.innerHTML = '';
    movies.forEach(movie => {
        const col = document.createElement('div');
        col.className = 'col-md-4';
        col.innerHTML = `
        <div class="card">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top" alt="${movie.title}">
            <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">${movie.overview ? movie.overview.substring(0, 100) +
            '...': 'Sem sinopse disponível.'}</p>
            <button class="btn btn-outline-primary" onclick="saveFavorite(${movie.id})
            ">Favoritar</button>
            </div>
        </div>
        `;
        container.appendChild(col);
    })

}



function mostrarFavoritos(){
    const carrinho = JSON.parse(localStorage.getItem("filme")) || [];
    const container = document.getElementById("filme");
    container.innerHTML = "";
    carrinho.forEach((produto, index) => {
        const item = document.createElement("div");
        item.innerHTML = `
        <p> ${produto.nome}
        <button onclick="removerProduto(${index})">Remover</button></p>`;
        container.appendChild(item);
    });
}

