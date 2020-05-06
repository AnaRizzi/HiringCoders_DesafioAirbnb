const texto = document.getElementById('teste');


function renderList(json) {
  const posts = json.data.children;
  return '<ol>'
    ${posts.map(post => '<li>${post.data.name} <a href=# target='_blank'>post.data.property_type:</a></li>').join('')}
	'</ol>';
}


async function quartos() {
  const url = 'https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72';
  try {
    const fetchResult = fetch(url)
    const response = await fetchResult;
    const jsonData = await response.json();
    console.log(jsonData);
    return jsonData;

  } catch(e){
    throw Error(e);
  }
}