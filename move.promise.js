const fs = require("fs");

const readFile = path =>
  new Promise((resolve, reject) =>
    fs.readFile(path, (err, data) => err ? reject(err) : resolve(data))
  );

const writeFile = (path, data) =>
  new Promise((resolve, reject) =>
    fs.writeFile(path, data, (err, data) => err ? reject(err) : resolve(data))
  );

readFile('./manifest.json')
  .then(data => JSON.parse(data))
  .then(files => {
    
    let n = 0;
    files.forEach(f => {

      const { file, metadata } = f;
      
      readFile(file)
      .then(data => {
        
        readFile(metadata)
        .then(res => JSON.parse(res))
        .then(metadata => {
          const { contentType, extension, name} = metadata;
          const path = 'output.promise/' + name + "." + extension;

          writeFile(path, data)
            .then(() => {
              n++;
              console.log(`File ${name}.${extension} has been saved`);
              if (n === files.length)
                console.log(`Done copying ${n} filess`);
            })
            .catch(err => console.log(err));

        })
        .catch(err => console.log(err));

      })
      .catch(err => console.log(err));

    });

  })
  .catch(err => console.log(err));

