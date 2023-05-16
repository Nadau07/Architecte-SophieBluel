const baseUrl = 'http://localhost:5678/api';



async function getWorks(){

    const response = await fetch ('http://localhost:5678/api/works')
    console.log(response)
    const data = await response.json()
    console.log(data)
    return data
}


async function Categories(){
    const response2 = await fetch ('http://localhost:5678/api/categories')
    console.log(response2)
    const data2 = await response2.json()
    console.log(data2)
    return data2

    document.querySelector('#filter').src =data2.url
}