var observation = function(){
    this.sessions = JSON.parse(localStorage.getItem("observadorSessionsInfo"))
    this.actualSession = sessions[localStorage.getItem("actualSessionInfo")];
    this.sessionName = ko.observable(actualSession["name"]);
    this.subjects = this.actualSession["subjects"];
    console.log(this.subjects)
}
ko.applyBindings(observation);

