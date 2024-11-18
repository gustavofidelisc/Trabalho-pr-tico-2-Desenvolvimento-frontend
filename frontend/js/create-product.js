// Função para pegar os produtos do localStorage
function getProducts() {
    const products = JSON.parse(localStorage.getItem('products'));
    return products ? products : []; 
}

// Função para salvar os produtos no localStorage
function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// Função para lidar com o envio do formulário
document.getElementById('createProductForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o comportamento padrão de envio do formulário

    // Captura os valores do formulário
    const name = document.getElementById('name').value;
    const shortDescription = document.getElementById('shortDescription').value;
    const fullDescription = document.getElementById('fullDescription').value;
    const brand = document.getElementById('brand').value;
    const category = document.getElementById('category').value;
    const mainImage = document.getElementById('mainImage').files[0];
    const featuredImages = document.getElementById('featuredImages').files;
    const listPrice = document.getElementById('listPrice').value;
    const discountPercent = document.getElementById('discountPercent').value;
    const enabled = document.getElementById('enabled').checked;
    const inStock = document.getElementById('inStock').checked;
    const length = document.getElementById('length').value;
    const width = document.getElementById('width').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const cost = document.getElementById('cost').value;

    // Verifica se a imagem principal foi escolhida
    if (!mainImage) {
        alert("Please select a main image.");
        return;
    }

    // Seleciona o ultimo elemento de product, com o id mais alto
    const lastProduct = getProducts().pop();

    // Converte as imagens em base64
    const reader = new FileReader();
    reader.onloadend = function() {
        // Cria o novo produto
        const newProduct = {
            id: lastProduct.id + 1 || 1,
            name,
            shortDescription,
            fullDescription,
            brand,
            category,
            image: reader.result, // A imagem principal em base64
            featuredImages: Array.from(featuredImages).map(file => {
                return URL.createObjectURL(file); // Converte cada imagem em URL temporária
            }),
            listPrice,
            discount: discountPercent,
            enabled,
            inStock,
            dimensions: `${length} x ${width} x ${height}`,
            weight,
            cost,
            details: [], // Detalhes podem ser adicionados depois
            creationTime: new Date().toLocaleString(),
            updateTime: new Date().toLocaleString()
        };

        // Pega os produtos existentes e adiciona o novo
        const products = getProducts();
        products.push(newProduct);

        // Salva os produtos de volta no localStorage
        saveProducts(products);

        // Redireciona para o painel ou outra página
        window.location.href = 'dashboard.html'; // Redireciona para o painel
    };

    // Lê a imagem principal como URL
    reader.readAsDataURL(mainImage);
});

// Função para adicionar detalhes ao produto
document.getElementById('addDetailBtn').addEventListener('click', function() {
    const detailName = document.querySelector('#productDetails input[type="text"]:first-of-type').value;
    const detailValue = document.querySelector('#productDetails input[type="text"]:last-of-type').value;

    if (detailName && detailValue) {
        const detailsContainer = document.getElementById('productDetails');

        // Cria os campos para o novo detalhe
        const detailDiv = document.createElement('div');
        detailDiv.innerHTML = `
            <input type="text" value="${detailName}" placeholder="Detail Name" readonly>
            <input type="text" value="${detailValue}" placeholder="Detail Value" readonly>
            <button type="button" class="removeDetailBtn">Remove</button>
        `;

        // Adiciona ao container de detalhes
        detailsContainer.appendChild(detailDiv);

        // Adiciona o evento de remoção para os novos detalhes
        detailDiv.querySelector('.removeDetailBtn').addEventListener('click', function() {
            detailsContainer.removeChild(detailDiv);
        });

        // Limpa os campos de entrada de detalhe
        document.querySelector('#productDetails input[type="text"]:first-of-type').value = '';
        document.querySelector('#productDetails input[type="text"]:last-of-type').value = '';
    } 
});
