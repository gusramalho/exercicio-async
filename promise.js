const fs = require("fs");

const readFile = path =>
  new Promise((resolve, reject) =>
    fs.readFile(path, (err, data) => err ? reject(err) : resolve(data))
  );

const writeFile = (path, data) =>
  new Promise((resolve, reject) =>
    fs.writeFile(path, data, (err, data) => err ? reject(err) : resolve(data))
  );


const readJSON = path => readFile(path).then(data => JSON.parse(data.toString()));


readJSON('./manifest.json')
  .then(files => Promise.all(files.map(file => 
    readJSON(file.metadata)
      .then(metadata => ({...file, ...metadata}))
    )))

  .then(files => Promise.all(files.map(f => 
    readFile(f.file)
      .then(data => {
        const path = 'output.promise/' + f.name + "." + f.extension;
        console.log(`File ${f.name}.${f.extension} has been saved`);
        writeFile(path, data);
      })
    )))

  .then(items => console.log(`Done copying ${items.length} files`))
  .catch(err => console.log(err));
