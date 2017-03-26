//<script>
window.onload=Pinstatus();
function Pinstatus(){
   morestatus();
}
function morestatus(){
   setTimeout(morestatus, 4000);
   document.getElementById("description").innerHTML = "Processing Status";
   server = "status/99";
   request = new XMLHttpRequest();
    //request = new ActiveXObject('Microsoft.XMLHTTP');
   request.onreadystatechange = updateasyncstatus;
	 alert('hellocv');
   request.open("PUT", server, true);
	alert('bah');
   request.send(null);
}

function updateasyncstatus(){
	alert(request.readyState);alert(request.status);alert(request.responseText);
if ((request.readyState == 4) && (request.status == 200))
	{
		 alert('hello');
		xmlResponse=request.responseXML;
		xmldoc = xmlResponse.getElementsByTagName('inputs');
		message = xmldoc[0].firstChild.nodeValue;
		//result = request.responseText;
		document.getElementById("description").innerHTML = message;
		fullset = message.split("#");
		document.getElementById("description").innerHTML = fullset;
		
		for(i = 1; i < fullset.length; i++){
				PinPair = fullset[i];
				singleset = PinPair.split("=");
				PN = singleset[0];
				Pinstatus = singleset[1];
				
					ActNum = "action" + PN;
					btnId= "pin" + PN;
					if (Pinstatus == 0){
						PinAct = "1";
						text = "Off";
					}else{
						PinAct = "0";
						text = "On";
					}
					document.getElementById(btnId).innerHTML = text;
					
				// if (PN == 2)
				// {
					// ActNum = "action" + PN;
					// TxtNum = "text" + PN;
					// if (Pinstatus == 0){
						// PinAct = "1";
						// text = "Off";
					// }else{
						// PinAct = "0";
						// text = "On";
					// }
					// document.getElementById(ActNum).value = PinAct;
					// document.getElementById(TxtNum).innerHTML = text;
				// }
		}
	}
}

function sendbutton(Pin,action){
	server = "digital/" + Pin + "/" + action;
	request = new XMLHttpRequest();
	request.onreadystatechange = updateasyncbutton;
	request.open("GET", server, true);
	request.send(null);
}

function updateasyncbutton(){
	if ((request.readyState == 4) && (request.status == 200)){
		result = request.responseText;
		 singleset = result.split(",");
		 PinType = singleset[0];
		 PinNum = singleset[1];
		 Pinstatus = singleset[2];
		ActNum = "action" + PN;
		btnId= "pin" + PinNum;
		if (Pinstatus == 0){
				PinAct = "1";
				text = "Off";
			}else{
				PinAct = "0";
				text = "On";
			}
	//document.getElementById("btnSuccess").value = text;
	document.getElementById(btnId).innerHTML = text;
	}
}
//</script>
