const url = 'https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72'; //endereço da API
var quartos = document.getElementById('quartos'); //div onde entrará os cards com as infos da API
let dados = []; //variável que receberá o JSON da API

var nlinhas = 1;
var ncol = 1;
var linha;
var itenstotais = 0;


async function fetchjson() { //o fetch faz a requisição da API  
  try {
    const fetchResult = fetch(url)
    const response = await fetchResult;
    const jsonData = await response.json(); //converte o resultado para JSON

    return jsonData; //devolve o resultado no formato json

  } 
  catch(e){
    console.log(e);
  }
  	
}

function separarinfos(objeto){ 	//recebe um objeto JSON
	quartos.innerHTML = ""; 	// limpa a div que irá receber as informações
	nlinhas = 1;				//começa a contagem do número de linhas
	ncol = 1;					//começa a contagem do número de colunas
	var indice = 0;				//começa a contagem do índice para percorrer o objeto

	while (objeto[indice] != undefined){	//verifica se o índice é válido e percorre todos
		criarcard(objeto[indice]);			//joga a informação daquele índice para a função criarcard
		indice++;							
	}
	exibirtotal();				//exibe o número total de itens encontrados
}



function criarcard(infos){		//recebe a informação de um card	

	if (ncol > 3){				//haverá 3 colunas, se surgir uma quarta, cria mais uma linha
		ncol = 1;				//e a coluna volta a ser a primeira daquela linha
		nlinhas++;
	}

	if (ncol == 1){											//se for a primeira coluna, então cria a linha para ela
		linha = document.createElement('div');
		linha.setAttribute('class', 'row card-group linhadocard');
		linha.setAttribute('id', 'linha ' + nlinhas)
		quartos.appendChild(linha);							//salva a linha dentro da div quartos que está no html
	}

	var coluna = document.createElement('div');
	coluna.setAttribute('class', 'col-md-4 borda_baixo');

	var card = document.createElement('div');
	card.setAttribute('class', 'card resultado text-center bg-light border-secondary');

	var imagem = document.createElement('img');
	imagem.setAttribute('class', 'card-img-top');
	imagem.setAttribute('src', infos.photo);

	var cardbody = document.createElement('div');
	cardbody.setAttribute('class', 'card-body');

	var titulo = document.createElement('h3');
	titulo.setAttribute('class', 'card-title');
	titulo.innerHTML = infos.name;

	var tipo = document.createElement('h5');
	tipo.setAttribute('class', 'card-subtitle text-muted');
	tipo.innerHTML = 'Tipo: ' + infos.property_type;

	var preco = document.createElement('h4');
	preco.setAttribute('class', 'card-footer bg-transparent');
	preco.innerHTML = 'Preço: R$' + infos.price;

	/*
	Na linha, é criada uma coluna.
	Cada coluna tem uma div card.
	O card contém imagem, cardbody e footer(preco).
	O cardbody contém título e subtítulo(tipo).
	*/
	card.appendChild(imagem);
	cardbody.appendChild(titulo);
	cardbody.appendChild(tipo);	
	card.appendChild(cardbody);
	card.appendChild(preco);
	coluna.appendChild(card);
	linha.appendChild(coluna);

	ncol++;				//incrementa o número da coluna
	itenstotais++;		//conta o total de itens exibidos
	
}


function exibirtotal(){
	var divtotal = document.createElement('div');
	divtotal.setAttribute('id', 'total');
	divtotal.setAttribute('class', 'text-right text-muted')
	divtotal.innerHTML = '<p>Foram encontrados ' + itenstotais + ' resultados.</p>';
	quartos.appendChild(divtotal);
}

async function main(){
	dados = await fetchjson(); //salva o json da função fetchjson na variável dados

	if (dados[0]){
		separarinfos(dados); //se for válido, envia os dados para a função separarinfos
	}
}

//chamada para executar a função principal
main(); 


