//AFFICHER la partie filtre:
async function displayCategories(){
    const filter = document.querySelector('.filter');
    const categories = await Categories();
    categories.unshift({ name: 'Tous' }); //Ajout "Tous" dans le tableau

    categories.forEach(category => {
        const Element = document.createElement('p');
        Element.innerText = category.name;
        Element.addEventListener('click', () => filtrage(category.name, works)); 
        // Ajout du gestionnaire d'événements au clic pour filtrer

        filter.appendChild(Element);
    })
}
displayCategories(); //execute l'affichage des boutons


//AFFICHER les images : 
async function displayWorks(){
const gallery = document.querySelector(".gallery");
const works = await getWorks();


//TRIER LES ELEMENTS PAR CATEGORIES (avec les id):

const idObjets = [1,5];
const filterObjets = works.filter(work => idObjets.includes(work.id));
console.log(filterObjets);

const idAppart = [2,4,6,7,8,9];
const filterAppart = works.filter(work => idAppart.includes(work.id));
console.log(filterAppart);

const idHotelBar = [3,10,11];
const filterHotelBar = works.filter(work => idHotelBar.includes(work.id));
console.log(filterHotelBar);


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
    
displayWorks(); // execute l'affichage des images


//CREER LA FONCTION FILTRAGE :

/* A RETRAVAILLER :async function filtrage(categoryName, works){
    if (categoryName === 'Tous') {
        filteredWorks = works;
      } else if (categoryName === 'Objets') {
        filteredWorks = works.filter(work => idObjets.includes(work.id));
      } else if (categoryName === 'Appart') {
        filteredWorks = works.filter(work => idAppart.includes(work.id));
      } else if (categoryName === 'HotelBar') {
        filteredWorks = works.filter(work => idHotelBar.includes(work.id));
      }
    console.log(filtrage);
}*/
