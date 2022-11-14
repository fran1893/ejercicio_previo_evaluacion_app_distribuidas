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
            // console.log(response.data);
            const html = response.data;

            const $ = cheerio.load(html);
            // console.log($)

            const noticias = []
            $('.main-article-container  .row', html).each(function () {                // no puede ser arrow function
                const titulo = $(this).find('.title').text();
                // console.log(titulo);
                const subtitulo = $(this).find('.supra-title').text();

                const nombreAutor = $(this).find('.author-opinion-name a').text();

                const imagenAutor = URLimagenes + $(this).find('.img-opinion > img').attr('data-src');

                const contenidoTexto = $(this).find('.paragraph').text();

                noticias.push({
                    titulo,
                    subtitulo,
                    imagenAutor,
                    nombreAutor,
                    contenidoTexto
                });


            });

            // console.log(noticias);
            res.json(noticias)
        })
        .catch(err => console.log(err))
});




app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${PORT}`)
});