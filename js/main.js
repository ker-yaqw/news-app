const searchBtn =  document.getElementById('searchBtn');
const newsQuery = document.getElementById('newsQuery');
const newsContent = document.getElementById('newsContent');
let newsData = [];

const apiKey = "0e8c75d50e5247df8c6d92b8e2fcea3e";



window.onload = () => {
  fetchHeadlines();
};


searchBtn.addEventListener('click', () => {
  fetchQueryNews();
});


const fetchHeadlines = async () => {
  const response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`);
  newsData = [];
  
  if(response.status >=200 && response.status < 300) {
    const dataJson = await response.json();
    newsData = dataJson.articles;
  } else {
    console.log(response.status, response.statusText);
    return;
  }
  renderNews();
}


const fetchQueryNews = async () => {
    
  if(newsQuery.value == null) {return;}

  const response = await fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(newsQuery.value)}&apiKey=${apiKey}`);
  newsData = [];
  
  if(response.status >= 200 && response.status < 300) {
      const dataJson = await response.json();
      newsData = dataJson.articles;
  } else {
      console.log(response.status, response.statusText);
      return;
  }

  renderNews();  
}


function renderNews() {
  newsData.forEach((news) => {

    // create item
    const item = document.createElement('div');
    item.classList.add('news-content-item');
    const itemWrap = document.createElement('div');
    itemWrap.classList.add('news-content-item__wrapper');

    // add image to item
    const image = document.createElement('img');
    image.classList.add('news-content-item__image');
    image.src=news.urlToImage;
    
    //add dateDay to item
    const date = news.publishedAt.split("T");
    const dateDay = document.createElement('span');
    dateDay.classList.add('news-content-item__published');
    dateDay.innerHTML = date[0];

    //add title to item
    const title = document.createElement('h3');
    title.classList.add('news-content-item__title');
    title.innerHTML = news.title;

    //add description to item
    const discription = document.createElement('p');
    discription.classList.add('news-content-item__text');
    discription.innerHTML = news.description;

    //add buttonLink to item
    const link = document.createElement('a');
    link.classList.add('news-content-item__link');
    link.setAttribute("target", "_blank");
    link.href = news.url;
    link.innerHTML="Read more";


    itemWrap.appendChild(dateDay);
    itemWrap.appendChild(title);
    itemWrap.appendChild(discription);
    itemWrap.appendChild(link);
    item.appendChild(image);
    item.appendChild(itemWrap);
    newsContent.appendChild(item);
  });
}
