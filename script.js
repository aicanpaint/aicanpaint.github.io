let ultimoElemento;

const rngInteger = (min, max) => Math.floor(Math.random() * max + min);
const rngColor = () => `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%, 10%)`;

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
                            <img src="/artworks/${rngInteger(
																													1,
																													115
																												)}.PNG">
                          </div>`;
	return elem;
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