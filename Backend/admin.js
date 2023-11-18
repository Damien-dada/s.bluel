// Fonction pour vérifier si l'utilisateur est connecté
function checkUserLoggedIn() {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
        // L'utilisateur est connecté, afficher les éléments et masquer les filtres
        const editionElement = document.querySelector('.edition');
        const modifprojetElement = document.querySelector('.modifprojet');
        const filtresElement = document.getElementById('filtres');

        editionElement.style.display = 'block';
        modifprojetElement.style.display = 'block';
        filtresElement.style.display = 'none';
    } else {
        const editionElement = document.querySelector('.edition');
        const modifprojetElement = document.querySelector('.modifprojet');
        const filtresElement = document.getElementById('filtres');

        editionElement.style.display = 'none';
        modifprojetElement.style.display = 'none';
        filtresElement.style.display = 'block';
    }
}

// Appeler la fonction pour vérifier l'état de connexion lors du chargement de la page
checkUserLoggedIn();