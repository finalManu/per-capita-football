# Per-capita-football ⚽️
![](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![](https://img.shields.io/badge/Puppeteer-40B5A4?style=for-the-badge&logo=Puppeteer&logoColor=white)
![alt text](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)



The missing Transfermarkt per capita market value of national teams.

https://finalmanu.github.io/per-capita-football/

## What is *Transfermarkt*? <a href="https://www.transfermarkt.us/"><img src="https://tmsi.akamaized.net/head/transfermarkt_logo.svg" style="width: 50px; height: auto;"></a>

Transfermarkt is a German-based website known for its extensive database of football statistics and player information.

The market values on Transfermarkt are estimations of a football player's worth on the transfer market. 

These valuations are determined by various factors, including the player's age, position, performance, achievements, current club, league, and potential for development. The values are not official and don't necessarily reflect actual transfer fees, but they are commonly used as benchmarks in the football community.

## National Team Market Value - Per Capita 

The market value of a national team is simply the aggregate market value of all its players combined. 

Dividing this value by the population of the respective team's country gives you their *per capita* value.

## How does it work? 

Node.js is used to run Puppeteer in headless mode to scrape the the market value of four pages worth (aprox ~100) of teams from transfermarkt.

The [REST countries](https://restcountries.com/) API is then used to fetch flag images and population data of the resulting countries.

The data is then processed, cached, and dynamically presented by generating HTML table rows. 

A CRON job is set-up through GitHub Actions to run once a week and automatically update and republish the site on GitHub pages if the data has been updated.




    


