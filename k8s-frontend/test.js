// Api call
function getKahitari() {
	return new Promise((resolve, reject) => {
		for (let i = 1; i < 10000000000; i++);
		resolve("Zala mazha kaam!!");
		reject();
	});
	// for (let i = 1; i < 10000000000; i++);
	// console.log("Zala mazha kaam!!");
}

async function doStuff() {
	let data = getKahitari();
	console.log(data);
	// // getKahitari();
	// getKahitari()
	// 	.then(data => {
	// 		console.log(data);
	// 	})
	// 	.catch(err => console.log("bhkjmb" + err));
	printStuff();
}

function printStuff() {
	console.log("Printing stuff");
}

doStuff();
