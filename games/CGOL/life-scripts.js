var MenuDefs = [
	{
		"name" : "life-0",
		"menuimage" : "images/menu1.png",
	},
	{
		"name" : "life-1",
		"menuimage" : "images/menu2.png",
	}
];

var menuItems = [];
var menuScene = true; 

function lifeSetupMenu() {

	// Set up controls list
	for (i = 0; i < MenuDefs.length; i++) {
		console.log(MenuDefs[i].name);
		menuItems.push({ "name": MenuDefs[i]["name"], 
		                 "menuimage": MenuDefs[i]["menuimage"]});
	}
	
	for (i=0; i < menuItems.length; i++) {
	    // Create menu items	
        document.getElementById("menu-section").innerHTML += `
	        <div  class="menu-item-wrapper" id="menu-item-wrapper-` + i + `">
			   <a  onclick="openInstrument(`+ i +`)">
		         <img  class="menu-item-image" id="menu-item-image-` + i + `" src="` + menuItems[i]["menuimage"] + `">
		       </a>
	        </div>
		`;
	}
	
    document.getElementById("menu-section").innerHTML += `
        <a name="about" class="menu-item-wrapper" id="menu-item-wrapper-` + menuItems.length + `">
		        <img class="menu-item-image" id="menu-item-image-` + menuItems.length + `" src="more.png">
        </a>
    `;

}


function openGame(n) {
	console.log("OPEN");
	document.getElementById("menu-section").style["display"] = "none";
	document.getElementById("game-frame").src="game" + n + ".html";
    document.getElementById("game-frame").style["display"] = "block";
}

function exitToMenu() {
	parent.contentDocument.getElementById("menu-section").style["display"] = "block";
	parent.contentDocument.getElementById("game-frame").style["display"] = "none";
}
