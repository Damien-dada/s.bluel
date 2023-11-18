const editButton = document.querySelector('.modifprojet p');
const modal = document.getElementById('galleryModal');
const closeBtn = document.querySelector('.close');

editButton.addEventListener('click', () => {
    modal.style.display = 'block';
    // Charger les projets lorsqu'on ouvre la modal
    loadProjects();
});


closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

function loadProjects() {
    const projectsList = document.getElementById('projectsList');
    const apiUrl = 'http://localhost:5678/api/works';

    fetch(apiUrl, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    })
    .then(response => response.json())
    .then(data => {
        projectsList.innerHTML = ""; // Effacer le contenu actuel
        let counter = 0;
        let currentRow = document.createElement('div');
        currentRow.classList.add('project-row');

        data.forEach(project => {
            const projectItem = document.createElement('div');
            projectItem.classList.add('project-item');
            projectItem.innerHTML = `
                <img src="${project.imageUrl}" alt="${project.title}">
                <button class="delete-btn" data-project-id="${project.id}">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            `;
            currentRow.appendChild(projectItem);
            counter++;

            if (counter === 5) {
                projectsList.appendChild(currentRow);
                currentRow = document.createElement('div');
                currentRow.classList.add('project-row');
                counter = 0;
            }
        });

        if (counter > 0) {
            projectsList.appendChild(currentRow);
        }
    })
    .catch(error => console.error('Erreur lors du chargement des projets :', error));
}

function deleteProject(projectId) {
    const apiUrl = `http://localhost:5678/api/works/${projectId}`;
    const authToken = localStorage.getItem('authToken');
    
    const projectElement = document.querySelector(`[data-project-id="${projectId}"]`);

    fetch(apiUrl, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    })
    .then(response => {
        if (response.ok) {
            if (projectElement) {
                projectElement.remove();
                // Supprimez le projet du DOM sans recharger la page
            }
        } else {
            console.error('Erreur lors de la suppression du projet.');
        }
    })
    .catch(error => console.error('Erreur lors de la suppression du projet :', error));
}

document.getElementById('projectsList').addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('fa-trash-can')) {
        const projectId = target.parentElement.dataset.projectId;
        deleteProject(projectId);
    }
});


// Trouver l'élément du bouton de fermeture par son ID
const closeAddPhotoModalBtn = document.getElementById('closeAddPhotoModalBtn');

// Ajouter un gestionnaire d'événement pour le clic sur le bouton de fermeture
closeAddPhotoModalBtn.addEventListener('click', closeAddPhotoModal);


loadProjects();
