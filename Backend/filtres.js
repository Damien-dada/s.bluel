/*/Changement de couleur des filtres/ */

const btnFiltresClick = document.querySelectorAll(".btnFiltres");

btnFiltresClick.forEach(button => {
    button.addEventListener("click", () => {
        btnFiltresClick.forEach(btn => {
            btn.classList.remove("filtreActif");
        });
        button.classList.add("filtreActif");
    });
});


/*/ test boutons filtres /*/

let btnFiltres = document.querySelectorAll("button");

for (let i = 0; i < btnFiltres.length; i++) {
    let filtreProjet = btnFiltres[i];

    filtreProjet.addEventListener("click", (event) => {
        monProjet = event.target;
        filterProjects(monProjet.dataset.categoryid);
    })
}

// Fonction de filtrage
function filterProjects(categoryIdClicked) {
    const gallery = document.getElementById("gallery");
    const projectElements = gallery.querySelectorAll(".gallery-item");
    projectElements.forEach(project => {
        const categoryId = project.dataset.categoryid;

        if (categoryIdClicked === "0" || categoryIdClicked === categoryId) {
            project.style.display = "block";
        } else {
            project.style.display = "none";
        }
    });
}