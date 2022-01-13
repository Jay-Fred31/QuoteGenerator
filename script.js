// Retrieve all necessary Id for DOM Manipulation

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const author = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


// Get Quotes from API

let apiQuotes = [];

// Show it is Loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}


// Hide Loading

function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}


// Show new Quote
function newQuote(){
  loading();
  // pick random quote from api array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // check if the author field is null and replace it with "unkown"
  if (!quote.author) {
    author.textContent = "unknown";
  } else {
    author.textContent = quote.author;
  }

  // Check quote length to determine styling. Use longquote class to reduce the font size of a long quote
  if (quote.text.length > 20) {
    quoteText.classList.add("long-qoute");
  } else {
    quoteText.classList.remove("long-qoute");
  }
  // Set Qoute and hide Loader
  quoteText.textContent = quote.text;
  complete();
}

// connect twitter btn and direct quote to twitter

function tweetQuote(){
    const twitterurl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textcontent}`;
    window.open(twitterurl, '_blank')
}

// add eventListener to newQuote and twitterbtn

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


// Get Quotes from API
async function getQuotes(){
    loading();
    const apiUrl = "https://type.fit/api/quotes";
    try{
        // Fetch quotes from the url
        const response = await fetch(apiUrl);
        // parse response to json object
        apiQuotes = await response.json();
        newQuote();

    }catch(error){
        // Catch error if the promise is reject or not resolved
    }   
}

// On Load
getQuotes();



// If using Local data

// function newQuote(){
//     const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)]
//     console.log(quote)
// }

// // On load From Local storage
// newQuote();