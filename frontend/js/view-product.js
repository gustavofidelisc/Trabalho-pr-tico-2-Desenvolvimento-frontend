const product = JSON.parse(localStorage.getItem('product'));

// Preenchendo os elementos com base nos dados do produto
document.getElementById('product-id').textContent = product.id;
document.getElementById('product-name').textContent = product.name;
document.getElementById('category').textContent = product.category;
document.getElementById('brand').textContent = product.brand;
document.getElementById('main-image').src = product.image;
document.getElementById('main-image').alt = product.name;
document.getElementById('short-description').textContent = product.shortDescription;
document.getElementById('full-description').textContent = product.fullDescription;
document.getElementById('list-price').textContent = product.listPrice;
document.getElementById('discount').textContent = product.discount;
document.getElementById('enabled').textContent = product.enabled ? 'Yes' : 'No';
document.getElementById('in-stock').textContent = product.inStock ? 'Yes' : 'No';
document.getElementById('creation-time').textContent = product.creationTime;
document.getElementById('update-time').textContent = product.updateTime;
document.getElementById('dimensions').textContent = product.dimensions;
document.getElementById('weight').textContent = product.weight;
document.getElementById('cost').textContent = product.cost;

document.getElementById('product-details-list').innerHTML = product.details.map(detail => {
    return `<li>${detail.name}: ${detail.value}</li>`;
}).join('');