
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

function searchProduct(){
    const searchInput = document.getElementById('searchInput');
    const searchValue = searchInput.value.toLowerCase();
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchValue));
    localStorage.setItem('productsFilter', JSON.stringify(filteredProducts));
    loadProducts(1, true); 
}


// Configura o número de itens por página
const itemsPerPage = 5;

// Produtos de exemplo para adicionar ao LocalStorage
const initialProducts = [
    {
        id: 1,
        image: 'images/gbv-bee-thousand-cover.jpeg',
        name: 'Guided by Voices - Bee Thousand',
        brand: 'Matador Records',
        category: 'CD',
        shortDescription: 'A legendary lo-fi rock album that defined a generation.',
        fullDescription: 'Bee Thousand by Guided by Voices is a masterpiece of lo-fi rock music, showcasing raw and innovative songwriting. Released in 1994, this album has influenced countless indie bands worldwide.',
        listPrice: '$15.99',
        discount: '10%',
        enabled: true,
        inStock: true,
        creationTime: '2023-05-01 14:00:00',
        updateTime: '2023-10-15 09:00:00',
        dimensions: '5.5 x 5.5 x 0.4 inches',
        weight: '0.3 lbs',
        cost: '$12.00',
        details: [
            'Material: Plastic CD case with paper insert',
            'Color: Full-color printed cover',
            'Includes booklet with lyrics and liner notes'
        ]
    },
    {
        id: 2,
        image: 'images/pavment-slanted-and-enchanted-cover.jpeg',
        name: 'Pavement - Slanted and Enchanted',
        brand: 'Domino Recording Co',
        category: 'MP3',
        shortDescription: 'The ultimate indie rock album from the 90s.',
        fullDescription: 'Slanted and Enchanted by Pavement is widely regarded as one of the greatest indie rock albums of all time. With its raw edge and melodic charm, this 1992 release still resonates today.',
        listPrice: '$9.99',
        discount: '20%',
        enabled: true,
        inStock: true,
        creationTime: '2022-08-10 16:30:00',
        updateTime: '2023-09-12 14:00:00',
        dimensions: 'N/A (Digital Download)',
        weight: '0 lbs',
        cost: '$6.00',
        details: [
            'Format: MP3, 320 kbps',
            'Includes 12 tracks',
            'Compatible with all devices'
        ]
    },
    {
        id: 3,
        image: 'images/neutral-milk-hotel-in-the-aeroplane-over-the-sea-tshirt.jpeg',
        name: 'Neutral Milk Hotel T-Shirt',
        brand: 'Merge Records',
        category: 'T-Shirt',
        shortDescription: 'Comfortable and stylish band merch.',
        fullDescription: 'This official Neutral Milk Hotel T-Shirt features artwork from the iconic album *In the Aeroplane Over the Sea*. Perfect for fans of indie and folk rock.',
        listPrice: '$25.00',
        discount: '15%',
        enabled: true,
        inStock: true,
        creationTime: '2024-01-10 11:45:00',
        updateTime: '2024-10-20 18:00:00',
        dimensions: '12 x 8 x 1 inches',
        weight: '0.5 lbs',
        cost: '$18.00',
        details: [
            'Material: 100% cotton',
            'Color: Black with white print',
            'Available in sizes S, M, L, XL'
        ]
    },
    {
        id: 4,
        image: 'images/indie-101-book.jpg',
        name: 'Indie Rock 101',
        brand: 'Music Books',
        category: 'Book',
        shortDescription: 'A comprehensive guide to indie music history.',
        fullDescription: 'Indie Rock 101 provides an in-depth look into the history, key albums, and influential bands that shaped the indie music scene from the 80s to the present.',
        listPrice: '$30.00',
        discount: '5%',
        enabled: true,
        inStock: false,
        creationTime: '2023-03-15 13:00:00',
        updateTime: '2023-10-05 09:30:00',
        dimensions: '9 x 6 x 1.2 inches',
        weight: '1.2 lbs',
        cost: '$20.00',
        details: [
            'Pages: 320',
            'Language: English',
            'Publisher: Music Books Press'
        ]
    },
    {
        id: 5,
        image: 'images/jamc-poster.png',
        name: 'The Jesus and Mary Chain Poster',
        brand: 'Art & Prints',
        category: 'Poster',
        shortDescription: 'A vibrant poster featuring the iconic band.',
        fullDescription: 'This high-quality poster showcases The Jesus and Mary Chain in a bold design, perfect for decorating your room or music studio.',
        listPrice: '$12.99',
        discount: '0%',
        enabled: true,
        inStock: true,
        creationTime: '2023-06-25 15:00:00',
        updateTime: '2023-11-01 10:00:00',
        dimensions: '24 x 36 inches',
        weight: '0.2 lbs',
        cost: '$8.00',
        details: [
            'Material: Premium glossy paper',
            'Color: Full-color print',
            'Ships in a protective tube'
        ]
    },
    {
        id: 6,
        image: 'images/mbv-loveless-cd.jpeg',
        name: 'My Bloody Valentine - Loveless',
        brand: 'Creation Records',
        category: 'CD',
        shortDescription: 'A groundbreaking shoegaze album from the 90s.',
        fullDescription: 'Loveless by My Bloody Valentine is a critically acclaimed shoegaze album that defined the genre with its dreamy soundscapes and innovative production techniques.',
        listPrice: '$16.99',
        discount: '10%',
        enabled: true,
        inStock: true,
        creationTime: '2022-02-20 10:15:00',
        updateTime: '2023-09-18 08:30:00',
        dimensions: '5.5 x 5.5 x 0.4 inches',
        weight: '0.3 lbs',
        cost: '$12.50',
        details: [
            'Material: Plastic CD case with artwork insert',
            'Color: Full-color cover design',
            'Includes lyric booklet'
        ]
    },
    {
        id: 7,
        image: 'images/yo-la-tengo-you-can-hear-heart-beating-as-one-mp3.jpeg',
        name: 'Yo La Tengo - I Can Hear the Heart Beating as One',
        brand: 'Matador Records',
        category: 'MP3',
        shortDescription: 'A critically acclaimed indie rock album.',
        fullDescription: 'This Yo La Tengo album blends dream pop, indie rock, and experimental sounds, making it one of their most beloved releases.',
        listPrice: '$8.99',
        discount: '15%',
        enabled: true,
        inStock: true,
        creationTime: '2023-01-10 12:00:00',
        updateTime: '2023-10-25 14:45:00',
        dimensions: 'N/A (Digital Download)',
        weight: '0 lbs',
        cost: '$6.50',
        details: [
            'Format: MP3, 320 kbps',
            'Includes 15 tracks',
            'Digital booklet included'
        ]
    },
    {
        id: 8,
        image: 'images/sonic-youth-washing-machine-tshirt.jpeg',
        name: 'Sonic Youth T-Shirt',
        brand: 'Geffen Records',
        category: 'T-Shirt',
        shortDescription: 'Official band merch for Sonic Youth fans.',
        fullDescription: 'This T-shirt features the artwork from Sonic Youth\'s *Washing Machine* album. A must-have for alternative rock enthusiasts.',
        listPrice: '$22.00',
        discount: '10%',
        enabled: true,
        inStock: true,
        creationTime: '2024-04-15 10:00:00',
        updateTime: '2024-10-10 17:00:00',
        dimensions: '11 x 9 x 1 inches',
        weight: '0.4 lbs',
        cost: '$15.00',
        details: [
            'Material: 100% organic cotton',
            'Color: Blue with album art print',
            'Available in sizes S, M, L, XL, XXL'
        ]
    },
    {
        id: 9,
        image: 'images/our-band-could-be-your-life-book.jpeg',
        name: 'Our Band Could Be Your Life',
        brand: 'Indie Publishing',
        category: 'Book',
        shortDescription: 'A history of the American indie rock scene.',
        fullDescription: 'This book chronicles the rise of the American indie music scene from the 1980s to the 1990s, featuring bands like Minor Threat, Sonic Youth, and Dinosaur Jr.',
        listPrice: '$18.99',
        discount: '5%',
        enabled: true,
        inStock: true,
        creationTime: '2023-05-01 14:00:00',
        updateTime: '2024-03-12 11:30:00',
        dimensions: '9 x 6 x 1.1 inches',
        weight: '1.1 lbs',
        cost: '$14.50',
        details: [
            'Pages: 336',
            'Language: English',
            'Publisher: Indie Publishing House'
        ]
    },
    {
        id: 10,
        image: 'images/velvet-underground-poster.jpeg',
        name: 'The Velvet Underground Poster',
        brand: 'Classic Prints',
        category: 'Poster',
        shortDescription: 'A vintage-style poster of the iconic band.',
        fullDescription: 'This poster pays homage to The Velvet Underground, featuring a classic photo of the band in a stylish, vintage design.',
        listPrice: '$14.99',
        discount: '0%',
        enabled: true,
        inStock: true,
        creationTime: '2023-08-20 18:00:00',
        updateTime: '2024-10-05 09:00:00',
        dimensions: '24 x 36 inches',
        weight: '0.25 lbs',
        cost: '$10.00',
        details: [
            'Material: High-quality matte paper',
            'Color: Black and white with golden accents',
            'Packaged in a protective tube'
        ]
    }
    
];



// Salva os produtos iniciais no LocalStorage caso ainda não estejam salvos
if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(initialProducts));
}

// Função para carregar produtos da página atual
function loadProducts(page = 1, filter) {
    renderProducts(page, filter);
    renderPagination(filter);
}

// Renderiza a lista de produtos na tabela
function renderProducts(page, filter) {
    if(filter){
        var products = JSON.parse(localStorage.getItem('productsFilter')) || [];
    }
    else{
        var products = JSON.parse(localStorage.getItem('products')) || [];
    }
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Limpa a tabela

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, products.length);

    for (let i = startIndex; i < endIndex; i++) {
        const product = products[i];
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${product.id}</td>
            <td><img src="${product.image}" alt="${product.name}"></td>
            <td>${product.name}</td>
            <td>${product.brand}</td>
            <td>${product.category}</td>
            <td>
                <button class="view-btn" onclick="viewProduct(${i})">View Details</button>
                <button class="edit-btn admin-only" onclick="editProduct(${i})">Edit</button>
                <button class="delete-btn admin-only" onclick="deleteProduct(${i})">Delete</button>
            </td>
        `;
        productList.appendChild(row);
    }
}
// funcao para criar produto

function createProduct(){
    window.location.href = './create-product.html';
}


// Função para visualizar detalhes de um produto
function viewProduct(index) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    localStorage.setItem('product', JSON.stringify(products[index]));
    window.location.href = './view-product.html';
}

//funcao para editar um produto
function editProduct(index){
    const products = JSON.parse(localStorage.getItem('products')) || [];
    
    localStorage.setItem('product', JSON.stringify(products[index]));
    window.location.href = './edit-product.html';
}

// Função para deletar um produto
function deleteProduct(index) {
    // Confirmação para deletar
    const confirmation = confirm("Are you sure you want to delete the selected products?");
    if (!confirmation) return;

    // Obtém a lista de produtos do localStorage
    let products = JSON.parse(localStorage.getItem('products')) || [];
    
    // Remove o item do array e atualiza o localStorage
    products.splice(index, 1);
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

