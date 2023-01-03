var index = (function(){
    self = this;

    //Esconde el formulario que añade una nueva sesion
    formContainer = $(".form-container");
    homeContainer = $("#home");

    //Desplega el intervalo random si este es seleccionado
    random = $("#intervalRandom");
    random.click(function(){
        if (self.random.is(":checked")){
            $("#variableSeconds").show();
        } else{
            $("#variableSeconds").hide()
        }
    })

    //Abre el formulario para crear una nueva sesio
    createSession = $("#createSession");
    createSession.click(function(){
        showForm();
    })

    cancelSession = $("#cancelSession");
    cancelSession.click(function(){
        showHome();
        $("#session-form").trigger("reset");
    })

    //Añade los sujetos del formulario a una lista
    self.subjects = [];
    addSubj = $("#addSubj");
    addSubj.click(function(){
        newSubj = $("#subjects").val();
        if(newSubj != ""){
            $("#subj-container").append("<h3>" + newSubj + "</h3")
            $("#subjects").val("")
            self.subjects.push(newSubj);
        } else {
            alert("Agregue el nombre del sujeto")
        }
    })

    //Añade las categorias a una lista
    self.categories = [];
    addCat = $("#addCat");
    addCat.click(function(){
        newCat = $("#categories").val();
        if(newCat != ""){
            $("#cat-container").append("<h3>" + newCat + "</h3")
            $("#categories").val("")
            self.categories.push(newCat);
        } else {
            alert("Agregue el nombre del sujeto")
        }
    })

    //Saca los objetos del localstorage si ya estan creados
    sessionsInfo = JSON.parse(localStorage.getItem("observadorSessionsInfo"));
    if (sessionsInfo == null){
        sessionsInfo = {}
    }

    //Añade las sesiones al menu
    sessionList = $(".sessionList");
    if (sessionsInfo != null){
        Object.keys(sessionsInfo).forEach(sessionIndex => {
            sessionList.append('<li>' + sessionsInfo[sessionIndex]["name"] + '<span class="close">x</span></li>');
            $(".sessionList li").last().on("click", (function(sessionIndex){
                return function(){
                    localStorage.setItem("actualSessionInfo", sessionIndex);
                    window.location.href -= "index.html"
                    window.location.href += "html/observation.html"
                };
            })(sessionIndex));
        });
    }

    //Orgnaiza los sujetos en un diccionario con sus respectivas categorias
    function createSubjectArray(){
        self.subjectArray = {};
        self.subjects.forEach(subject => {
            self.subjectArray[subject] = {}
            categories.forEach(category => {
                self.subjectArray[subject][category] = 0;
            });
        });
        return subjectArray;
    }
    
    delSesion = $("#borrar-sesiones");
    delSesion.click(function(){
        window.localStorage.clear();
        location.reload();
    })
    
    //Guarda toda la informacion del cuestionario en el localstorage
    function submitSession(){
        console.log("si entro")
        if (sessionsInfo[$("#name").val()] == null){
            var newItem = {
                name : $("#name").val(),
                sessionLength : $("#sessionLength").val(),
                intervalLengthSec : $("#intervalLengthSec").val(),
                intervalRandom : $("#intervalRandom").val(),
                variableSeconds : $("#variableSeconds").val(),
                beep : $("#beep").val(),
                flash : $("#flash").val(),
                fontSize : $("#fontSize").val(),
                columns : $("#columns").val(),
                subjectArray : createSubjectArray()
            }
            sessionList.append('<li>' + newItem["name"] + '<span class="close">x</span></li>');
            sessionsInfo[Object.keys(sessionsInfo).length] = newItem;
            localStorage.setItem("observadorSessionsInfo", JSON.stringify(sessionsInfo))

            $(".sessionList li").last().on("click", (function(sessionIndex){
                return function(){
                    localStorage.setItem("actualSessionInfo", sessionIndex);
                    window.location.href += "html/observation.html"
                };
            })(Object.keys(sessionsInfo).length));
        } else{
            alert("Esta session ya ha sido agregada")
        }
        showHome();
        $("#session-form").trigger("reset");
        console.log(localStorage.getItem("observadorSessionsInfo"))
    };
    $("#submitSession").click(submitSession);
    
    //Guarda el cuestionario y muestra el menu principal
    showHome = function(){
        window.location.reload();
        // formContainer.css("display", "none");
        // homeContainer.css("display", "block");
    }

    showForm = function(){
        formContainer.css("display", "flex");
        homeContainer.css("display", "none");
    }
})()