$('#search').on('click', function () {
    // prevents the button from submitting the form, which refreshes the page
    event.preventDefault();

    //ensure the article div is empty
    $('#articles').empty();
    
    // create a variable from start and end year inputs.
    let startYear = $('#start-year').val().trim();
    let endYear = $('#end-year').val().trim();
    // create a variable for our query. this gets added onto the query url, so it requires the q= on the front so the API knows what it is
    let search = "q=" + $('#search-field').val().trim();
    // create a number value for how many items we want to return
    let number = parseInt($('#number').val());

    let sYear = '';
    let eYear = '';
    
    if (parseInt(startYear)){
        sYear = '&start_date=' + startYear + '0101';
    }
    if (parseInt(endYear)){
        eYear = '&end_date=' + endYear + '0101';
    }


    // create a variable to hold the api key as well as construct the query url 
    let apiKey = "&api-key=E221IMUDbv3BzDz0FpALpvw8XADnbMyM";
    let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?" + search + apiKey + sYear + eYear;

    console.log(queryURL);
    
    $.ajax({url: queryURL, method: "GET"}).then(function(response){
        console.log(response);
        // take the response and convert it from a long dot notation to a shorter variable. Note: response.response.docs is an array, so docs also becomes an array
        let docs = response.response.docs;
        // loop through all documents (up to the number we wanted from user input) returned and create a link with the headline and byline
        for (let i = 0; i < number; i++) {
            let a = $('<a>');
            let h2 = $('<h2>').text(docs[i].headline.main);
            let p = $('<p>').text(docs[i].byline.original);
            a.attr('href', docs[i].web_url);
            a.attr('target', '_empty');
            a.append(h2, p);
            $('#articles').append(a);
        }
    });

});