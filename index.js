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
            $('.col-sm-4', html).each(function () {                
                const computerName = $(this).find('h4 a').attr('title');
               
                const price = $(this).find('.price').text();

                const description = $(this).find('.description').text();

                computers.push({
                    computerName,
                    price,
                    description,
                });


            });

            
            res.json(computers)
        })
        .catch(err => console.log(err))
});




app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${PORT}`)
});