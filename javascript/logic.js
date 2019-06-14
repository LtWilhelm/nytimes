let search = "election";
let apiKey = "&api-key=E221IMUDbv3BzDz0FpALpvw8XADnbMyM";
let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + search + apiKey;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    console.log(response);
})