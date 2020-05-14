//Aula de resolução da atividade, com implementação de funcionalidades extras
// github do Pedro Sato com o código demonstrado em aula: PedroSato/hiring-coder-fake-airbnb

const url = 'https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72'; //endereço da API
const quartos = document.getElementById('quartos'); //div onde entrará os cards com as infos da API

let itenstotais = 0;

let ordenada; //guardar os resultados ordenados de acordo com o filtro
let apiData;
let paginatedData;

//Para receber a API
const fetchAPI = async (urlApi) => {
	let response = await fetch(urlApi);
	const textResponse = await response.text();
	return JSON.parse(textResponse);			//devolve a api no formato JSON
}


//Para paginar os dados
let currentPage = 1;
const ITENS_PER_PAGE = 12;

const paginateData = (data) => {
	itenstotais = 0;
	return data.reduce((total, current, index) => { //o reduce percorre todo o array
		const belongArrayIndex = Math.ceil((index + 1) / ITENS_PER_PAGE)-1; //calcula em qual página deve ficar a posição atual
		total[belongArrayIndex] ? total[belongArrayIndex].push(current) : total.push([current]); //acrescenta o valor atual dentro do array paginado		
		itenstotais++;
		return total;
	}, [])
}


//Para criar o menu de navegação entre as páginas do resultado
const renderPaginationMenu = (paginatedData) =>{
	const paginationContainer = document.querySelector('.pagination'); //pega a div com a classe pagination

	//para limpar a div:
	while (paginationContainer.firstChild){
		paginationContainer.removeChild(paginationContainer.firstChild);
	}
/*
// Código passado em aula:
	//botão de voltar
	const previousPage = document.createElement('span');
	previousPage.className = 'page-changer';
	previousPage.innerHTML = '<';
	previousPage.addEventListener('click', () =>
		currentPage <= 1 ? () => {} : changePage(currentPage - 1) //se for <= 1, passa uma função vazia, pq não pode voltar
	);
	paginationContainer.appendChild(previousPage);

	//botões das páginas
	paginatedData.forEach((_, index) =>{
		const pageButton = document.createElement('span');
		pageButton.innerHTML = index + 1;
		pageButton.addEventListener('click', () => changePage(index+1));
		if (currentPage === index + 1){
			pageButton.className = 'active';
		}
		paginationContainer.appendChild(pageButton);
	})

	//botão de avançar
	const nextPage = document.createElement('span');
	nextPage.className = 'page-changer';
	nextPage.innerHTML = '>';
	nextPage.addEventListener('click', () => currentPage >= paginatedData.length ? () => { } : changePage(currentPage + 1) //se for <= o total de páginas, passa uma função vazia, pq não pode avançar
	);
	paginationContainer.appendChild(nextPage);
*/


	//botão de voltar
	const previousPage = document.createElement('div');
	previousPage.setAttribute('class', 'page-item btn border');
	previousPage.innerHTML = '<';
	previousPage.addEventListener('click', () =>
		currentPage <= 1 ? () => {} : changePage(currentPage - 1), //se for <= 1, passa uma função vazia, pq não pode voltar
	);
	if (currentPage === 1){
		previousPage.disabled = true;
		previousPage.style.cursor = 'default';
	}
	paginationContainer.appendChild(previousPage);

	//botões das páginas
	paginatedData.forEach((_, index) =>{
		const pageButton = document.createElement('div');
		pageButton.setAttribute('class', 'page-item btn border');
		pageButton.innerHTML = index + 1;
		pageButton.addEventListener('click', () => 
			currentPage === index + 1 ? () => {} : changePage(index+1)
		);
		if (currentPage === index + 1){
			pageButton.setAttribute('class', 'page-item btn list-group-item-danger border');
			pageButton.disabled = true;
			pageButton.style.cursor = 'default';
		}
		paginationContainer.appendChild(pageButton);
	})

	//botão de avançar
	const nextPage = document.createElement('div');
	nextPage.setAttribute('class', 'page-item btn border');
	nextPage.innerHTML = '>';
	nextPage.addEventListener('click', () =>
		currentPage >= paginatedData.length ? () => {} : changePage(currentPage + 1), //se for <= o total de páginas, passa uma função vazia, pq não pode avançar
	);
	if (currentPage >= paginatedData.length){
		nextPage.disabled = true;				//desativa o botão caso não seja possível avançar
		nextPage.style.cursor = 'default';		//deixa o mouse com ponteiro normal
	}
	paginationContainer.appendChild(nextPage);

}


//método para trocar de página, informa qual página deve ser exibida:
const changePage = (pageToBeRendered) => {
	currentPage = pageToBeRendered;
	criarcards();
}


//Para criar os cards - função dividida para implementar os filtros sem buscar novamente os dados
const renderPage = async () =>{
	apiData = await fetchAPI(url);

	paginatedData = paginateData(apiData); //recebe os dados paginados, divididos em arrays dentro de um array
	criarcards();
}

const criarcards = () => {
	quartos.innerHTML = "";

	renderPaginationMenu(paginatedData); //para puxar o menu de navegação entre as páginas

//	apiData.forEach(property => {		//para cada propriedade da API, faz o código abaixo (gera do total, sem paginação)
	
	if (paginatedData[0] != undefined){
	paginatedData[currentPage - 1].forEach(property => {

		const { name, photo, price, property_type } = property;

		let coluna = document.createElement('div');
		coluna.setAttribute('class', 'col-md-6 col-lg-4 margem_baixo');

		let card = document.createElement('div');
		card.setAttribute('class', 'card resultado text-center bg-light border-secondary');

		let imagem = document.createElement('img');
		imagem.setAttribute('class', 'card-img-top');
		imagem.setAttribute('src', photo);

		let cardbody = document.createElement('div');
		cardbody.setAttribute('class', 'card-body');

		let titulo = document.createElement('h4');
		titulo.setAttribute('class', 'card-title');
		titulo.innerHTML = name;

		let tipo = document.createElement('p');
		tipo.setAttribute('class', 'card-subtitle text-muted margem_texto');
		tipo.innerHTML = property_type;

		let preco = document.createElement('h5');
		preco.setAttribute('class', 'card-footer bg-transparent');
		preco.innerHTML = `R$${price.toFixed(2)}/noite`;

		let coracao = document.createElement('img');
		coracao.setAttribute('src', 'imagens/coracao1.png');
		coracao.setAttribute('class', 'imgcoracao');
		coracao.setAttribute('align', 'right');

		/*
		Na linha, é criada uma coluna.
		Cada coluna tem uma div card.
		O card contém imagem, cardbody e footer(preco).
		O cardbody contém título e subtítulo(tipo).
		*/
		card.appendChild(imagem);
		cardbody.appendChild(coracao);
		cardbody.appendChild(tipo);	
		cardbody.appendChild(titulo);	
		card.appendChild(cardbody);
		card.appendChild(preco);
		coluna.appendChild(card);
		quartos.appendChild(coluna);

		card.onmouseover = function (){
			card.style.boxShadow = "8px 8px 20px rgb(255, 26, 60)";
		}

		card.onmouseout = function (){
			card.style.boxShadow = "5px 5px 15px rgb(150, 150, 150)";
		}

		coracao.onclick = function(){
			if ((coracao.src).match('coracao1.png') == 'coracao1.png'){ //dentro do caminho do src, procura o nome do arquivo
				coracao.src = 'imagens/coracao2.png';
			}
			else{
				coracao.src = 'imagens/coracao1.png';
			}
		}
	})
	}
	exibirtotal();				//exibe o número total de itens encontrados
}

function exibirtotal(){
	var divtotal = document.createElement('div');
	divtotal.setAttribute('id', 'total');
	divtotal.setAttribute('class', 'col-md-12 text-right text-muted')
	divtotal.innerHTML = `<p>Foram encontrados ${itenstotais} resultados.</p>`;
	quartos.appendChild(divtotal);
}

renderPage();



//filtros de ordenação
function ordemAZ(){
	ordenada = apiData.sort(function (a, b) {
		return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)
	});
	currentPage = 1;
	paginatedData = paginateData(ordenada);
	criarcards();
}

function ordemZA(){
	ordenada = apiData.sort(function (a, b) {
		return (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0)
	});
	currentPage = 1;
	paginatedData = paginateData(ordenada);
	criarcards();
}

function ordemMenorPreco(){
	ordenada = apiData.sort(function (a, b) {
		return (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0)
	});
	currentPage = 1;
	paginatedData = paginateData(ordenada);
	criarcards();
}

function ordemMaiorPreco(){
	ordenada = apiData.sort(function (a, b) {
		return (a.price < b.price) ? 1 : ((b.price < a.price) ? -1 : 0)
	});
	currentPage = 1;
	paginatedData = paginateData(ordenada);
	criarcards();
}

function ordemTipo(){
	ordenada = apiData.sort(function (a, b) {
		return (a.property_type > b.property_type) ? 1 : ((b.property_type > a.property_type) ? -1 : 0)
	});
	currentPage = 1;
	paginatedData = paginateData(ordenada);
	criarcards();
}




//função de filtragem dos lugares pelo nome
const filterPlaces = (input, places) => {
    //os dois parâmetros esperados são:
    //input => o input completo html selecionado através do método: document.querySelector(#ID_DO_INPUT)
    //places => um array com todos os lugares, no nosso caso nossa resposta da API

    //essa função transforma os valores do nome do lugar e do input de filtragem para caixa baixa,
    //e através do método de strings "includes" verifica se a string inicial possui a substring passada pelo método
    //Ex: "mansão maravilhosa nas ilhas maldivas".includes("ilha") retornará true
    //portanto utilizamos o método "filter" no array dos valores vindos da API para filtrar apenas aqueles valores que contém
    //a substring passada no input
    //ps: a função de arrays "filter" gerará um novo array apenas com os valores que retornarem true na função passada como parâmetro
    //Ex: [1,2,3,4,5,6,6,7,8,9,10].filter((number)=> number > 6) retornará [7,8,9,10]

    //mais sobre filter e includes:
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
    return places.filter(place => place.name.toLowerCase().includes(input.value.toLowerCase()))
}


//evento de click no botão de busca pelo filtro
const searchButton = document.querySelector('#search-button')
searchButton.addEventListener('click', async () => {
	const searchInput = document.querySelector('#filter')	
	let filteredApiData = []
	apiData = await fetchAPI(url);		//renova o resultado da API, para não fazer busca dentro da busca anterior
    filteredApiData = filterPlaces(searchInput, apiData);	
    apiData = filteredApiData;			//joga o resultado da busca para a variavel dos dados, para ser identificada pelos filtros
    currentPage = 1;
    paginatedData = paginateData(apiData); //recebe os dados paginados, divididos em arrays dentro de um array
	criarcards();	
})



//inserção de Google Maps - falta inserir o script do Google Maps no html - precisa de chave
function initMap() {
    const locations = [
        ['Avenida Paulista', -23.563311, -46.654275, 5],
        ['Gama Academy', -23.567427, -46.684607, 4],
        ['Marco Zero', -23.550460, -46.633934, 3],
        ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
        ['Maroubra Beach', -33.950198, 151.259302, 1]
    ];

    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: new google.maps.LatLng(-23.550460, -46.633934),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    const infowindow = new google.maps.InfoWindow();

    let marker, i;

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map
        });

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
}
//função gerada pelo google, a alteração que eu fiz foi: criar locations para serem renderizadas no mapa e ao invés de renderizar
//apenas um marcador, iteramos por esse array e renderizamos um marcador para cada localidade