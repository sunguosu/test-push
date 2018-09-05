imageMagick.convert(
    [
      '/var/www/data/files/qualification/licenses/a6/d7/60/ef/d5/e0/7e/e2/72/02/ac/fd/eb/13/48/0b/compressed.jpg',
      '/var/www/data/files/qualification/licenses/ae/5d/51/4d/73/02/27/de/0f/a1/cb/8b/8b/3b/c3/13/compressed.jpg',
      '/var/www/data/files/qualification/licenses/33/6c/03/e7/2c/bf/9b/62/c7/22/b6/41/b7/3d/c5/03/compressed.jpg',
      OUTPUT_PATH
    ],
    async (error, result) => {

      let md5sum = crypto.createHash('md5');

      let file  = path.resolve(OUTPUT_PATH);

      let fileStream = fs.ReadStream(file);
      fileStream.on('data', async (d) => {
        md5sum.update(d);
      });

      fileStream.on('end', async () => {
        let md5 = md5sum.digest('hex');

        const realPath = path.join(process.env.PWD, '/public/files/arbitration/' + md5.match(/../g).join('/'));

        await mkdirp(realPath);

        await rename(OUTPUT_PATH, realPath + '/arbitration.pdf');

      });

  });