
// Função para inserir o nome do usuário logado no dashboard
var user = localStorage.getItem('user')
if (user) {
    const paragrafo = document.createElement('p');
    const parsedUser = JSON.parse(user)
    paragrafo.innerText =  document.getElementsByClassName('user').innerText = `Welcome, ${parsedUser.name} (${parsedUser.role})`

    const container = document.getElementsByClassName('user')[0];

    // Adiciona o parágrafo como filho do container
    container.insertBefore(paragrafo, container.firstChild);

}

// Função para fazer logout

var logoutButton = document.getElementById('logoutBtn');

logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('user');
    localStorage.removeItem('remember-login');
    window.location.href = './index.html';
});

// Função para ordenar os elementos da tabela

function sortTable(value){

    let sorters = {
        name : function(a,b) {
            return ((a.name < b.name) ? -1 : ((a.name > b.name) ? 1 : 0));
        },
        id : function(a,b) {
            return (a.id - b.id);
        },
        brand : function(a,b) {
            return ((a.brand < b.brand) ? -1 : ((a.brand > b.brand) ? 1 : 0));
        },
        category : function(a,b) {
            return ((a.category < b.category) ? -1 : ((a.category > b.category) ? 1 : 0));
        }
    };

    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.sort(sorters[value]);
    localStorage.setItem('products', JSON.stringify(products));

    loadProducts();
}

// Configura o número de itens por página
const itemsPerPage = 5;

// Produtos de exemplo para adicionar ao LocalStorage
const initialProducts = [
    { id: 1, image: 'images/gbv-bee-thousand-cover.jpeg', name: 'Guided by Voices - Bee Thousand', brand: 'Matador Records', category: 'CD' },
    { id: 2, image: 'images/pavment-slanted-and-enchanted-cover.jpeg', name: 'Pavement - Slanted and Enchanted', brand: 'Domino Recording Co', category: 'MP3' },
    { id: 3, image: 'images/neutral-milk-hotel-in-the-aeroplane-over-the-sea-tshirt.jpeg', name: 'Neutral Milk Hotel T-Shirt', brand: 'Merge Records', category: 'T-Shirt' },
    { id: 4, image: 'images/indie-101-book.jpg', name: 'Indie Rock 101', brand: 'Music Books', category: 'Book' },
    { id: 5, image: 'images/jamc-poster.png', name: 'The Jesus and Mary Chain Poster', brand: 'Art & Prints', category: 'Poster' },
    { id: 6, image: 'images/mbv-loveless-cd.jpeg', name: 'My Bloody Valentine - Loveless', brand: 'Creation Records', category: 'CD' },
    { id: 7, image: 'images/yo-la-tengo-you-can-hear-heart-beating-as-one-mp3.jpeg', name: 'Yo La Tengo - I Can Hear the Heart Beating as One', brand: 'Matador Records', category: 'MP3' },
    { id: 8, image: 'images/sonic-youth-washing-machine-tshirt.jpeg', name: 'Sonic Youth T-Shirt', brand: 'Geffen Records', category: 'T-Shirt' },
    { id: 9, image: 'images/our-band-could-be-your-life-book.jpeg', name: 'Our Band Could Be Your Life', brand: 'Indie Publishing', category: 'Book' },
    { id: 10, image: 'images/velvet-underground-poster.jpeg', name: 'The Velvet Underground Poster', brand: 'Classic Prints', category: 'Poster' }
];


// Salva os produtos iniciais no LocalStorage caso ainda não estejam salvos
if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(initialProducts));
}

// Função para carregar produtos da página atual
function loadProducts(page = 1) {
    renderProducts(page);
    renderPagination();
}

// Renderiza a lista de produtos na tabela
function renderProducts(page) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Limpa a tabela

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, products.length);

    for (let i = startIndex; i < endIndex; i++) {
        const product = products[i];
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${product.id}</td>
            <td><img src="${product.image}" alt="${product.name}" style="width: 100px; height: 100px;"></td>
            <td>${product.name}</td>
            <td>${product.brand}</td>
            <td>${product.category}</td>
            <td>
                <button>View Details</button>
                <button>Edit</button>
                <button class="delete-btn" onclick="deleteProduct(${i})">Delete</button>
            </td>
        `;
        productList.appendChild(row);
    }
}

// Função para deletar um produto
function deleteProduct(index) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    
    // Remove o item do array e atualiza o localStorage
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));

    // Recarrega os produtos da página atual após deletar o item
    loadProducts();
}

// Renderiza a paginação
function renderPagination() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    for (let page = 1; page <= totalPages; page++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = page;
        pageButton.onclick = () => loadProducts(page);
        paginationContainer.appendChild(pageButton);
    }
}

// Carrega a primeira página ao iniciar
loadProducts();

