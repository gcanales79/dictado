
let numero=0;

//Accion del boton añadir palabra

$("#anadirpalabra").on("click",function(event){
    event.preventDefault();
    //console.log("Hello World");
    const newDiv=$("<div>")
    const newWord=$("<input>");
    newDiv.attr("id",numero);
    newDiv.attr("class","form-row reglon")
    
    //Donde va la plabra
    const word=$("<div>")
    word.attr("class","btn-toolbar")
    newWord.attr("id","palabra"+numero)
    newWord.attr("type","text");
    newWord.attr("class","form-control");
    newWord.attr("placeholder","Spelling Word");
    word.append(newWord)
    
    //Bote de Basura
    const basura=$("<button>")
    basura.attr("class","btn btn-danger ml-1 mr-1 trash")
    basura.attr("id","remove" + numero)
    const trash=$("<i>");
    trash.attr("class","fas fa-trash-alt");
    basura.append(trash)
    
    //Play
    const talk=$("<button>")
    talk.attr("class","btn btn-primary mr-1 ml-1 play")
    talk.attr("id","play"+numero)
    const play=$("<i>");
    play.attr("class","fas fa-play-circle")
    talk.append(play)
    
    newDiv.append(word)
    newDiv.append(talk)
    newDiv.append(basura)
    $("#palabras").append(newDiv)
    
    numero++
    //console.log(numero)
});

//Accion del Boton play
$(document).on("click",".play",function(event){
    event.preventDefault();
    //console.log("Hello Word")
    let name=$(this).attr("id").substring(4);
    //console.log("The id is " + name)
    let id="#palabra"+name
    //console.log("El id es " + id)
    var text={
        text:$(id).val().trim()
    }
   
    console.log("La palabra es " + text);
    $.post("/api/voice",text)
    .then(function(data){
        console.log("El archivo es " + data)
        var audio=new Audio(data)
        audio.play()

       
    })
    /*const tts=new TextToSpeech();
    tts.text("Hello Word")
    tts.speak();*/
})

//Accion del Boton Borrar
$(document).on("click",".trash",function(event){
    event.preventDefault();
    //console.log("Hello Word")
    let id="#"+$(this).attr("id").substring(6);
    console.log("El id es "+id)
    $(id).remove()

})

function playSound(url) {
    var a = new Audio(url);
    a.play();
}

