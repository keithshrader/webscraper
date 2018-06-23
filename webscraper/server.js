var express = require("express");
var fs = require("fs");
var axios = require("axios");
var cheerio = require("cheerio");
var app = express();

const scrape = () => {
  url =
    "https://www.imdb.com/search/keyword?keywords=b-horror&sort=moviemeter,asc&mode=detail&page=1&genres=Horror&ref_=kw_ref_gnr";

  axios
    .get(url)
    .then(res => res.data)
    .then(html => {
      var $ = cheerio.load(html);

      console.log(html);
      var movies = [];

      $("div.lister-item-content").each((i, elem) => {
        const movie = {};

        var data = $(elem);
        movie.title = data
          .find("h3 a")
          .text()
          .trim();
        movie.release = data
          .find(".lister-item-year")
          .text()
          .trim()
          .replace(/\(|\)/g, "");
        movie.rating = data
          .find(".ratings-imdb-rating")
          .text()
          .trim()
          .replace(/\(|\)/g, "");

        movies.push(movie);
        console.log(movie);
      });

      fs.writeFile("./output.json", JSON.stringify(movies, null, 4), function(
        err
      ) {
        if (err) {
          console.log("Error!");
        }
        console.log(
          "File successfully written! - Check your project directory for the output.json file"
        );
      });

      console.log("Check your console!");
    });
};

scrape();

// app.listen("8081");
// console.log("Magic happens on port 8081");
// exports = module.exports = app;
