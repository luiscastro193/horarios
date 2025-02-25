"use strict";
const input = document.querySelector("#date");
const margin = document.querySelector("#margin");
const list = document.querySelector("ul");
const numbersCheck = document.querySelector("#numbers");

const minute = 60 * 1000;
const hour = 60 * minute;
const difference = 24 * hour - 30 * minute;
const weekdays = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

let times = [];

function format(date, withNumbers) {
	let time = date.toLocaleTimeString("es-ES", {hour: "numeric", minute: "numeric"});
	if (date.getHours() <= 3) date.setDate(date.getDate() - 1);
	return (withNumbers ? `${date.getDate()} ` : '') + `${weekdays[date.getDay()]} - ${time}`;
}

function toItem(string) {
	let li = document.createElement("li");
	li.textContent = string;
	return li;
}

function offsetDate(date, offset) {
	return new Date(date.getTime() + offset);
}

function update() {
	times = [];
	list.innerHTML = '';
	let date = new Date(input.value);
	let marginValue = margin.valueAsNumber;
	
	if (date.getTime() && marginValue) {
		times.unshift(date = offsetDate(date, -marginValue * hour));
		
		while (date.getHours() != 2)
			times.unshift(date = offsetDate(date, -difference));
		
		times = times.map(data => format(date, numbersCheck.checked));
		list.append(...times.map(toItem));	
	}
}

input.oninput = update;
margin.oninput = update;
numbersCheck.onchange = update;
update();

document.querySelector("button").onclick = function() {
	navigator.clipboard.writeText(times.join('\n'));
}
