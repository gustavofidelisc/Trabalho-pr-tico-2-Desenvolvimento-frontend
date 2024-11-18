// Recuperando os dados do produto do localStorage
const product = JSON.parse(localStorage.getItem('product'));

// Verificando se os dados do produto estão disponíveis
if (product) {
    // Preenchendo os campos do formulário com os dados do produto
    document.getElementById('productId').value = product.id;
    document.getElementById('name').value = product.name;
    document.getElementById('shortDescription').value = product.shortDescription;
    document.getElementById('fullDescription').value = product.fullDescription;
    document.getElementById('brand').value = product.brand;
    document.getElementById('category').value = product.category;

    // Preenchendo o preço e desconto (removendo o símbolo de moeda para armazenar valores numéricos)
    document.getElementById('listPrice').value = parseFloat(product.listPrice.replace('$', ''));
    document.getElementById('discountPercent').value = parseInt(product.discount.replace('%', ''));

    // Definindo os checkboxes como 'checked' ou 'unchecked' com base nos valores do produto
    document.getElementById('enabled').checked = product.enabled;
    document.getElementById('inStock').checked = product.inStock;

    // Preenchendo as dimensões e peso (extraindo os valores de dimensões e peso)
    const dimensions = product.dimensions.split(' x ');
    document.getElementById('length').value = parseFloat(dimensions[0]);
    document.getElementById('width').value = parseFloat(dimensions[1]);
    document.getElementById('height').value = parseFloat(dimensions[2]);

    document.getElementById('weight').value = parseFloat(product.weight.replace(' lbs', ''));

    // Preenchendo o custo (também removendo o símbolo de moeda)
    document.getElementById('cost').value = parseFloat(product.cost.replace('$', ''));

    // Atualizando a imagem principal
    const mainImage = document.getElementById('mainImage');
    const currentMainImage = document.getElementById('currentMainImage');
    const imagePath = product.image; // Supondo que a imagem esteja na pasta 'images/'

    
    // Atribuindo o caminho da imagem para o elemento de imagem
    const imgElement = document.createElement('img');
    imgElement.src = imagePath;  // Caminho da imagem (certifique-se de que a imagem está acessível na pasta indicada)
    imgElement.alt = product.name;
    imgElement.style.maxWidth = '200px';  // Ajuste o tamanho da imagem conforme necessário
    currentMainImage.appendChild(imgElement);

    // Preenchendo os detalhes do produto
    const productDetails = document.getElementById('productDetails');
    product.details.forEach(detail => {
        const newDetail = document.createElement('div');
        newDetail.innerHTML = `
            <input type="text" value="${detail}" placeholder="Detail">
            <button type="button" onclick="removeDetail(this)">Remove</button>
        `;
        productDetails.appendChild(newDetail);
    });
}

// Função para remover detalhes do produto
function removeDetail(button) {
    const detailDiv = button.parentElement;
    detailDiv.remove();
}

// Adicionando um novo detalhe ao produto
document.querySelector('#productDetails button[type="button"]').addEventListener('click', function() {
    const productDetails = document.getElementById('productDetails');
    const newDetail = document.createElement('div');
    newDetail.innerHTML = `
        <input type="text" placeholder="New Detail">
        <button type="button" onclick="removeDetail(this)">Remove</button>
    `;
    productDetails.appendChild(newDetail);
});

// Manipulando o envio do formulário
document.getElementById('editProductForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Criando o objeto do produto com os dados atualizados
    const updatedProduct = {
        id: document.getElementById('productId').value,
        name: document.getElementById('name').value,
        shortDescription: document.getElementById('shortDescription').value,
        fullDescription: document.getElementById('fullDescription').value,
        brand: document.getElementById('brand').value,
        category: document.getElementById('category').value,
        image: document.getElementById('mainImage').files[0]?.name || product.image,  // Se não houver novo arquivo, mantém o antigo
        listPrice: `$${parseFloat(document.getElementById('listPrice').value).toFixed(2)}`,
        discount: `${parseInt(document.getElementById('discountPercent').value)}%`,
        enabled: document.getElementById('enabled').checked,
        inStock: document.getElementById('inStock').checked,
        dimensions: `${parseFloat(document.getElementById('length').value)} x ${parseFloat(document.getElementById('width').value)} x ${parseFloat(document.getElementById('height').value)}`,
        weight: `${parseFloat(document.getElementById('weight').value)} lbs`,
        cost: `$${parseFloat(document.getElementById('cost').value).toFixed(2)}`,
        details: Array.from(document.querySelectorAll('#productDetails div')).map(detailDiv => detailDiv.querySelector('input').value)
    };

    // Atualizando o produto no localStorage
    localStorage.setItem('product', JSON.stringify(updatedProduct));

    // Mensagem de confirmação (você pode substituir por uma ação real, como redirecionar)
    alert('Product updated successfully!');
});
