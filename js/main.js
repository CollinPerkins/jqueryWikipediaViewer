$( document ).ready(function() {
  var searchResults = [];

  $(".searchForm").submit(function(event){
    event.preventDefault();
    var searchVal = $( ".searchInput" ).val();
    wikiSearch(searchVal);
  });

  function displayResults( results ) {
    var resultsList = "";
    for (var i = 0; i < results.length; i++) {
      console.log(results[i]);
      resultsList += `<a href="${results[i].link}" target="_blank">
        <li>
          <p class="title">${results[i].title}</p>
          <p class="description">${results[i].description}</p>
        </li>
      </a>`;
    }
    $(".searchList").html(resultsList);
    searchResults = [];
  }

  function wikiSearch( queryParam ) {
    if(queryParam){
      $.ajax({
        url: "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + queryParam  + "&format=json",
        jsonp: "callback",
        dataType: "jsonp",
        data: {
          format: "json"
        },
        success: (res) => {
          var titleList = res[1];
          var descriptionList = res[2];
          var linkList = res[3];
          for (var i = 0; i < titleList.length; i++) {
            searchResults.push({
              title: titleList[i],
              description: descriptionList[i],
              link: linkList[i],
            });
          }
          displayResults(searchResults);
        }
      });
    } else {
      $(".searchList").html('<p class="error">Please type in a search term!</p>');
    }
  }

});
