"use strict";
const input = document.querySelector("#date");
const margin = document.querySelector("#margin");
const list = document.querySelector("ul");

const minute = 60 * 1000;
const hour = 60 * minute;
const difference = 24 * hour - 30 * minute;
const weekdays = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

let times = [];

function format(timestamp) {
	let date = new Date(timestamp);
	let time = date.toLocaleTimeString("es-ES", {hour: "numeric", minute: "numeric"});
	if (date.getHours() <= 3) date.setDate(date.getDate() - 1);
	return `${date.getDate()} ${weekdays[date.getDay()]} - ${time}`;
}

function toItem(string) {
	let li = document.createElement("li");
	li.textContent = string;
	return li;
}

function update() {
	times = [];
	list.innerHTML = '';
	
	if (input.value) {
		let date = Date.parse(input.value);
		times.unshift(date -= margin.valueAsNumber * hour);
		while (new Date(date).getHours() != 2)
			times.unshift(date -= difference);
	}
	
	times = times.map(format);
	list.append(...times.map(toItem));
}

input.oninput = update;
margin.oninput = update;
update();

document.querySelector("button").onclick = function() {
	navigator.clipboard.writeText(times.join('\n'));
}
