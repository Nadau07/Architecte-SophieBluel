
async function displayWorks(works){
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML="";
  works.forEach((work) => {
    const figureElement = document.createElement("figure");
    figureElement.setAttribute('id', work.id);
    const workImg = document.createElement("img");
    workImg.src = work.imageUrl;
    const workId = document.createElement("figcaption");
    workId.innerText = work.title;

    gallery.appendChild(figureElement);
    figureElement.appendChild(workImg);
    figureElement.appendChild(workId);
  });
}

async function displayCategories(categories){
  const filter = document.querySelector(".filter");
  //console.log(categories);
  categories.unshift({ name: "Tous" , id : "0" });


  //Boucle pour creer les noms de categories
  categories.forEach((category) => {
    const Element = document.createElement("p");
    Element.innerText = category.name;
    Element.setAttribute("data-id", category.id)
    Element.addEventListener("click", async (event) => {
      
      const allElements = document.querySelectorAll(".filter p");
      allElements.forEach((color) => {
        color.classList.remove("filterActive");
      });
      Element.classList.add("filterActive");
   
      const works = await getWorks();
      console.log(works);
      console.log(event.target.getAttribute("data-id"));
      const filterWorks = event.target.getAttribute("data-id") === "0" ? works : works.filter(work => work.categoryId == event.target.getAttribute("data-id"));
      console.log(filterWorks);
      displayWorks(filterWorks); //Ajout click sur les categories
    });
    filter.appendChild(Element); //Ajout chaque categories dans filter
  });
}







async function init(){
  const works = await getWorks();
  const categories = await getCategories();
  
  
  displayWorks(works);
  await displayCategories(categories);
  
}

init();