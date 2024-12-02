let newProduct ={};
document.getElementById('createProductForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita o comportamento padrão de envio do formulário

    // Captura os valores do formulário
    const name = document.getElementById('name').value;
    const shortDescription = document.getElementById('shortDescription').value;
    const fullDescription = document.getElementById('fullDescription').value;
    const brand = document.getElementById('brand').value;
    const category = document.getElementById('category').value;
    const listPrice = parseFloat(document.getElementById('listPrice').value);
    const discountPercent = parseFloat(document.getElementById('discountPercent').value);
    const isEnabled = document.getElementById('enabled').checked;
    const inStock = document.getElementById('inStock').checked;
    const length = parseFloat(document.getElementById('length').value);
    const width = parseFloat(document.getElementById('width').value);
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const cost = parseFloat(document.getElementById('cost').value);


    // Captura os detalhes adicionados
    const details = [];
    document.querySelectorAll('#productDetails div').forEach(detailDiv => {
        const detailName = detailDiv.querySelector('input[type="text"]:first-of-type').value;
        const detailValue = detailDiv.querySelector('input[type="text"]:last-of-type').value;
        if (detailName && detailValue) {
            details.push({ name: detailName, value: detailValue });
        }
    });

    // Cria o novo produto no formato correto
    newProduct = {
        name,
        shortDescription,
        fullDescription,
        brand,
        category,
        price: null,
        discount: discountPercent,
        isEnabled,
        inStock,
        creationTime: new Date().toISOString(),
        updateTime: new Date().toISOString(),
        dimension: {
            length,
            width,
            height,
            weight
        },
        cost,
        details: details,
        listPrice
    };


    // Envia o POST para o backend
    await fetch("http://127.0.0.1:8080/products", {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa('rey:rey-pass'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
    })
    .then(response => {
        if (response.ok) {
            alert('Product created successfully!');
        } else {
            alert('Failed to create the product.');
        }
    });

    window.location.href = './dashboard.html';
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
