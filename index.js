const getTimeRemaining = (endtime) => {
	let t = Date.parse(endtime) - Date.parse(new Date());
	let seconds = Math.floor((t / 1000) % 60);
	let minutes = Math.floor((t / 1000 / 60) % 60);
	let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
	return {
		total: t,
		hours: hours,
		minutes: minutes,
		seconds: seconds,
	};
};

const initializeClock = (endtime) => {
	let hoursSpan = document.querySelector(".hours");
	let minutesSpan = document.querySelector(".minutes");
	let secondsSpan = document.querySelector(".seconds");
	let timeinterval = setInterval(updateClock, 1000);

	function updateClock() {
		let t = getTimeRemaining(endtime);

		if (t.total <= 0) {
			document.getElementById("countdown").className = "hidden";
			document.getElementById("deadline-message").className = "visible";
			clearInterval(timeinterval);
			return true;
		}

		hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
		minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
		secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
	}
	updateClock();
};

const buttonEl = document.querySelector("button");
buttonEl.addEventListener("click", startTimer);

function startTimer() {
	document.getElementById("countdown").className = "visible";
	document.getElementById("deadline-message").className = "hidden";
	const inputEl = document.querySelector("input").value;
	let deadline = new Date(Date.parse(new Date()) + `${inputEl}` * 1000);
	initializeClock(deadline);
	document.querySelector("input").value = "";
};
