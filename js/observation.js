var observation = function(){
    self = this;
    self.sessions = JSON.parse(localStorage.getItem("observadorSessionsInfo"))
    self.actualSession = sessions[localStorage.getItem("actualSessionInfo")];
    self.sessionName = ko.observable(actualSession["name"]);
    self.subjectArray = self.actualSession["subjectArray"];
    console.log(subjectArray)


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

    //Chronometer settings

    let hours = `00`,
      minutes = `00`,
      seconds = `00`,
      chronometerDisplay = document.querySelector(`[data-chronometer]`),
      chronometerCall

    function chronometer() {
        seconds ++

        if (seconds < 10) seconds = `0` + seconds

        if (seconds > 59) {
        seconds = `00`
        minutes ++

        if (minutes < 10) minutes = `0` + minutes
        }

        if (minutes > 59) {
        minutes = `00`
        hours ++
        
        if (hours < 10) hours = `0` + hours
        }

        chronometerDisplay.textContent = `${hours}:${minutes}:${seconds}`
    }

    play.onclick = (event) => {
        chronometerCall = setInterval(chronometer, 1000)
        event.target.setAttribute(`disabled`,``)
    }

    pause.onclick = () => {
        clearInterval(chronometerCall)
        play.removeAttribute(`disabled`)
    }

    reset.onclick = () => {
        clearInterval(chronometerCall)
        play.removeAttribute(`disabled`)
        chronometerDisplay.textContent = `00:00:00`
        
        hours = `00`,
        minutes = `00`,
        seconds = `00`
    }
}
ko.applyBindings(observation);


// this.subjectArray = {"messi" : {"parpadea" : 0, "come" : 0}, "sergio" : {"parpadea" : 0}}

