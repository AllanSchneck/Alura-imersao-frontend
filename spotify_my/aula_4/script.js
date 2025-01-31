const searchInput = document.getElementById('search-input'); //AQUI INSERIMO UMA CONSTANTE QUE RECEBE OQ O USUÁRIO ESCREVER COM ID SEARCH-INPUT
const resultArtist = document.getElementById("result-artist"); //AQUI INSERIMOS UMA CONSTANTE QUE RECEBE O RESULTADO DO ARTISTA COM ID RESULT-ARTIST no caso esta div
const resultPlaylist = document.getElementById('result-playlists'); //aqui inserimos uma constante que recebe o resultado das playlists com id result-playlist no caso esta div irá ser usada para aparecer

function requestApi(searchTerm) { //aqui estamos adicionando como parametro o serchTerm que é o retorno da nossa função de document.addEventListener para retornar o valor lower case e aplicar nosso css
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`
    fetch(url) // fetch é utilizado para permitir o crud
        .then((response) => response.json()) //then seria como await porém retorna mesmo que errada aqui ela ira devolcer a resposta ao fetch no caso retornsa resposta em formato json
        .then((result) => displayResults(result)) // aqui seria para mostrar os resultados para podermos trabalhar como seria a playlist etc no caso outra função
        .catch((error) => console.error('Erro ao buscar artistas:', error));
    }   

function displayResults(result) {
    resultPlaylist.classList.add("hidden") //aqui estamos escondendo o resultPLaylist adicionando a classe hidden
    const artistName = document.getElementById('artist-name'); //aqui estamos pegamando o elemento de css para criar  conforme os futuros parametros da url
    const artistImage = document.getElementById('artist-img');  //aqui estamos pegamando o elemento de css para criar  conforme os futuros parametros da url

    result.forEach(element => {
        artistName.innerText = element.name;//Aqui estamos pegando o resultado conforme oque a api nos entrega
        artistImage.src = element.urlImg;//Aqui estamos pegando o resultado conforme oque a api nos entrega com esses nomes
    });

    resultArtist.classList.remove('hidden');//e aqui removemos o hidden para mostrar os aristas para nó
}


document.addEventListener('input',  () => { //isso aqqui serve para escutar evento na hora que este evento acontecer nós teremos esta logica executando na tela
    // e nesta função de event listener iremos receber outra função como parametro
    // aero function () => {} e function() {}	
    const searchTerm = searchInput.value.toLowerCase(); //aqui ele recebera o valor do search input para lower case tudo minuscúlo
    if (searchTerm === '') { //se search term for igual a vazio ele irá adicionar a classe hidden no result artist e remover no result playlist
        resultPlaylist.classList.add('hidden'); //isso serve para pegar a classe hidden e adiciona ela sobrepondo o id de css
        resultArtist.classList.remove('hidden'); //isso serve para pegar a classe hidden de artists e remover para assim mostrar na tela
        return
    }
    
    requestApi(searchTerm);// se não ele irá chamar a função requestApi passando o search term como parametro
})
