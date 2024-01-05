import unirest from "unirest";
import cheerio from "cheerio";


function getData(name) {
  return new Promise((resolve, reject) => {
    const url = `https://www.google.com/search?q=${name}+wikipedia&num=50`;
    const selectRandom = () => {
      const userAgents = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36",
      ];
      var randomNumber = Math.floor(Math.random() * userAgents.length);
      return userAgents[randomNumber];
    };
    let user_agent = selectRandom();
    let header = {
      "User-Agent": `${user_agent}`,
    };
    try {
      unirest
        .get(url)
        .headers(header)
        .then((response) => {
          var data_scraped = []
          const $ = cheerio.load(response.body);
          $('#rso > .MjjYud .yuRUbf').each((i, el) => {
            data_scraped[i] = {
              title: $(el).find('span > a > h3').text(),
              link: $(el).find('span a').attr("href"),
            }
          })
          $('#rso > .MjjYud .VwiC3b').each((i, el) => {
            data_scraped[i].description = $(el).find('span').text()
          })
          data_scraped = data_scraped.filter((ele) => {
            return ele.description != '' && ele.link.includes('https://en.')
          })
          resolve(JSON.stringify({ "search_results":data_scraped}));
        })
    }
    catch (err) {
      reject("Error Occured")
    }
  })

}

export default getData;

