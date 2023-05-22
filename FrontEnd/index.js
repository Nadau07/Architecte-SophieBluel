//AFFICHER la partie filtre:
async function displayCategories(){
  const filter = document.querySelector('.filter');
  const categories = await Categories();
  categories.unshift({ name: 'Tous' }); //Ajout "Tous" dans le tableau


  //Boucle pour creer les noms de categories
  categories.forEach(category => {
      const Element = document.createElement('p');
      Element.innerText = category.name;
      Element.addEventListener('click', () => {
        displayWorks(category.name); //Ajout click sur les categories
      });
      filter.appendChild(Element); //Ajout chaque categories dans filter
  });
}
displayCategories(); //execute l'affichage des boutons

const categoryName = 'Tous';

//AFFICHER les images en fonction des categories : 
async function displayWorks(categoryName){
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

let filteredWorks = works;

if (categoryName === 'Tous') {
  filteredWorks = works;
} else if (categoryName === 'Objets') {
  filteredWorks = works.filter(work => idObjets.includes(work.id));
} else if (categoryName === 'Appartements') {
  filteredWorks = works.filter(work => idAppart.includes(work.id));
} else if (categoryName === 'Hotels & restaurants') {
  filteredWorks = works.filter(work => idHotelBar.includes(work.id));
}

gallery.innerHTML = '';
  filteredWorks.forEach(works => {
  
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
