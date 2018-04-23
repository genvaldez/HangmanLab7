    //Variables
    var selectedWord="";
    var selectedHint="";
    var board=[];
    var remainingGuesses=6;
    var words=[{word:"snake",hint:"Its a reptile"},
               {word:"monkey",hint:"Its a mammal"},
               {word:"beetle",hint:"Its an insect"}];
    var alphabet=['A','B','C','D', 'E','F','G','H','I',
                  'J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    
    
    $("#letters").on("click",".letter",function(){
        checkLetter($(this).attr("id"));
        disableButton($(this));
    });
    $("#hintBtn").on("click",function() { 
        $("#hint").append("<span class='hint'>Hint: " + selectedHint + "</span>"); 
        remainingGuesses-=1;
        updateMan();
        $("#hint_btn").hide();
    });
    
    //Listeners
    window.onload=startGame();
    
    //functions
    function startGame(){
        $('#won').hide();
        $('#lost').hide();
        pickWord();
        initBoard();
        updateBoard();
        createLetters();
        updateBoard();

    }
    function initBoard(){
         for(var letter in selectedWord){
            board.push("_");
        }
    }
    function pickWord(){
        var randomInt=Math.floor(Math.random() * words.length);
        selectedWord=words[randomInt].word.toUpperCase();
        selectedHint=words[randomInt].hint;
    }
    function createLetters(){
        for(var letter of alphabet){
            $("#letters").append("<button class='letter' id='" + letter + "'>" +letter + "</button>");
        }
    }
    function updateBoard(){
        $("#word").empty();
        for(var i=0;i<board.length;i++){
            $("#word").append(board[i] +" ");
        } 
        $("#word").append("<br/>");
       // $("#word").append("<span class='hint'>Hint: "+ selectedHint+"</span>");
    }
    
    function checkLetter(letter){
        var positions=new Array();
        
        for(var i=0; i<selectedWord.length;i++){
            //console.log(selectedWord)
            if(letter==selectedWord[i]){
                positions.push(i);
            }
        }
        
        if(positions.length>0){
            
            updateWord(positions,letter);
            
            //Check to see if this is a winning guess
            if(!board.includes('_')){
                endGame(true);
            }
        }else{
            remainingGuesses -=1;
            updateMan();
        }
        if(remainingGuesses <=0){
            endGame(false);
        }
        
    }
    
    function updateWord(positions,letter){
        for(var pos of positions){
            board[pos]=letter;
        }
        updateBoard();
    }
    
    function updateMan(){
        $("#hangImg").attr("src", "img/stick_"+(6-remainingGuesses)+".png");
    }
    
    function endGame(win){
        $("#letters").hide();
        
        if(win){
            $('#won').show();
            $('#lost').hide();
        }else{
            $('#lost').show();
            $('#won').hide();
        }
    }
    $(".replayBtn").click(function() {
        document.getElementById("hint").innerHTML = " ";
        document.getElementById("letters").innerHTML = " ";
        document.getElementById("man").innerHTML = "<img src = \"img/stick_0.png\" id = \"hangImg\">";
        selectedWord = "";
        selectedHint = "";
        board = [];
        remainingGuesses = 6;
        $("#letters").show();
        $("#hintBtn").show();
        $("#hint").show();
        $("#man").show();
        startGame();
    });
 
    function disableButton(btn){
        btn.prop("disabled", true);
        btn.attr("class","btn btn-danger")
    }
 

 