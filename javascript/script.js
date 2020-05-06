const url = 'https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72';
var quartos = document.getElementById('quartos');
let dados = [];
var linhas = 1;
var x = 1;


async function fetchjson() {
  
  try {
    const fetchResult = fetch(url)
    const response = await fetchResult;
    const jsonData = await response.json();
		
    
    console.log(jsonData);

    console.log(jsonData[0]);

    console.log(jsonData[0].name);

    

    return jsonData;

  } catch(e){
    console.log(e);

  }
  	
}



function criarcard(infos){
	quartos.innerHTML = "";
	linhas = 1;
	x = 1;
	var indice = 0;

	while (infos[indice] != undefined){

		if (x > 3){
			x = 1;
			linhas++;
		}
		var linha;
		if (x == 1){
			linha = document.createElement('div');
			linha.setAttribute('class', 'row card-group');
			linha.setAttribute('id', 'linha ' + linhas)
			quartos.appendChild(linha);
		}

		var coluna = document.createElement('div');
		coluna.setAttribute('class', 'col-md-4 borda_baixo');

		var card = document.createElement('div');
		card.setAttribute('class', 'card resultado text-center bg-light border-secondary');

		var imagem = document.createElement('img');
		imagem.setAttribute('class', 'card-img-top');
		imagem.setAttribute('src', infos[indice].photo);

		var cardbody = document.createElement('div');
		cardbody.setAttribute('class', 'card-body');

		var titulo = document.createElement('h3');
		titulo.setAttribute('class', 'card-title');
		titulo.innerHTML = infos[indice].name;

		var tipo = document.createElement('h5');
		tipo.setAttribute('class', 'card-subtitle text-muted');
		tipo.innerHTML = 'Tipo: ' + infos[indice].property_type;

		var preco = document.createElement('h4');
		preco.setAttribute('class', 'card-footer bg-transparent');
		preco.innerHTML = 'Preço: R$' + infos[indice].price;

		card.appendChild(imagem);
		cardbody.appendChild(titulo);
		cardbody.appendChild(tipo);
		
		card.appendChild(cardbody);
		card.appendChild(preco);
		coluna.appendChild(card);
		linha.appendChild(coluna);

		x++;
		indice++;
	}
}


async function main(){
	dados = await fetchjson();

	if (dados[0]){
		criarcard(dados);
	}
}

main();

