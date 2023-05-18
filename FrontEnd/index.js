//Afficher la partie filtre:
async function displayCategories(){
    const filter = document.querySelector('.filter');
    const categories = await Categories();
    categories.unshift({ name: 'Tous' }); //Ajout "Tous" dans le tableau

    categories.forEach(category => {
        const Element = document.createElement('p');
        Element.innerText = category.name;

        filter.appendChild(Element);
    })
}
displayCategories(); //execute la fonction



//Afficher les images : 
async function displayWorks(){
const gallery = document.querySelector(".gallery");
const works = await getWorks();
works.forEach(works => {

    const figureElement = document.createElement('figure');
    const workImg = document.createElement('img');
    workImg.src = works.imageUrl;
    const workId = document.createElement('figcaption');
    workId.innerText = works.title;

    gallery.appendChild(figureElement);
    figureElement.appendChild(workImg);
    figureElement.appendChild(workId);
});
}

displayWorks();