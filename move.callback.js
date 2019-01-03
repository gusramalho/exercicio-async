const { readFile, writeFile } = require("fs");

try {
	readFile('./manifest.json', (err, data) => {
		if (err)
			throw err;

		const files = JSON.parse(data);
		let n = 0;

		files.forEach(item  => {
			const { file, metadata } = item;
			let buffer = null;

			readFile(file, (err, data) => {
				if (err)
					throw err;

				buffer = data;
			});

			readFile(metadata, (err, data) => {
				if (err)
					throw err;

				const { extension, name } = JSON.parse(data);
				const path = 'output.callback/' + name + "." + extension;

				writeFile(path, buffer, err => {
					if (err)
						throw err;
					n++;
					console.log(`File ${name}.${extension} has been saved`);
					if (n === files.length)
						console.log(`Done copying ${n} files`);
				})

			});

		});



	});


} catch (err) {
	console.log(err)
}