const url = 'https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72'; //endereço da API
const quartos = document.getElementById('quartos'); //div onde entrará os cards com as infos da API
let dados = []; //variável que receberá o JSON da API

let itenstotais = 0;


async function fetchjson() { //o fetch faz a requisição da API  
  try {
    const response = await fetch(url);
    const jsonData = await response.json(); //converte o resultado para JSON

    return jsonData; //devolve o resultado no formato json
  } 
  catch(e){
    console.log(e);
  }
  	
}


function separarinfos(objeto){ 	//recebe um objeto JSON
	quartos.innerHTML = ""; 	// limpa a div que irá receber as informações
	let indice = 0;				//começa a contagem do índice para percorrer o objeto
	itenstotais = 0;			// zera a quantidade de itens encontrados para recomeçar

	while (objeto[indice] != undefined){	//verifica se o índice é válido e percorre todos
		criarcard(objeto[indice]);			//joga a informação daquele índice para a função criarcard
		indice++;							
	}
	exibirtotal();				//exibe o número total de itens encontrados
}


function criarcard(infos){		//recebe a informação para um card	

	let coluna = document.createElement('div');
	coluna.setAttribute('class', 'col-md-6 col-lg-4 margem_baixo');

	let card = document.createElement('div');
	card.setAttribute('class', 'card resultado text-center bg-light border-secondary');

	let imagem = document.createElement('img');
	imagem.setAttribute('class', 'card-img-top');
	imagem.setAttribute('src', infos.photo);

	let cardbody = document.createElement('div');
	cardbody.setAttribute('class', 'card-body');

	let titulo = document.createElement('h4');
	titulo.setAttribute('class', 'card-title');
	titulo.innerHTML = infos.name;

	let tipo = document.createElement('p');
	tipo.setAttribute('class', 'card-subtitle text-muted margem_texto');
	tipo.innerHTML = infos.property_type;

	let preco = document.createElement('h4');
	preco.setAttribute('class', 'card-footer bg-transparent');
	preco.innerHTML = `R$ ${infos.price}/noite`;

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

	itenstotais++;		//conta o total de itens exibidos


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
	
}


function exibirtotal(){
	var divtotal = document.createElement('div');
	divtotal.setAttribute('id', 'total');
	divtotal.setAttribute('class', 'col-md-12 text-right text-muted')
	divtotal.innerHTML = `<p>Foram encontrados ${itenstotais} resultados.</p>`;
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




