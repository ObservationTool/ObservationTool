var observation = function(){
    self = this;
    self.sessions = JSON.parse(localStorage.getItem("observadorSessionsInfo"))
    self.actualSession = sessions[localStorage.getItem("actualSessionInfo")];
    self.sessionName = ko.observable(actualSession["name"]);
    self.subjects = self.actualSession["subjects"];
    self.categories = self.actualSession["categories"];

    self.subjectArray = {};

    subjects.forEach(subject => {
        self.subjectArray[subject] = {}
        categories.forEach(category => {
            self.subjectArray[subject][category] = 0;
        });
    });

    getCategories = function(subject){
        return Object.keys(this.subjects[subject]);
    }

    getTotal = function(subject){
        var res = 0;
        Object.keys(self.subjectArray[subject]).forEach(category => {
            res += self.subjectArray[subject][category];
        });
        return res;
    }

    prueba = function(sujeto, boton,  element){
        subjectArray[sujeto][boton] += 1;
        element.innerText = boton + " " + subjectArray[sujeto][boton];
        console.log(self.subjectArray)
    }

    añadeCat = function(alo){
        console.log(alo)
    }

}
ko.applyBindings(observation);


// this.subjectArray = {"messi" : {"parpadea" : 0, "come" : 0}, "sergio" : {"parpadea" : 0}}

