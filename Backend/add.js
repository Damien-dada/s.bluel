const ajouterPhotoButton = document.querySelector('.ajouter input');
const addPhotoModal = document.getElementById('addPhotoModal');
const imageUpload = document.querySelector("#imageUpload");
const imagePreview = document.getElementById('imagePreview');

ajouterPhotoButton.addEventListener('click', () => {
    addPhotoModal.style.display = 'block';

    const addPhotoForm = document.querySelector("#addPhotoForm");
    const titleInput = document.querySelector("#title");
    const categorySelect = document.querySelector("#category");

    // Créez un élément div pour afficher le message d'erreur
    const errorMessageElement = document.createElement('div');
    errorMessageElement.id = 'errorMessage';
    errorMessageElement.style.color = 'red';

    addPhotoForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = titleInput.value;
        const category = categorySelect.value;
        const image = imageUpload.files[0];

        // Vérification si une image est sélectionnée
        if (!image) {
            errorMessageElement.textContent = "Veuillez sélectionner une photo avant de valider.";

            // Ajoutez l'élément d'erreur au formulaire
            addPhotoForm.appendChild(errorMessageElement);

            // Empêche la soumission du formulaire en cas d'erreur de validation
            return;
        }

        // S'il y a une image, effacez le message d'erreur précédent
        if (errorMessageElement.parentNode) {
            errorMessageElement.parentNode.removeChild(errorMessageElement);
        }

        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            console.error("Aucun jeton d'authentification trouvé.");
            return;
        }

        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", title);
        formData.append("category", category);

        fetch("http://localhost:5678/api/works", {
            method: "POST",
            body: formData,
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
        .then((response) => {
            if (response.status === 201) {
                closeAddPhotoModal();
                loadProjects(); 
            } else {
                console.error("Erreur lors de la création du projet.");
            }
        })
        .catch((error) => {
            console.error("Erreur lors de la création du projet :", error);
        });
    });

    imageUpload.addEventListener('change', () => {
        displayImagePreview();
    });
});

function displayImagePreview() {
    const file = imageUpload.files[0];
    imagePreview.alt = file ? "" : "Aperçu de l'image";
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imagePreview.src = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        imagePreview.src = "";
    }
}


function closeAddPhotoModal() {
    addPhotoModal.style.display = 'none';
}
