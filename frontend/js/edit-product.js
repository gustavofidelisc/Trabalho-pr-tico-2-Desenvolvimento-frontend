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
    document.getElementById('listPrice').value = product.listPrice;
    document.getElementById('discountPercent').value = product.discount;
    document.getElementById('enabled').checked = product.isEnabled;
    document.getElementById('inStock').checked = product.inStock;

    // Preenchendo dimensões e peso
    const dimensions = Object.values(product.dimension);;
    document.getElementById('height').value = parseFloat(dimensions[0]);
    document.getElementById('length').value = parseFloat(dimensions[1]);
    document.getElementById('weight').value = parseFloat(dimensions[2]);
    document.getElementById('width').value = parseFloat(dimensions[3]);
    document.getElementById('cost').value = parseFloat(product.cost);

}

async function updateProduct(id, updatedProduct) {
    const base_url = 'http://127.0.0.1:8080/products/';
    var product = {};

    const url_with_param = base_url + id;

    console.log('Produto Atualizado');
    console.log(updatedProduct);

    const resp = await fetch(url_with_param, {
        method: 'PUT',
        headers: new Headers({
            'Authorization': 'Basic '+btoa('rey:rey-pass'), 
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(updatedProduct)
    });

    if (resp.ok) {
        product = await resp.json();
        alert("Produto atualizado com sucesso!");
    }else{
        alert("Algo deu errado! Código de Resposta: ", resp.status);
    }

    return product;
}


// Lidar com o envio do formulário de edição
document.getElementById('editProductForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const id  = document.getElementById('productId').value;

    // Captura os valores do formulário
    const updatedProduct = {
        name: document.getElementById('name').value,
        shortDescription: document.getElementById('shortDescription').value,
        fullDescription: document.getElementById('fullDescription').value,
        brand: document.getElementById('brand').value,
        category: document.getElementById('category').value,
        listPrice: parseInt(document.getElementById('listPrice').value),
        discount: parseInt(document.getElementById('discountPercent').value),
        isEnabled: document.getElementById('enabled').checked,
        inStock: document.getElementById('inStock').checked,
        creationTime: product.creationTime,
        updateTime: new Date().toISOString(),
        dimension: parseDimension(`${parseFloat(document.getElementById('length').value)} x ${parseFloat(document.getElementById('width').value)} x ${parseFloat(document.getElementById('height').value)} x ${parseFloat(document.getElementById('weight').value)}`),
        cost: parseInt(document.getElementById('cost').value),
        details: Array.from(document.querySelectorAll('#productDetails div input')).map(input => input.value)
    };

    console.log(updatedProduct);

    product = await updateProduct(id, updatedProduct);

    localStorage.setItem('product', JSON.stringify(product));

});



function removeDetail(button) {
    button.parentElement.remove();
}
