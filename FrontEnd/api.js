const baseUrl = 'http://localhost:5678/api';

async function getWorks(){
    const response = await fetch ('http://localhost:5678/api/works')
    const data = await response.json()
  //  console.log(data)
    return data


}

async function getCategories(){
    const response2 = await fetch ('http://localhost:5678/api/categories')
    const data2 = await response2.json()
    //console.log(data2)
    return data2
}

async function Login(){
    const response = await fetch("http://localhost:5678/api/users/login")
    const resultat = await response.json();
    const token = resultat.token;
    localStorage.setItem("token", token);
    console.log(resultat)
    return resultat
}

/* Autre possibilité de recuperer via l'API
    fetch('http://localhost:5678/api/categories')
    .then(res => res.json())
    .then(res2 => console.log(res2))
*/
