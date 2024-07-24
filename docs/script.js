function createTreeView(data, parentElement) {
    if (!Array.isArray(data)) {
        console.warn('Invalid data structure. Expected an array.');
        return; // Exit if data is not an array
    }

    data.forEach(item => {
        const div = document.createElement('div');
        div.className = item.type;
        div.textContent = item.name;

        if (item.type === 'folder') {
            div.addEventListener('click', function() {
                this.classList.toggle('expanded');
            });

            const childrenDiv = document.createElement('div');
            childrenDiv.className = 'children';
            createTreeView(item.children, childrenDiv); // Handle children of the folder
            div.appendChild(childrenDiv);
        } else {
            div.addEventListener('click', function() {
                window.location.href = item.path; // Navigate to file
            });
        }

        parentElement.appendChild(div);
    });
}

// Load directory structure and generate tree view
fetch('https://applepiecodes.github.io/Xenon-Website/docs/tree-view.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Fetched data:', data); // Log data to inspect its structure
        const treeView = document.getElementById('tree-view');
        createTreeView(data.docs, treeView); // Pass the array under the "docs" key
    })
    .catch(error => console.error('Error loading directory structure:', error));