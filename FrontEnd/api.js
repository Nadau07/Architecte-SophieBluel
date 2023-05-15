const baseUrl = 'http://localhost:5678/api';



async function getWorks (){

    const response = await fetch ('http://localhost:5678/api/works')
    console.log(response)
    const data = await response.json()
    console.log(data)
    return data
}
