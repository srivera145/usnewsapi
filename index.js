const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const PORT = process.env.PORT || 4060;
const app = express();

const usnews = [
  {
     name: 'Google News US',
     link: 'https://news.google.com/topics/CAAqIggKIhxDQkFTRHdvSkwyMHZNRGxqTjNjd0VnSmxiaWdBUAE?hl=en-US&gl=US&ceid=US%3Aen',
     base: 'https://news.google.com/'
   },
   {
     name: 'Fox News US',
     link: 'https://www.foxnews.com/us',
     base: 'https://www.foxnews.com'
   },
  {
    name: 'BBC News US',
    link: 'https://www.bbc.com/news/world/us_and_canada',
    base: 'https://www.bbc.com/'
  },
  {
    name: 'NBC News US',
    link: 'https://www.nbcnews.com/us-news',
    base: 'https://www.nbcnews.com/'
  },
  {
    name: 'CBS News US',
    link: 'https://www.cbsnews.com/us/',
    base: ''
  },
  {
    name: 'ABC News US',
    link: 'https://abcnews.go.com/US',
    base: 'https://abcnews.go.com'
  },
  {
    name: 'CNN US',
    link: 'https://www.cnn.com/us',
    base: 'https://www.cnn.com'
  }
];

const usnewsArticles = [];

usnews.forEach((usnews) => {
  axios.get(usnews.link).then((response) => {
    const html = response.data
    const $ = cheerio.load(html)
    

    $('article', html).each(function () {
      const title = $(this).find('h4').text()
      const url = $(this).find('a').attr('href')
      const image = $(this).find('img').attr('src')
      const publishedAt = new Date()
      const description = $(this).find('p').text()
      const author = $(this).find('span').text()
      const source = usnews.name
      
      

      usnewsArticles.push({
        title,
        description,
        author,
        url: usnews.base + url,
        image,
        publishedAt,
        source
        
      })
    })
  })
})

app.get('/', (req, res) => {
  res.send('Welcome to the Live US News API!');
});

app.get('/usnews', (req, res) => {
  res.json(usnewsArticles);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});