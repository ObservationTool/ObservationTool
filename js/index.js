var index = (function(){
    self = this;

    formContainer = $(".form-container");
    formContainer.hide();

    homeContainer = $("#home");

    random = $("#intervalRandom");
    random.click(function(){
        if (self.random.is(":checked")){
            $("#variableSeconds").show();
        } else{
            $("#variableSeconds").hide()
        }
    })

    createSession = $("#createSession");
    createSession.click(function(){
        formContainer.toggle();
        homeContainer.toggle();
    })

    self.subjects = [];
    addSubj = $("#addSubj");
    addSubj.click(function(){
        newSubj = $("#subjects").val();
        if(newSubj != ""){
            $("#subj-container").append("<h3>" + newSubj + "</h3")
            self.subjects.push(newSubj);
        } else {
            alert("Agregue el nombre del sujeto")
        }
    })

    self.categories = [];
    addCat = $("#addCat");
    addCat.click(function(){
        newCat = $("#categories").val();
        if(newCat != ""){
            $("#cat-container").append("<h3>" + newCat + "</h3")
            self.categories.push(newCat);
        } else {
            alert("Agregue el nombre del sujeto")
        }
    })
    
    document.querySelector(".form-container").addEventListener('submit', submitSession);

    sessionsInfo = JSON.parse(localStorage.getItem("observadorSessionsInfo"));
    if (sessionsInfo == null){
        sessionsInfo = {}
    }

    sessionList = $(".sessionList");

    if (sessionsInfo != null){
        Object.keys(sessionsInfo).forEach(sessionIndex => {
            sessionList.append('<li>' + sessionsInfo[sessionIndex]["name"] + '<span class="close">x</span></li>');
            $(".sessionList li").last().on("click", (function(sessionIndex){
                return function(){
                    localStorage.setItem("actualSessionInfo", sessionIndex);
                    window.location.href += "html/observation.html"
                };
            })(sessionIndex));
        });
    }

    function submitSession(event){
        event.preventDefault();
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
                subjects : self.subjects,
                categories : self.categories
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

        formContainer.toggle();
        homeContainer.toggle();
        $("#session-form").trigger("reset");
        console.log(localStorage.getItem("observadorSessionsInfo"))
    };
    
})()