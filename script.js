//<script>
window.onload=Pinstatus;
var xmlHttp=createXmlHttpObject();
function createXmlHttpObject(){
	if(window.XMLHttpRequest){
		xmlHttp=new XMLHttpRequest();
	}else{ xmlHttp=new ActiveXObject('Microsoft.XMLHTTP');}
	return xmlHttp;
}
		
function Pinstatus(){
   morestatus();
}
function morestatus(){
   setTimeout(morestatus, 4000);
   document.getElementById("description").innerHTML = "Processing Status";
   server = "status/99";
   //request = new XMLHttpRequest();
    //request = new ActiveXObject('Microsoft.XMLHTTP');
	if(xmlHttp.readyState==0 || xmlHttp.readyState==4){
   		xmlHttp.onreadystatechange = updateasyncstatus;
	 	//alert('hellocv');
   		xmlHttp.open("GET", server, true);
		//alert('bah');
   		xmlHttp.send(null);
	}
}

function updateasyncstatus(){
	//alert(xmlHttp.readyState);alert(xmlHttp.status);alert(xmlHttp.responseText);
if ((xmlHttp.readyState == 4) && (xmlHttp.status == 200))
	{
		 //alert('hello');
		xmlResponse=xmlHttp.responseXML;
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
	document.getElementById("pin" + Pin).innerHTML = "processing.... " ;
	server = "digital/" + Pin + "/" + action;
	request = new XMLHttpRequest();
	//if(xmlHttp.readyState==0 || xmlHttp.readyState==4){
	request.onreadystatechange = updateasyncbutton;
	request.open("GET", server, true);
	request.send(null);
	//}
}

function updateasyncbutton(){
	if ((request.readyState == 4) && (request.status == 200)){
		xmlResponse=request.responseXML;
		xmldoc = xmlResponse.getElementsByTagName('inputs');
		message = xmldoc[0].firstChild.nodeValue;
		//result = xmlHttp.responseText;
		singleset = message.split(",");
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
