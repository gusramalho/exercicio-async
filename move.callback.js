const { readFile, writeFile, open, write, close } = require("fs");

readFile('./manifest.json',(err, data) => {
    if (err)
        throw err;

    const files = JSON.parse(data);
    let n = 0;

     files.forEach((item, index, array) => {
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

            open(path, 'wx', (err, fd) => {
                if (err && err.code === 'EEXIST')
                    console.log(`File ${name}.${extension} already exists.`);
                else if (err)
                    console.log(err);
                else
                    write(fd, buffer, 0, buffer.length, null, (err) => {
                        if (err)
                            throw err;

                        n++;
                        console.log(`File ${extension} has been saved`);

                        if (index === array.length - 1)
                            console.log(`Done copying ${n} files`);

                        close(fd, () => {});
                    });

                if (index === array.length - 1 && err)
                    console.log(`Done copying ${n} filess`);
            });
        });

    });



});


