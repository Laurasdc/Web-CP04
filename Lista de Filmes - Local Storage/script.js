const filmes = [
  { id: 0, nome: 'Harry Potter' },
  { id: 1, nome: 'Avatar' },
  { id: 2, nome: 'O Senhor dos Anéis' },
  { id: 3, nome: 'Branquelas' },
  { id: 4, nome: 'A Lagoa Azul' }
];

let filmesFavoritos = [];

const listaFilmes = document.getElementById('listaFilmes');
const btnAdicionar = document.querySelector('button');

function renderizarLista() {
  listaFilmes.innerHTML = ''; 

  filmes.forEach(filme => {
    const item = document.createElement('li');
    item.innerHTML = filme.nome;

    const iconeFavorito = document.createElement('img');
    iconeFavorito.src = filmesFavoritos.includes(filme.id) ? 'img/heart-fill.svg' : 'img/heart.svg';
    iconeFavorito.style.cursor = 'pointer'; 
    iconeFavorito.style.width = '20px'; 

    iconeFavorito.addEventListener('click', () => {
      if (filmesFavoritos.includes(filme.id)) {
        filmesFavoritos = filmesFavoritos.filter(favId => favId !== filme.id);
        iconeFavorito.src = 'img/heart.svg'; 
      } else {
        filmesFavoritos.push(filme.id);
        iconeFavorito.src = 'img/heart-fill.svg'; 
      }

      localStorage.setItem('favoritos', JSON.stringify(filmesFavoritos));
    });

    item.appendChild(iconeFavorito);
    listaFilmes.appendChild(item);
  });
}

window.onload = () => {
  const favoritosSalvos = localStorage.getItem('favoritos');
  if (favoritosSalvos) {
    filmesFavoritos = JSON.parse(favoritosSalvos);
  }
  renderizarLista();
};

btnAdicionar.addEventListener('click', () => {
  const inputFilme = document.getElementById('filmeInput').value;
  const novoFilme = { id: filmes.length, nome: inputFilme };

  filmes.push(novoFilme);
  renderizarLista();
  document.getElementById('filmeInput').value = ''; 
});
