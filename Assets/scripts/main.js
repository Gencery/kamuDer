let months = [
	{
		monthName: "Ocak",
		monthDays: 31,
	},
	{
		monthName: "Şubat",
		monthDays: new Date().getFullYear % 4 == 0 ? 29 : 28,
	},
	{
		monthName: "Mart",
		monthDays: 31,
	},
	{
		monthName: "Nisan",
		monthDays: 30,
	},
	{
		monthName: "Mayıs",
		monthDays: 31,
	},
	{
		monthName: "Haziran",
		monthDays: 30,
	},
	{
		monthName: "Temmuz",
		monthDays: 31,
	},
	{
		monthName: "Ağustos",
		monthDays: 31,
	},
	{
		monthName: "Eylül",
		monthDays: 30,
	},
	{
		monthName: "Ekim",
		monthDays: 31,
	},
	{
		monthName: "Kasım",
		monthDays: 30,
	},
	{
		monthName: "Aralık",
		monthDays: 31,
	},
];

let days = {
	1: "Pazartesi",
	2: "Salı",
	3: "Çarşamba",
	4: "Perşembe",
	5: "Cuma",
	6: "Cumartesi",
	7: "Pazar",
};

fetch("/header.html")
	.then((res) => res.text())
	.then(
		(data) => (document.getElementsByTagName("header")[0].innerHTML = data)
	);
/*
fetch("/footer.html")
	.then((res) => res.text())
	.then((data) => {
		document.getElementsByTagName("footer")[0].innerHTML = data;
	});
*/

//LOADING SCREEN
(function createLoadingScreen() {
	//
	let loader = document.createElement("div");
	loader.setAttribute("id", "loaderContainer");
	//
	let innerLoader = document.createElement("div");
	loader.appendChild(innerLoader);
	innerLoader.classList.add("loader");
	//LOGO
	let logoLoader = document.createElement("img");
	logoLoader.setAttribute("src", "./Assets/img/loader3.png");
	loader.appendChild(logoLoader);
	logoLoader.classList.add("logoLoader");

	document.body.getElementsByTagName("main")[0].appendChild(loader);
})();

function toggleLoadingScreenDisplay() {
	let loadingScreen = document.getElementById("loaderContainer");
	if (window.getComputedStyle(loadingScreen).visibility == "hidden") {
		loadingScreen.style.visibility = "visible";
	} else {
		loadingScreen.style.visibility = "hidden";
	}
}

function toPDF(elem, pageAlign) {
	var elem = elem.innerHTML;
	var style = `
  *{
    box-sizing: border-box;
  }
  .card-std2{
    width: 33%;
  }
  .card-container2{
    display: flex;
  }
  table{
    width: 99%;
    border-collapse: collapse;
    margin: 10px;
  }
  table * {
    text-align: center;
    padding: 3px;
  }
  th, td {
    border: 1px solid black;
  }
  .p-bold{
    font-weight: bold;
  }
  @media print {
    .noPrint {
      display: none;
    }
  }`;

	if (pageAlign == "yatay") {
		style += "@page { size: landscape; }";
	}

	style = "<style>" + style + "</style>";

	// CREATE A WINDOW OBJECT.
	var win = window.open("", "", "");
	win.document.write("<html><head>");
	//win.document.write('<title>Bordro</title>');   // <title> FOR PDF HEADER.
	win.document.write(style);
	win.document.write("</head>");
	win.document.write("<body>");
	win.document.write(elem); // THE TABLE CONTENTS INSIDE THE BODY TAG.
	win.document.write("</body></html>");

	win.document.close(); // CLOSE THE CURRENT WINDOW.

	win.print(); // PRINT THE CONTENTS.
}

function msgBox(elem, event, msg) {
	event.preventDefault();
	let bildirimBox = document.createElement("div");
	bildirimBox.setAttribute("class", "bildirimBox");

	let bildirimBoxInner = document.createElement("div");
	bildirimBoxInner.setAttribute("class", "bildirimBox-inner");
	bildirimBox.append(bildirimBoxInner);

	// let bildirimBoxExit = document.createElement("div");
	// bildirimBoxInner.setAttribute("class", "bildirimBox-exit");
	// bildirimBox.append(bildirimBoxExit);

	let bildirimMsg = document.createElement("p");
	if (!msg) bildirimMsg.innerText = elem.innerText + "?";
	else bildirimMsg.innerText = msg;

	bildirimBoxInner.append(bildirimMsg);

	let buttonBox = document.createElement("div");
	buttonBox.setAttribute("class", "button-group-g");

	let buttonOnay = document.createElement("button");
	buttonOnay.innerText = "Evet";
	buttonOnay.setAttribute("class", "button-regular");
	buttonOnay.addEventListener("click", () => {
		bildirimBox.remove();
		//elem.parentElement.submit();
		elem.closest("form").submit();
	});

	let buttonRed = document.createElement("button");
	buttonRed.innerText = "Hayır";
	buttonRed.setAttribute("class", "button-negative");
	buttonRed.addEventListener("click", () => {
		bildirimBox.remove();
	});

	buttonBox.append(buttonOnay);
	buttonBox.append(buttonRed);

	bildirimBoxInner.append(buttonBox);
	document.body.append(bildirimBox);
}

function msgBoxGeneric(msg) {
	let bildirimBox = document.createElement("div");
	bildirimBox.setAttribute("class", "bildirimBox");

	let bildirimBoxInner = document.createElement("div");
	bildirimBoxInner.setAttribute("class", "bildirimBox-inner");
	bildirimBox.append(bildirimBoxInner);

	// let bildirimBoxExit = document.createElement("div");
	// bildirimBoxInner.setAttribute("class", "bildirimBox-exit");
	// bildirimBox.append(bildirimBoxExit);

	let bildirimMsg = document.createElement("p");
	if (!msg) bildirimMsg.innerText = elem.innerText + "?";
	else bildirimMsg.innerText = msg;

	bildirimBoxInner.append(bildirimMsg);

	let buttonBox = document.createElement("div");
	buttonBox.setAttribute("class", "button-group-g");

	let buttonOnay = document.createElement("button");
	buttonOnay.innerText = "Tamam";
	buttonOnay.setAttribute("class", "button-regular");
	buttonOnay.addEventListener("click", () => {
		bildirimBox.remove();
	});

	buttonBox.append(buttonOnay);

	bildirimBoxInner.append(buttonBox);
	document.body.append(bildirimBox);
}

function resetFormsInside(elem) {
	let forms = elem.getElementsByTagName("form");
	for (let form of forms) form.reset();
}

function getDateTimeLocal(offsetHours) {
	let now = new Date().getTime() + offsetHours * 60 * 60000;
	return new Date(now).toISOString().slice(0, 16);
}

(function gTabs() {
	if (document.getElementsByClassName("gTabs")) {
		let gTabss = document.getElementsByClassName("gTabs");
		for (let gTabs of gTabss) {
			let btns = gTabs
				.getElementsByClassName("gTabs-buttons")[0]
				.getElementsByTagName("button");
			let contents = gTabs.getElementsByClassName("gTabs-content");
			let prevDisplay = window.getComputedStyle(contents[0]).display;
			for (let content of contents) {
				content.style.display = "none";
			}
			if (btns.length && contents.length) {
				for (let i = 0; i < btns.length; i++) {
					btns[i].addEventListener("click", function (event) {
						event.preventDefault();

						for (let content of contents) {
							content.style.display = "none";
						}
						for (let btn of btns) {
							btn.classList.replace("button-active", "button-negative");
						}
						btns[i].classList.replace("button-negative", "button-active");
						contents[i].style.display = prevDisplay;
					});
				}
			}
			btns[0].click();
		}
	}
})();

function addPrefix(elem, str) {
	if (elem.value.slice(0, str.length) == str);
	else elem.value = str + elem.value;
}

function fillYears(optionContainer, start, end) {
	if (!optionContainer.children.length) {
		let option;
		for (let i = start; i <= end; i++) {
			option = document.createElement("option");
			option.innerText = i;
			optionContainer.appendChild(option);
		}

		option = document.createElement("option");
		option.innerText = "Devam Ediyor";
		optionContainer.appendChild(option);
	}
}

function toggleMenu(elem) {
	elem.classList.toggle("menuOpen");
	let headerLinks = document.getElementsByClassName("headerLinks")[0];
	currentMaxHeight = window.getComputedStyle(headerLinks)["max-height"];
	if (currentMaxHeight == "0px") {
		headerLinks.style["max-height"] = "1000px";
		//elem.setAttribute("tabIndex", "");
	} else {
		headerLinks.style["max-height"] = "0px";
		//elem.setAttribute("tabIndex", "0");
	}
}

//POP UP
document.addEventListener("DOMContentLoaded", () => {
	if (!document.getElementsByClassName("gPopup").length) {
		return;
	}
	let defaultHeaderZIndex = document.getElementsByTagName("header")[0];
	defaultHeaderZIndex = getComputedStyle(defaultHeaderZIndex)["z-index"];

	closePopUp = function (id) {
		let popup = document.getElementById(id);
		popup.style["background-color"] = "rgba(0,0,0,0)";
		setTimeout(() => {
			popup.style["top"] = "-200%";
		}, 250);
	};
	openPopUp = function (id) {
		let popup = document.getElementById(id);
		popup.style["top"] = "0%";
		setTimeout(() => {
			popup.style["background-color"] = "rgba(0,0,0,0.75)";
		}, 750);
	};
});


function createAnlasmaliKurulus(kurulus, container) {
	let kurulusDiv = document.createElement("div");
	kurulusDiv.classList.add("anlasmaliKurulus");
	kurulusDiv.classList.add("container");

	//Kurulus Resim
	let kurulusImg = document.createElement("img");
	kurulusImg.setAttribute("src", kurulus.kurulusResimURL);
	kurulusDiv.append(kurulusImg);

	//Kurulus Adı
	let kurulusTitle = document.createElement("h4");
	kurulusTitle.innerText = kurulus.kurulusAdi;
	kurulusTitle.classList.add("title");
	kurulusDiv.append(kurulusTitle);

	//Detay Button
	let detayButton = document.createElement("span");
	detayButton.classList.add("detay");
	detayButton.innerText = "Detay";
	kurulusDiv.append(detayButton)

	//kurulusDiv onclick popup ac
	kurulusDiv.addEventListener("click", () => {
		let popup = document.getElementById("anlasmaliKuruluslarPopup");
		let popupImg = popup.getElementsByTagName("img")[0];
		let kurulusDivImg = kurulusDiv.getElementsByTagName("img")[0];

		popupImg.setAttribute("src", kurulusDivImg.getAttribute("src"));

		openPopUp("anlasmaliKuruluslarPopup");
	})

	//append Kurulus
	container.append(kurulusDiv);
}

document.addEventListener("DOMContentLoaded", () => {
	if (document.getElementsByClassName("anlasmaliKuruluslar").length > 0) {
		fetch("/JsonData/anlasmaliKuruluslar.json")
			.then(res => res.json())
			.then(data => {
				let kurulusListesiContainer = document.getElementsByClassName("anlasmaliKurulusListesi")[0];

				for (let kurulus of data.kuruluslar) {
					createAnlasmaliKurulus(kurulus, kurulusListesiContainer);
				}
			})
	}
})