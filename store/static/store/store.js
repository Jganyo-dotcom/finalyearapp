document.addEventListener('DOMContentLoaded', function(){
    let topic = document.querySelector('.topic')
    console.log('ready')
    document.querySelectorAll('.custom').forEach (function(button){
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
             const writter = item.authors ? item.authors.join(','): 'not avaliable'
             
             const link = item.url || 'not available'
             
               newdiv = document.createElement('div')
               topic.innerHTML = area
               
    newdiv.innerHTML = `
            <strong>Title:</strong> ${name}<br>
            <strong>Link:</strong> <a href="${link}" target="_blank" rel="noopener noreferrer">View Article</a><br>
            <strong>Authors:</strong> ${writter}
            `;


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

    
    const search_btn = document.querySelector('#searchtopic')
    if (search_btn){
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
                    const writter = item.authors ? item.authors.join(',') : 'not available'
                   
                    const link = item.url || 'not avalable'
                    
                    newdiv = document.createElement('div')
                    
            newdiv.innerHTML = `
            <strong>Title:</strong> ${name}<br>
            <strong>Link:</strong> <a href="${link}" target="_blank" rel="noopener noreferrer">View Article</a><br>
            <strong>Authors:</strong> ${writter}
            `;


            document.querySelector('.info').appendChild(newdiv)
            
                    
                }
                 document.querySelector('#search-text').value = '';
                 topic.innerHTML = area
                
            })
            .catch(error =>
                console.error(
            error
                )
            )

            }

    }

    

            document.querySelector('#searchbook-btn').onclick = function(){
                let book_title = document.querySelector('#searchBook-value').value
                 

                if(book_title.trim() !== ''){
                    window.scrollTo({ top: 0, behavior: 'smooth' });

                    document.querySelector('.info_on_topic').innerHTML = `<h1>Loading please wait ...<h1>`
                    fetch(`https://www.googleapis.com/books/v1/volumes?q=${book_title}`)
                .then(response =>response.json())
                .then(data=>{
                     document.querySelector('.info_on_topic').innerHTML = ``
    
                    for (item of data.items){
                        let info =item.volumeInfo;
                        const title = info.title || 'not available';
                        const author = info.authors ? info.authors.join(',') : 'not available';
                        const preview_link = info.previewLink || 'no link available';
                        const info_link = info.infoLink ||'no link available'
                        const lang = info.language ||'not available';
                        const categories = info.categories ||'not available';
                        const description =info.description|| 'not available';
                        const pageCount = info.pageCount || 'not available';

                        let newdiv = document.createElement('div')
                        let anewdiv = document.createElement('div')
                        newdiv.innerHTML = `
                        <strong>Title:</strong> ${title}<br>
                        <strong>Author:</strong> ${author}<br>
                        <strong>Preview link:</strong> <a href='${preview_link}' target='_blank'>Click to preview</a><br>
                        <strong>Info link:</strong> <a href='${info_link}' target='_blank'>More info</a><br>
                        <strong>Language:</strong> ${lang}<br>
                        <strong>Category:</strong> ${categories}<br>
                        <strong>Total pages:</strong> ${pageCount}<br>
                        <hr>
                        <strong>Description:</strong> ${description}
                        `;

                        
                        document.querySelector('.info_on_topic').appendChild(newdiv)
                    }
                    document.querySelector('#searchBook-value').value ='';
                    document.querySelector('#book_title').innerHTML= book_title
                    
        })
        .catch(error=>{
            console.error('error :', error)
        })
                }else{
                    alert('search area cant be empty')
                }
                
            }
    
})