
let ur = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=10&lang=eng&apiKey=502939018abf41a8ab3d988c0af6f583`
async function main(ur){
async function fetchData() {
    try {
        const response = await fetch(ur);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("try again", error);
    }
}

await fetchData().then((res) => {

    try{
    const mainContainer = document.querySelector(".mainn");
    mainContainer.innerHTML = "";
    const arr = res
    res.forEach((article, index)=> {
        const image = article.urlToImage?article.urlToImage:"null";
        const tit = article.title? article.title.slice(0,50)+"...":"null";
        const desc = article.description? article.description.slice(0,180)+"...":"null";
        if(tit === "null" || desc === "null" || image === "null"){
            return;
        }
        const articleHTML = 
           ` <div class="inmain p-2 m-1.5 grid-cols-1 w-32 h-96" id="${index}">
                <div class="ch hover:bg-slate-600 bg-white flex flex-col items-center w-72 h-[482px] p-6 gap-3 rounded-xl" data-url="${article.url}">
                    <img src="${image}" alt="" class="p-2 w-28 h-28 object-contain">       
                    <div class="text-center font-semibold p-2">${tit}</div>
                    <p class="text-center flex-grow text-sm p-2">${desc}</p>
                </div>
            </div>
        `
        console.log(image)
        mainContainer.innerHTML += articleHTML; 
    });
    document.querySelectorAll('.ch').forEach(element => {
        element.addEventListener('click', () => {
            const url = element.getAttribute('data-url');
            if (url) {
                window.open(url, '_blank');
            } else {
                console.error('URL not found for this element:', element);
            }
        });
    });
}
catch(error){
    console.error("try again",error)
}

    // Add event listeners to all .inmain divs
    
});
}
main(ur)
const searchField = document.getElementById("inp");
const  searchBox = document.getElementById("sear");
searchBox.addEventListener("click",async ()=>{
    console.log(searchField.ariaValueMax)
    const query = searchField.value
    if(query!=""){
    try{
        ur =`https://newsapi.org/v2/everything?q=${query}&from=2024-06-12&sortBy=publishedAt&apiKey=502939018abf41a8ab3d988c0af6f583`
        await main(ur);
    }
    catch(error){
        console.error("Fetching problems",error)
    }
}
})

