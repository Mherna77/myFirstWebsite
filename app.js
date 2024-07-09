//Carousle for Home Page(INDEX)
document.addEventListener('DOMContentLoaded', function() {
    const prevBtn = document.querySelector('.left');
    const nextBtn = document.querySelector('.right');
    const imageSlider = document.getElementById('imageSlider');
    const images = document.querySelectorAll('.images li');
    const navContainer = document.querySelector('.images-nav');

    let currentIndex = 0;

    // Function to show the current image
    function showImage(index) {
        imageSlider.style.transform = `translateX(-${index * 100}%)`;
        updateNavCircles(index);
    }

    // Function to update the appearance of nav circles
    function updateNavCircles(index) {
        navCircles.forEach((circle, i) => {
            if (i === index) {
                circle.classList.add('active');
            } else {
                circle.classList.remove('active');
            }
        });
    }

    // Function to handle next button click
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    });

    // Function to handle previous button click
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    });

    // Dynamically generate nav circles based on the number of images
    for (let i = 0; i < images.length; i++) {
        const circle = document.createElement('div');
        circle.classList.add('images-nav-item');
        if (i === 0) {
            circle.classList.add('active');
        }
        navContainer.appendChild(circle);
    }

    // Store references to all nav circles
    const navCircles = document.querySelectorAll('.images-nav-item');

    // Show initial image
    showImage(currentIndex);
});


//Resources Accordion

document.addEventListener('DOMContentLoaded', function() {
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const btn = item.querySelector('.accordion-btn');
        const arrowIcon = btn.querySelector('.arrow-icon');

        btn.addEventListener('click', () => {
            // Toggle active class on the clicked accordion item
            item.classList.toggle('active');

            // Toggle arrow icon direction
            arrowIcon.classList.toggle('arrow-down');

            // Close other accordion items
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.arrow-icon').classList.remove('arrow-down');
                }
            });
        });
    });
});


//Event Modal

document.addEventListener('DOMContentLoaded', function() {
    const signupModal = document.getElementById('signup-modal');
    const thankyouModal = document.getElementById('thankyou-modal');
    const signupButtons = document.querySelectorAll('.sign-up-btn');
    const closeButtons = document.querySelectorAll('.close');
  
    signupButtons.forEach(button => {
      button.addEventListener('click', () => {
        signupModal.style.display = 'block';
      });
    });
  
    closeButtons.forEach(button => {
      button.addEventListener('click', () => {
        signupModal.style.display = 'none';
        thankyouModal.style.display = 'none';
      });
    });
  
    window.addEventListener('click', (event) => {
      if (event.target === signupModal || event.target === thankyouModal) {
        signupModal.style.display = 'none';
        thankyouModal.style.display = 'none';
      }
    });
  
    const signupForm = document.getElementById('signup-form');
    signupForm.addEventListener('submit', (event) => {
      event.preventDefault(); 
      signupModal.style.display = 'none';
      thankyouModal.style.display = 'block';
    });
  });

  //Wikipidia API
  document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const searchResults = document.getElementById("searchResults");

    // Function to handle Wikipedia search
    function searchWikipedia() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm === "") {
            alert("Please enter a search term.");
            return;
        }

        // Clear previous search results
        searchResults.innerHTML = "";

        // URL for Wikipedia API search
        const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${searchTerm}&origin=*`;

        // Fetch data from Wikipedia API
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const searchItems = data.query.search;
                searchItems.forEach(item => {
                    const searchResult = document.createElement("div");
                    searchResult.innerHTML = `
                        <a href="https://en.wikipedia.org/wiki/${encodeURIComponent(item.title)}" target="_blank">
                            <h3>${item.title}</h3>
                            <p>${item.snippet}</p>
                        </a>
                    `;
                    searchResults.appendChild(searchResult);
                });
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                searchResults.innerHTML = "<p>Failed to fetch search results. Please try again later.</p>";
            });
    }

    // Event listener for search button
    searchBtn.addEventListener("click", searchWikipedia);

    // Allow pressing Enter to trigger search
    searchInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            searchWikipedia();
        }
    });
});



  
//Trivia game
document.addEventListener("DOMContentLoaded", function() {
    const triviaContainer = document.getElementById("trivia-container");
    const feedback = document.getElementById("feedback");
    const scoreDisplay = document.getElementById("score");
    let score = 0;
    let currentQuestionIndex = 0;
    let triviaData = [];

    // Fetch trivia data from the API
    fetch("https://opentdb.com/api.php?amount=5&category=32&difficulty=easy&type=multiple")
        .then(response => response.json())
        .then(data => {
            triviaData = data.results;
            displayQuestion();
        })
        .catch(error => {
            console.error("Error fetching trivia data:", error);
            triviaContainer.innerHTML = "<p>Failed to fetch trivia questions</p>";
        });

    // Function to display current question
    function displayQuestion() {
        const currentQuestion = triviaData[currentQuestionIndex];
        triviaContainer.innerHTML = `<p class="trivia-question">${currentQuestion.question}</p>`;
        const answers = currentQuestion.incorrect_answers.concat(currentQuestion.correct_answer);
        const shuffledAnswers = shuffleArray(answers);
        shuffledAnswers.forEach(answer => {
            const answerButton = document.createElement("button");
            answerButton.textContent = answer;
            answerButton.classList.add("trivia-answer");
            answerButton.addEventListener("click", () => checkAnswer(answer, currentQuestion.correct_answer));
            triviaContainer.appendChild(answerButton);
        });
    }

    // Function to check user's answer
    function checkAnswer(selectedAnswer, correctAnswer) {
        if (selectedAnswer === correctAnswer) {
            feedback.textContent = "Correct answer!";
            feedback.style.color = "green";
            score++;
        } else {
            feedback.textContent = "Incorrect answer. Try again!";
            feedback.style.color = "red";
        }
        scoreDisplay.textContent = `Score: ${score}`;
        currentQuestionIndex++;
        if (currentQuestionIndex < triviaData.length) {
            setTimeout(displayQuestion, 2000);
        } else {
            triviaContainer.innerHTML = "<p>Quiz completed!</p>";
            
        }
    }

    // Function to shuffle array
    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }
});


/*Homepage Quotes */
document.addEventListener("DOMContentLoaded", function() {
    const quoteContainer = document.getElementById("quote-container");
    const refreshQuoteBtn = document.getElementById("refreshQuoteBtn");

    refreshQuoteBtn.addEventListener("click", fetchQuote);

    function fetchQuote() {
        fetch("https://api.quotable.io/random")
            .then(response => response.json())
            .then(data => {
                const quoteText = data.content;
                const author = data.author;
                const quoteHTML = `<p>"${quoteText}"</p><p>- ${author}</p>`;
                quoteContainer.innerHTML = quoteHTML;
            })
            .catch(error => {
                console.error("Error fetching quote:", error);
                quoteContainer.innerHTML = "<p>Failed to fetch quote. Please try again later.</p>";
            });
    }

    fetchQuote();
});

















