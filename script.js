let ultimoElemento;

const rngInteger = (min, max) => Math.floor(Math.random() * max + min);
const rngColor = () => `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%, 10%)`;
// Get the modal
let modal = document.getElementById("myModal");
const cross_span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
cross_span.onclick = function() {
  modal.style.display = "none";
}

const observador = new IntersectionObserver(
	(entradas) => {
		entradas.forEach((entrada) => {
			if (entrada.isIntersecting) appendElement();
		});
	},
	{
		rootMargin: "0px 0px 0px 0px",
		threshold: 1.0
	}
);

function createNewElement() {
	const elem = document.createElement("div");
	const height = rngInteger(200, 400);

	elem.style.height = `${height}px`;
	elem.className = "grid-item my-3 col-xl-4 col-md-6 col-sm-12 ";
	elem.innerHTML = `<div class="rounded overflow-hidden box-img" style="height: 100%; background-color: ${rngColor()};">
                            <img onclick="zoomElement(this.src)" src="/artworks/${rngInteger(
																													1,
																													163
																												)}.PNG">
                          </div>`;
	return elem;
}

function zoomElement(img_src){
	let img = document.getElementById("myImg");
	let modalImg = document.getElementById("img01");
	let captionText = document.getElementById("caption");
	modal.style.display = "block";
	let img_src_zoom = img_src.replace("/artworks/","/originals/")
	modalImg.src = img_src;

	if (img_src.includes("/16.PNG")){
		captionText.innerHTML = "You just found an Easter egg, for more, visit: https://escape-china.com/chn";
	} 
}


(function () {
	const masonry = document.getElementById("masonry");
	for (let i = 0; i < 10; i++) {
		const element = createNewElement();
		masonry.appendChild(element);
	}

	getLastChild();
})();

var grid = document.querySelector(".grid");
var msnry = new Masonry(grid, {
	itemSelector: ".grid-item"
});

function appendElement() {
	var elems = [];
	var fragment = document.createDocumentFragment();
	for (var i = 0; i < 3; i++) {
		var elem = createNewElement();
		fragment.appendChild(elem);
		elems.push(elem);
	}
	grid.appendChild(fragment);
	msnry.appended(elems);

	getLastChild();
}

function getLastChild() {
	if (ultimoElemento) observador.unobserve(ultimoElemento);

	const elements = document.querySelectorAll(".grid-item");
	ultimoElemento = elements[elements.length - 1];
	observador.observe(ultimoElemento);
}