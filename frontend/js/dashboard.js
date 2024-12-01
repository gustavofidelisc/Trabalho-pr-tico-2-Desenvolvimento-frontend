// função para obter produtos da API
async function fetchProducts(page, size=5, sort='id') {

    const base_url = 'http://127.0.0.1:8080/products?';
    var products = [];

    const url_with_params = base_url + new URLSearchParams({
        "page": page,
        "size": size,
        "sort": sort
    }).toString();

    const resp = await fetch(url_with_params, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Basic '+btoa('rey:rey-pass'), 
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    });

    if (resp.ok) {
        products = await resp.json();
    }else{
        console.log("Algo deu errado! Código de Resposta: ", resp.status);
    }
    console.log(products);
    return products
}

async function fetchProductById(id){
    const base_url = 'http://127.0.0.1:8080/products/';
    var product = {};

    const url_with_param = base_url + id;

    const resp = await fetch(url_with_param, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Basic '+btoa('rey:rey-pass'), 
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    });

    if (resp.ok) {
        product = await resp.json();
    }else{
        console.log("Algo deu errado! Código de Resposta: ", resp.status);
    }

    return product;
}



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

// Função para verificar a role do usuário no localStorage
function checkUserRole() {
    // Recupera o usuário armazenado no localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    // Verifica se o usuário existe e se a role é diferente de 'admin'
    if (user && user.role !== 'admin') {
        // Seleciona todos os elementos com a classe 'admin-only' e oculta-os
        const adminButtons = document.querySelectorAll('.admin-only');
        adminButtons.forEach(button => {
            button.style.display = 'none';  // Oculta o botão
        });
    }
}

// Chama a função quando a página for carregada
window.onload = function() {
    checkUserRole();
};


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

//funcao para buscar produtos pelo nome

async function searchProduct(){
    const searchInput = document.getElementById('searchInput');
    const searchValue = searchInput.value.toLowerCase();
    let all_products = [];
    products = await fetchProducts(page=0)
    all_products.push(products['content']);
    for (let i = 0; i < products.totalPages; i++) {
        products = await fetchProducts(page=i)
        all_products = all_products.concat(products['content']);
    }
    console.log('Concatenado')
    console.log(all_products);
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchValue));
    localStorage.setItem('productsFilter', JSON.stringify(filteredProducts));
    loadProducts(1, true); 
}


// Configura o número de itens por página
const itemsPerPage = 5;

// Função para carregar produtos da página atual
function loadProducts(page = 1, filter) {
    renderProducts(page, filter);
    renderPagination(filter);
}

// Renderiza a lista de produtos na tabela
async function renderProducts(page, filter) {
    if(filter){
        var products = JSON.parse(localStorage.getItem('productsFilter')) || [];
    }
    else{
        var products = JSON.parse(localStorage.getItem('products')) || [];
    }
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Limpa a tabela

    products = await fetchProducts(page - 1)

    for (let i = 0; i < products.numberOfElements; i++) {
        const product = products['content'][i];
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${product.id}</td>
            <td><img src="${product.image}" alt="${product.name}"></td>
            <td>${product.name}</td>
            <td>${product.brand}</td>
            <td>${product.category}</td>
            <td>
                <button class="view-btn" onclick="viewProduct(${ Math.floor(Number(product.id))})">View Details</button>
                <button class="edit-btn admin-only" onclick="editProduct(${ Math.floor(Number(product.id)) })">Edit</button>
                <button class="delete-btn admin-only" onclick="deleteProduct(${ Math.floor(Number(product.id))})">Delete</button>
            </td>
        `;
        productList.appendChild(row);
    }
}
// funcao para criar produto

function createProduct(){
    window.location.href = './create-product.html';
}

// funcao para buscar produto pelo id 

async function searchProductById(index){
    product = await fetchProductById(index);
    return product;
}
    
// Função para visualizar detalhes de um produto
async function viewProduct(index) {
    var product = await searchProductById(index);
    localStorage.setItem('product', JSON.stringify(product));
    window.location.href = './view-product.html';
}

//funcao para editar um produto
async function editProduct(index){    
    var product = await searchProductById(index);
    localStorage.setItem('product', JSON.stringify(product));
    window.location.href = './edit-product.html';
}

// Função para deletar um produto
function deleteProduct(productId) {
    // Confirmação para deletar
    const confirmation = confirm("Are you sure you want to delete the selected product?");
    if (!confirmation) return;

    // Obtém a lista de produtos do localStorage
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // Encontra o índice do produto
    const productIndex = products.findIndex(product => product.id === productId);

    // Verifica se o produto foi encontrado
    if (productIndex === -1) {
        alert("Product not found.");
        return;
    }

    // Remove o item do array e atualiza o localStorage
    products.splice(productIndex, 1);
    localStorage.setItem('products', JSON.stringify(products));

    // Recarrega os produtos da página atual após deletar o item
    loadProducts();
}



// Renderiza a paginação
function renderPagination(filter) {
    if(filter){
        var products = JSON.parse(localStorage.getItem('productsFilter')) || [];
    }
    else{
        var products = JSON.parse(localStorage.getItem('products')) || [];
    }
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';
    if(totalPages >1){
        for (let page = 1; page <= totalPages; page++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = page;
            pageButton.onclick = () => loadProducts(page);
            paginationContainer.appendChild(pageButton);
        }

    }
}

// Carrega a primeira página ao iniciar
loadProducts();

