document.addEventListener('DOMContentLoaded', function(){
    console.log('ready')
    document.querySelectorAll('button[data-info]').forEach (function(button){
        button.onclick = function(){
            const area = this.dataset.info
            document.querySelector('.info').innerHTML = `<h1>Loading please wait ...<h1>`
            fetch(`https://dataverse.harvard.edu/api/search?q=${area}&type=dataset`)
    .then(response => response.json())
    .then(data =>{
        let info = data.data.items
        document.querySelector('.info').innerHTML = ''
       
      
        for ( let item of info){
            
             const name = item.name
             const writter = item.authors || []
             let writter_1 = writter[0] || 'unknown'
             let writter_2 = writter[1] || '';
             let writter_3 = writter[2] || '';
             const link = item.url
             
               newdiv = document.createElement('div')
               
    newdiv.innerHTML= `
     Title :<strong>${name}</strong><br>
    link : <a href ='${link}' target = '_blank'>${link}</a><br>
    authors:${writter_1},   ${writter_2} ,${writter_3}`

    document.querySelector('.info').appendChild(newdiv)
            
        }
        
    })
    .catch(error =>
        console.error(
     error
        )
    )

    
        }
        
    })

    
    const search_btn = document.querySelector('.search')

    search_btn.onclick = function(){
        let area = document.querySelector('#search-text').value

        if (area.length < 2 ){
            alert('search box cant be empty!!!')
            return;
        }
        document.querySelector('.info').innerHTML = `<h1>Loading please wait ...<h1>`
            fetch(`https://dataverse.harvard.edu/api/search?q=${area}&type=dataset`)
            .then(response => response.json())
            .then(data =>{
                let info = data.data.items
                document.querySelector('.info').innerHTML = ''
            
            
                for ( let item of info){
                    
                    const name = item.name
                    const writter = item.authors || []
                    let writter_1 = writter[0] || 'unknown'
                    let writter_2 = writter[1] || '';
                    let writter_3 = writter[2] || '';
                    const link = item.url
                    
                    newdiv = document.createElement('div')
                    
            newdiv.innerHTML= `
            Title :<strong>${name}</strong><br>
            link : <a href ='${link}' target = '_blank'>${link}</a><br>
            authors:${writter_1},   ${writter_2} ,${writter_3}`

            document.querySelector('.info').appendChild(newdiv)
            
                    
                }
                 document.querySelector('#search-text').value = '';
                
            })
            .catch(error =>
                console.error(
            error
                )
            )

            }
    
})