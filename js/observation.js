var observation = function(){
    this.sessions = JSON.parse(localStorage.getItem("observadorSessionsInfo"))
    this.actualSession = sessions[localStorage.getItem("actualSessionInfo")];
    this.sessionName = ko.observable(actualSession["name"]);
    // this.subjects = this.actualSession["subjects"];
    // this.categories = this.actualSession["categories"];
    this.subjects = {"messi" : {"parpadea" : 0, "come" : 0}, "sergio" : {"parpadea" : 0}}
    this.names = Object.keys(this.subjects);

    getCategories = function(subject){
        return Object.keys(this.subjects[subject]);
    }
    // categories.forEach(categorie => {
    //     for (i = 0; i < this.subjects.length - 1; i++){
    //         this.categories.push(categorie);
    //     }
    // });
}
ko.applyBindings(observation);

