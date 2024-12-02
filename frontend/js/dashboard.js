let sortBy = 'name';

// função para obter produtos da API
async function fetchProducts(page, size=5, sort=sortBy) {

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
    sortBy = value;
    loadProducts(products.pageable.pageNumber +1) ;
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
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchValue));
    localStorage.setItem('productsFilter', JSON.stringify(filteredProducts));
    loadProducts(1, true); 
}


// Configura o número de itens por página
const itemsPerPage = 5;

// Função para carregar produtos da página atual
async function loadProducts( page) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    await renderProducts(page);
    await renderPagination();
}

// Renderiza a lista de produtos na tabela
async function renderProducts(page) {

    products = await fetchProducts(page - 1, itemsPerPage, sortBy);

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
async function deleteProduct(productId) {
    // Confirmação para deletar
    const confirmation = confirm("Are you sure you want to delete the selected product?");
    if (!confirmation) return;

    const base_url = 'http://127.0.0.1:8080/products/';

    const url_with_param = base_url + productId;
    console.log(productId);
    console.log(url_with_param);
    const resp = fetch(url_with_param, {
        method: 'DELETE',
        headers: new Headers({
            headers: new Headers({
                'Authorization': 'Basic '+btoa('rey:rey-pass'), 
                'Content-Type': 'application/x-www-form-urlencoded'
            })})
    })

    // Recarrega os produtos da página atual após deletar o item
    await loadProducts(products.pageable.pageNumber);
}



// Renderiza a paginação
async function renderPagination() {

    const totalPages = Math.ceil(products.totalElements / itemsPerPage);
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';
    if(totalPages >1){
        for (let page = 1; page <= totalPages; page++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = page;
            pageButton.onclick = async () => await loadProducts(page);
            paginationContainer.appendChild(pageButton);
        }

    }
}

// Carrega a primeira página ao iniciar
loadProducts();