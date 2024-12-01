// Função para pegar os produtos do localStorage
function getProducts() {
    const products = JSON.parse(localStorage.getItem('products'));
    return products ? products : [];
}

// Função para salvar os produtos no localStorage
function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// Recuperando o produto do localStorage
const product = JSON.parse(localStorage.getItem('product'));
console.log(product);

// Verificando se os dados do produto estão disponíveis
if (product) {
    // Preenchendo os campos do formulário com os dados do produto
    document.getElementById('productId').value = product.id;
    document.getElementById('name').value = product.name;
    document.getElementById('shortDescription').value = product.shortDescription;
    document.getElementById('fullDescription').value = product.fullDescription;
    document.getElementById('brand').value = product.brand;
    document.getElementById('category').value = product.category;
    document.getElementById('listPrice').value = parseFloat(product.listPrice.replace('$', ''));
    document.getElementById('discountPercent').value = parseInt(product.discount.replace('%', ''));
    document.getElementById('enabled').checked = product.enabled;
    document.getElementById('inStock').checked = product.inStock;

    // Preenchendo dimensões e peso
    const dimensions = product.dimensions.split(' x ');
    document.getElementById('length').value = parseFloat(dimensions[0]);
    document.getElementById('width').value = parseFloat(dimensions[1]);
    document.getElementById('height').value = parseFloat(dimensions[2]);
    document.getElementById('weight').value = parseFloat(product.weight.replace(' lbs', ''));
    document.getElementById('cost').value = parseFloat(product.cost.replace('$', ''));

    // Preenchendo a imagem principal
    const currentMainImage = document.getElementById('currentMainImage');
    currentMainImage.innerHTML = ''; // Limpa a imagem atual
    const imgElement = document.createElement('img');
    imgElement.src = product.image;
    imgElement.alt = product.name;
    imgElement.style.maxWidth = '200px';
    currentMainImage.appendChild(imgElement);
}

// Lidar com o envio do formulário de edição
document.getElementById('editProductForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Captura os valores do formulário
    const updatedProduct = {
        id: document.getElementById('productId').value,
        name: document.getElementById('name').value,
        shortDescription: document.getElementById('shortDescription').value,
        fullDescription: document.getElementById('fullDescription').value,
        brand: document.getElementById('brand').value,
        category: document.getElementById('category').value,
        listPrice: `$${parseFloat(document.getElementById('listPrice').value).toFixed(2)}`,
        discount: `${parseInt(document.getElementById('discountPercent').value)}%`,
        enabled: document.getElementById('enabled').checked,
        inStock: document.getElementById('inStock').checked,
        dimensions: `${parseFloat(document.getElementById('length').value)} x ${parseFloat(document.getElementById('width').value)} x ${parseFloat(document.getElementById('height').value)}`,
        weight: `${parseFloat(document.getElementById('weight').value)} lbs`,
        cost: `$${parseFloat(document.getElementById('cost').value).toFixed(2)}`,
        details: Array.from(document.querySelectorAll('#productDetails div input')).map(input => input.value)
    };

    const mainImageFile = document.getElementById('mainImage').files[0];

    // Atualiza a imagem principal, se uma nova for selecionada
    if (mainImageFile) {
        const reader = new FileReader();
        reader.onloadend = function () {
            updatedProduct.image = reader.result; // Atualiza a imagem principal
            updateProductInLocalStorage(updatedProduct);
        };
        reader.readAsDataURL(mainImageFile);
    } else {
        // Mantém a imagem atual se nenhuma nova imagem for selecionada
        updatedProduct.image = product.image;
        updateProductInLocalStorage(updatedProduct);
    }
});

// Atualiza o produto no localStorage
function updateProductInLocalStorage(updatedProduct) {
    const products = getProducts();
    const productIndex = products.findIndex(p => p.id === Number(updatedProduct.id));
    if (productIndex === -1) {
        alert('Product not found!');
        return;
    }
    products[productIndex] = updatedProduct;
    saveProducts(products);

    alert('Product updated successfully!');
    window.location.href = 'dashboard.html'; // Redireciona após a atualização
}

// Adicionar e remover detalhes
document.getElementById('addDetailBtn').addEventListener('click', function() {
    const productDetails = document.getElementById('productDetails');
    const newDetail = document.createElement('div');
    newDetail.innerHTML = `
        <input type="text" placeholder="Detail">
        <button type="button" onclick="removeDetail(this)">Remove</button>
    `;
    productDetails.appendChild(newDetail);
});

function removeDetail(button) {
    button.parentElement.remove();
}
