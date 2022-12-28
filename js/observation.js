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

    categoryClick = function(sujeto, boton,  element){
        subjectArray[sujeto][boton] += 1;
        element.innerText = boton + " " + subjectArray[sujeto][boton];
        element.parentNode.parentNode.parentNode.childNodes[4].childNodes[1].childNodes[0].innerText = "Total " + getTotal(sujeto)
    }

    guardarExcel = function(tableID, filename = 'Datos_observacion'){
        var downloadLink;
        var dataType = 'application/vnd.ms-excel';
        var tableSelect = document.getElementById(tableID);
        var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
        
        // Specify file name
        filename = filename?filename+'.xls':'excel_data.xls';
        
        // Create download link element
        downloadLink = document.createElement("a");
        
        document.body.appendChild(downloadLink);
        
        if(navigator.msSaveOrOpenBlob){
            var blob = new Blob(['ufeff', tableHTML], {
                type: dataType
            });
            navigator.msSaveOrOpenBlob( blob, filename);
        }else{
            // Create a link to the file
            downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
        
            // Setting the file name
            downloadLink.download = filename;
            
            //triggering the function
            downloadLink.click();
        }
    }

}
ko.applyBindings(observation);


// this.subjectArray = {"messi" : {"parpadea" : 0, "come" : 0}, "sergio" : {"parpadea" : 0}}

