const { readFile, writeFile} = require("fs");



readFile('./manifest.json', async (err, data) => {
    if (err)
        throw err;

    let n = 0;

    const files = JSON.parse(data);

    files.forEach((item) => {
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

            const { contentType, extension, name } = JSON.parse(data);

            const path = 'output.callback/' + name + "." + extension;

            writeFile(path , buffer, (err)=> {
                if (err)
                    throw err;
                console.log(`File ${name}.${extension} has been saved`);
                
            });

    });
    
    n++;

});
    console.log(`Done copying ${n} files`);
});


