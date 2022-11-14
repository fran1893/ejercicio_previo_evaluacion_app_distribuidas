const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const { join } = require('path');

const app = express();
const PORT = 4000;
const URL = 'https://webscraper.io/test-sites/e-commerce/allinone/computers';

app.use(express.static(join(__dirname, 'public')));


app.get('/scraper', (req, res) => {

    axios(URL)
        .then(response => {
            const html = response.data;

            const $ = cheerio.load(html);

            const computers = []
            $('.main-article-container  .row', html).each(function () {                
                const titulo = $(this).find('.title').text();
               
                const subtitulo = $(this).find('.supra-title').text();

                const nombreAutor = $(this).find('.author-opinion-name a').text();

                const imagenAutor = URLimagenes + $(this).find('.img-opinion > img').attr('data-src');

                const contenidoTexto = $(this).find('.paragraph').text();

                computers.push({
                    titulo,
                    subtitulo,
                    imagenAutor,
                    nombreAutor,
                    contenidoTexto
                });


            });

            
            res.json(noticias)
        })
        .catch(err => console.log(err))
});




app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${PORT}`)
});