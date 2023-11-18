// Fonction pour gérer la connexion de l'utilisateur
function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('mdp').value;

    const data = {
        email: email,
        password: password
    };

    const loginUrl = "http://localhost:5678/api/users/login";

    fetch(loginUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else if (response.status === 401) {
            throw new Error('Connexion échouée. Veuillez vérifier vos identifiants.');
        } else if (response.status === 404) {
            throw new Error('Utilisateur non trouvé.');
        } else {
            throw new Error('Erreur inattendue lors de la connexion.');
        }
    })
    .then(data => {
        localStorage.setItem('authToken', data.token);
        window.location.href = 'index.html';
    })
    .catch(error => {
        console.error('Erreur lors de la connexion:', error);
        alert(error.message);
    });
}

// Fonction pour déconnecter l'utilisateur
function logoutUser() {
    localStorage.removeItem('authToken');
    window.location.href = 'login.html'; // Rediriger vers la page de connexion
}

// Fonction pour vérifier si l'utilisateur est connecté
function checkUserLoggedIn() {
    const authToken = localStorage.getItem('authToken');
    const loginLink = document.querySelector('nav li:nth-child(3)');

    if (authToken) {
        // L'utilisateur est connecté, afficher "logout"
        loginLink.innerHTML = '<a href="#" onclick="logoutUser()">logout</a>';
        // ... (autres modifications si nécessaires)
    } else {
        // L'utilisateur n'est pas connecté, afficher "login"
        loginLink.innerHTML = '<a href="login.html">login</a>';
        // ... (autres modifications si nécessaires)
    }
}

// Appeler la fonction pour vérifier l'état de connexion lors du chargement de la page
checkUserLoggedIn();