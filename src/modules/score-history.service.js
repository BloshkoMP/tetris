const url = "https://score-tetris.herokuapp.com/posts";

function scoreHistory() {
	return fetch(url).then(response => response.json());
}

function loadScore({ score, level, lines }) {
	const obj = {
		name: "max",
		score: score,
		line: lines,
		lvl: level
	};
	fetch(url, {
		method: "post",
		headers: {
			"Content-type": "application/json"
		},
		body: JSON.stringify(obj)
	});
}

export { scoreHistory, loadScore };
