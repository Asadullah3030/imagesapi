const searchForm = document.querySelector('form')
const searchInput = document.querySelector('.search-input')
const messageArea = document.querySelector('.message-area')
const Container = document.querySelector('.container')
const Overlay = document.querySelector('.overlay')
const LoadMore = document.querySelector('.load-more')
const accessKey = 'MlzGObHD_L30vfzZbL9zqZqmwDvyLFnSWk9VzANw2UU'



// FetchImages function is define
const FetchImages = async (query,pageNo) => {
    // console.log(query);
    const Url = `https://api.unsplash.com/search/photos/?query=${query}&page${pageNo}&per_page=${28}&client_id=${accessKey}`
    const data = await fetch(Url)
    const response = await data.json()
    
    messageArea.innerHTML = ''
    // console.log(response);
    
    if (pageNo === 1) {
        Container.innerHTML = ''
    }

    if (response.results.length > 0) {
        for(const elem of response.results){
            console.log(elem);
            let box = document.createElement('div')
            box.classList.add('box')
            box.innerHTML = `
            <div class="box">
            <div class="img-box">
                    <img src=${elem.urls.regular}></img>
    
                    <div class="icon">
                            <i class="fa-solid fa-heart"></i>
                            <h3>${elem.likes}</h3>
                    </div>
            </div>
    </div> 
           `
           Container.appendChild(box)
        }
        if (response.total_pages === pageNo) {
            LoadMore.style.display = 'none'
        }else{
            LoadMore.style.display = 'block'
        }
    }
    else{
        messageArea.innerHTML = `
            <h2>please write valid this text related no images</h2>
        `
        if (LoadMore.style.display === 'block') {
            LoadMore.style.display = 'none'
        }
    }
}



let page = 1
searchForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    let searchText = searchInput.value.trim()
    if (searchText !== '') {
    page = 1
    FetchImages(searchText,page)
    }else{
        messageArea.innerHTML = `
            <h2>please something write</h2>
        `
    }
})


LoadMore.addEventListener('click',()=>{
    let storeImg = searchInput.value.trim()
    FetchImages(storeImg, ++page)
})







searchInput.addEventListener('focus',()=>{
    Overlay.style.display = 'block'
})

searchInput.addEventListener('blur',()=>{
    Overlay.style.display = 'none'
})

searchInput.addEventListener('keydown',(e)=>{
    if (e.key === 'Enter') {
        Overlay.style.display = 'none'
    }
})