var observation = function(){
    self = this;
    self.sessions = JSON.parse(localStorage.getItem("observadorSessionsInfo"))
    self.actualSession = sessions[localStorage.getItem("actualSessionInfo")];
    self.sessionName = ko.observable(actualSession["name"]);
    self.subjects = self.actualSession["subjects"];
    self.categories = self.actualSession["categories"];

    getCategories = function(subject){
        return Object.keys(this.subjects[subject]);
    }
}
ko.applyBindings(observation);

