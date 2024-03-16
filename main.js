let backendEndpoint;

function promptForEndpoint() {
    backendEndpoint = prompt("Please enter the backend endpoint URL:", "http://localhost:3000");
    getItems(true);
}

function updateBackendEndpoint() {
    backendEndpoint = prompt("The backend endpoint is not working. Please enter a new endpoint:");
    getItems(true);
}

function getItems(initial = false) {
    fetch(`${backendEndpoint}/items`)
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok.');
        return response.json();
    })
    .then(data => {
        const itemsList = document.getElementById('itemsList');
        itemsList.innerHTML = '';
        data.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'item';
            itemElement.innerHTML = `
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="item-actions">
                    <button onclick="loadItem(${item.id})">Edit</button>
                    <button onclick="deleteItem(${item.id})">Delete</button>
                </div>
            `;
            itemsList.appendChild(itemElement);
        });
    })
    .catch((error) => {
        console.error('Error:', error);
        if (initial) updateBackendEndpoint();
    });
}

function loadItem(id) {
    fetch(`${backendEndpoint}/items/${id}`)
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok.');
        return response.json();
    })
    .then(item => {
        document.getElementById('itemId').value = item.id;
        document.getElementById('itemName').value = item.name;
        document.getElementById('itemDescription').value = item.description;
        document.querySelector("button").innerText = "Update Item";
    })
    .catch((error) => {
        console.error('Error:', error);
        updateBackendEndpoint();
    });
}

function saveItem() {
    const id = document.getElementById('itemId').value;
    const name = document.getElementById('itemName').value;
    const description = document.getElementById('itemDescription').value;
    const method = id ? 'PUT' : 'POST';
    const url = id ? `${backendEndpoint}/items/${id}` : `${backendEndpoint}/items`;

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
    })
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok.');
        return response.json();
    })
    .then(data => {
        alert(id ? "Item updated successfully!" : "Item added successfully!");
        getItems();
        document.getElementById('itemId').value = '';
        document.getElementById('itemName').value = '';
        document.getElementById('itemDescription').value = '';
        document.querySelector("button").innerText = "Add Item";
    })
    .catch((error) => {
        console.error('Error:', error);
        updateBackendEndpoint();
    });
}

function deleteItem(id) {
    fetch(`${backendEndpoint}/items/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) throw new Error();
        alert("Item deleted successfully!");
        getItems();
    })
    .catch((error) => {
        console.error('Error:', error);
        updateBackendEndpoint();
    });
}

document.addEventListener('DOMContentLoaded', promptForEndpoint);
