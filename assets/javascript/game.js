$(document).ready(function() {
    //The teams array is used to generate the word being guessed as well as the team logo that pops up after the game is over
    var teams = ["bucks", "raptors", "pacers", "sixers", "celtics", "heat", "hornets", "pistons", "nets", "magic", "wizards", "hawks", "bulls", "knicks", "cavaliers", "nuggets", "thunder", "warriors", "rockets", "blazers", "clippers", "spurs", "lakers", "kings", "grizzlies", "mavericks", "jazz", "timberwolves", "pelicans", "suns"];
    //Selects a team at random to guess
    var team_index = Math.floor(Math.random()*teams.length);
    var team_select = teams[team_index];
    
    //Sets the game image to that of a basketball
    var image = $(".game-image");
    image.attr("src", "assets/images/basketball.png");

    //Originally shows the word as a series of "-" equal to the length of the team selected
    var word = "";
    for(var i = 0; i < team_select.length; i++){
        word = word + "-";
    };

    var game_word = $(".game-word");
    game_word.text(word);

    //Originally shows 0 wins
    var wins = 0;
    $(".wins").text(wins)
    
    //Originally shows there are 12 guesses remaining
    var guesses = 7;
    $(".guesses").text(guesses);

    //Empty array that will be filled as letters are guessed
    var letters_guessed = [];

    //Key press event for the whole document
    $(document).keypress(function(event){
        //Only does something if the key pressed is a lowercase letter (a-z)
        if (event.which >= 97 && event.which <= 122){
            var temp_word = ""; //Empty string that fills in the proper letters as they are guessed, and is eventually turned into the "word" variable
            var already_guessed = false; //Boolean variable that checks if a letter has been guessed
            var letter_guess = String.fromCharCode(event.which); //Turns value of key pressed into its proper letter

            //Checks if the letter has been guessed already
            letters_guessed.forEach(function(value){
                if (letter_guess == value){
                    already_guessed = true;
                }
            });

            //Only executes if the letter hasn't been guessed
            if (already_guessed == false){
                letters_guessed.push(letter_guess); //Adds the letter guessed to the letters_guessed array
                var letters_guessed_text = "";
                letters_guessed.forEach(function(value){
                    letters_guessed_text = letters_guessed_text + value + " ";
                    letters_guessed_text = letters_guessed_text.toUpperCase();
                });
                //Shows all the letters that have been guessed in Uppercase
                $(".letters-guessed").text(letters_guessed_text);
                
                letter_there = false; //Boolean variable that checks if the letter is in the word

                //Checks to see if the letter that's been guessed is in the word, and fills in the word with the letter guessed
                for (var i = 0; i < team_select.length; i++){
                    if (letter_guess == team_select[i]){
                        temp_word = temp_word+letter_guess;
                        letter_there = true;
                    }
                    else{
                        temp_word = temp_word+word[i];
                    }
                };
                
                if (letter_there == false){
                    //Guesses go down 1
                    guesses--;
                }

                word = temp_word;
                game_word.text(word);


                $(".guesses").text(guesses);
                var win = "You Lose";

                if (word == team_select || guesses == 0){
                    $(".btm").hide(); //Hides guesses remaining and letters already guessed divs to show win message
                    //Executes if the game is lost
                    if (word != team_select){
                        $(".win").text(win);
                    }
                    //Executes if the game is won
                    else{
                        win = "You Win!";
                        $(".win").text(win);
                        wins++;
                        $(".wins").text(wins);
                    }

                    //Shows if the user has won or lost
                    $(".win").show();
                    
                    //Reveals the team logo of the word after the game ends
                    image.attr("src", "assets/images/"+team_select+".png");

                    //Shows the team logo and win message for 2 seconds, then picks a team at random and allows the player to play again
                    setTimeout(function(){
                        $(".win").hide();
                        $(".btm").show();
                        word = "";
                        image.attr("src", "assets/images/basketball.png");

                        team_index = Math.floor(Math.random()*teams.length);
                        team_select = teams[team_index];

                        for(var i = 0; i < team_select.length; i++){
                            word = word + "-";
                        };

                        game_word = $(".game-word");
                        game_word.text(word);
                        
                        guesses = 7;
                        $(".guesses").text(guesses);

                        letters_guessed = [];
                        letters_guessed_text = "";
                        $(".letters-guessed").text(letters_guessed_text);

                    }, 2000);
                }
            }
        }
    });
});