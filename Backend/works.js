const url = "http://localhost:5678/api/works"
const detailWorks = document.getElementById("gallery")

const getSection = () => {
    fetch(url)
        .then(function (res) {
            return res.json()
        })
        .then(function (json) {
            console.log(json);
            for (const data of json) {
                detailWorks.innerHTML +=
                    `<figure class="gallery-item" data-categoryid="${data.categoryId}">
                        <img src="${data.imageUrl}" alt="${data.title}">
                        <figcaption>"${data.title}"</figcaption>
                    </figure>`;
                console.log(data);
            }
        })


}

getSection();