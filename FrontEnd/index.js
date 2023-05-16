
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
    figureElement.appendChild(workId);
    figureElement.appendChild(workImg);
});
}

displayWorks();