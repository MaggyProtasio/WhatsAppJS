var conversazione = `{
    "messaggio": [
    {
        "nome": "Nonna",
        "text": "ho sentito che il tuo cane è morto 😂"
    },
    {
        "nome": "Io",
        "text": "nonna! è appena successo"
    },
    {
        "nome": "Nonna",
        "text": " è così triste, era un bravo cane 😂",
        "image": "cane.jpg"
    },
    {
        "nome": "Nonna",
        "text": "a volte sembra ingiusto 😂"
    },
    {
        "nome": "Nonna",
        "text": "prima il nonno, ora pepe 😂"
    },
    {
        "nome": "Nonna",
        "text": "che riposino in pace 😂"
    },
    {
        "nome": "Io",
        "istruzione": "<b>digitare la tua risposta</b><br> ('fermati' o 'smettila')"
    },
    {
        "nome": "Nonna",
        "controllo" : "si",
        "parolaChiave1": "fermati",
        "cont1": 8,
        "parolaChiave2": "smettila",
        "cont2": 11
    },
    {
        "nome": "Nonna",
        "text": "oh tesoro, non dovresti tenere dentro il dolore, fallo uscire 😂"
    },
    {
        "nome": "Io",
        "text": "va bene!"
    }, 
    {
        "nome": "Io",
        "text": "vuoi che lo faccia uscire?"
    }, 
    {
        "nome": "Io",
        "text": "ma perché ridi! non è divertente '😂' smettila di ridere nonna!"
    },
    {
        "nome": "Nonna",
        "text": "tesoro, non sto ridendo sto piangendo"
    },
    {
        "nome": "Io",
        "text": "che cosa?"
    },
    {
        "nome": "Nonna",
        "text": "pensavo significasse piangere:😂"
    },
    {
        "nome": "Io",
        "text": "ah, no no"
    },
    {
        "nome": "Nonna",
        "text": "è questa che piange?😹"
    },
    {
        "nome": "Nonna",
        "text": "o è questo?😪"
    },
    {
        "nome": "Nonna",
        "text": "no aspetta, questo?😩💦"
    },
    {
        "nome": "Io",
        "text": "hahahaha",
        "image": "facePalm.gif"
    }
    ]
}`;

var obj = JSON.parse(conversazione);
var contMsg = 0;
var time = 2000;
var intervalli = 2000;
var jTop = -200;

function startChat(){
    $("#startScreen-box").hide();
    $("#chatScreen-box").show();
    for(var i = 0; i < obj.messaggio.length; i++){
        //mostra msg sinistra
        if(obj.messaggio[i].nome == "Nonna"){       
            if(obj.messaggio[i].controllo != null){
                var tempCont = i;
                setTimeout(function() {
                    getSendInput(tempCont);
                }, time);
            }else{
                setTimeout(showLeftMsg, time);
                time += intervalli;
            }
        }

        //mostra msg destra 
        if(obj.messaggio[i].nome == "Io"){          
            if(obj.messaggio[i].istruzione != null){
                setTimeout(showRightMsg, time);
                time += 6000;
            }else{
                setTimeout(showRightMsg, time);
                time += intervalli;
            }
        }
    }
}

function showLeftMsg(){
    var text = obj.messaggio[contMsg].text;
    var img = obj.messaggio[contMsg].image;
    if(img != null){            //se esiste immagine ha un altro formato
        $("#chatScreen").append(`
            <script type="text/javascript">
                playReceiveSound();
            </script>
            <div class="msg leftMsg fade-in-bottom">
                <img src="src/` + img + `" width="150">
                <div>` + text +`</div>
            </div>
        `);
    }else{
        $("#chatScreen").append(`
            <script type="text/javascript">
                playReceiveSound();
            </script>
            <div class="msg leftMsg fade-in-bottom">`+text+`</div>
        `);
    }
    $('#chatScreen').scrollTop(jTop);
    /* $('#chatScreen').animate({scrollTop: jTop}, 500, 'swing'); */
    jTop += 150;
    contMsg++;
}

function showRightMsg(){
    var text = obj.messaggio[contMsg].text;
    var img = obj.messaggio[contMsg].image;
    var istruzione = obj.messaggio[contMsg].istruzione;
    if(istruzione != null){                                   //istruzione esiste solo su msg destra
        $("#chatScreen").append(`
            <script type="text/javascript">
                playReceiveSound();
            </script>
            <div class="msg fade-in-bottom istrMsg">`+istruzione+`</div>
        `);
    }else{
        if(img != null){           
            $("#chatScreen").append(`
                <script type="text/javascript">
                    playSendSound();
                </script>
                <div class="msg rightMsg fade-in-bottom" onload="playSendSound()">
                    <img src="src/` + img + `" width="90">
                    <div>` + text +`</div>
                </div>
            `);
        }else{
            $("#chatScreen").append(`
                <script type="text/javascript">
                    playSendSound();
                </script>
                <div class="msg rightMsg fade-in-bottom">`+text+`</div>
            `);
        }
    }
    
    $('#chatScreen').scrollTop(jTop);
    /* $('#chatScreen').animate({scrollTop: jTop}, 500, 'swing'); */
    jTop += 150;
    contMsg++;
}

function getSendInput(i){
    var response = $('#inputResponse').val();
    console.log(response);
    console.log(i);
    var parolaChiave1 = obj.messaggio[i].parolaChiave1;     
    var parolaChiave2 = obj.messaggio[i].parolaChiave2;
    console.log("the input is - "+ response);
    if(response == ""){         //controlla se persona ha fatto risposta
    }else{
        console.log("not null");
        if(response.includes(parolaChiave1)){           //prende parole chiave e controlla che message di seguire
            console.log("response has p1");
            var cont = obj.messaggio[i].cont1;
            console.log("cont is " + cont);
            showResponseInput(cont, response);
        }else{
            if(response.includes(parolaChiave2)){
                console.log("response has p2");
                var cont = obj.messaggio[i].cont2;
                console.log("cont is " + cont);
                showResponseInput(cont, response);
            }else{
                console.log("response is not in json");
                console.log("cont is " + cont);
                showResponseInput(1, response);
            }
        }
    }
}

function showResponseInput(i, response){
    var text = obj.messaggio[i].text;
    var img = obj.messaggio[i].image;

    $("#chatScreen").append(`
        <script type="text/javascript">
            playSendSound();
        </script>
        <div class="msg rightMsg fade-in-bottom">`+response+`</div>
    `);

    $('#chatScreen').scrollTop(jTop);
    /* $('#chatScreen').animate({scrollTop: jTop}, 500, 'swing'); */
    jTop += 150;
    contMsg++;
    clearInput();
}

function clearInput(){
    $('#inputResponse').val("");
}

function getDate(){
    var d = new Date();     // per addesso
    var time = d.getHours() +":"+ d.getMinutes();
    $('.header-time').append(time);
}

var receiveSound = new Audio('src/receive-sound1.mp3');
var sendSound = new Audio('src/send-sound.mp3');

function playReceiveSound(){
    receiveSound.play();
}

function playSendSound(){
    sendSound.play();
}