const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const os = require("os");

const albumsDir = path.join(__dirname, "public/assets/albums");
const compressedDir = path.join(albumsDir, "compressed");
const manifest = {};

function ensureDirSync(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

fs.readdirSync(albumsDir).forEach((albumName) => {
  const albumPath = path.join(albumsDir, albumName);
  if (fs.statSync(albumPath).isDirectory() && albumName !== "compressed") {
    const compressedAlbumPath = path.join(compressedDir, albumName);
    ensureDirSync(compressedAlbumPath);

    const images = fs
      .readdirSync(albumPath)
      .filter((file) => /\.(jpe?g|png|gif|webp|svg)$/i.test(file));

    manifest[albumName] = [];

    images.forEach((img) => {
      const src = path.join(albumPath, img);
      const compressedName = img.replace(/\.(jpe?g|png)$/i, ".webp");
      const dest = path.join(compressedAlbumPath, compressedName);

      manifest[albumName].push({
        original: img,
        compressed: /\.(svg)$/i.test(img) ? img : compressedName,
      });

      if (/\.svg$/i.test(img)) {
        fs.copyFileSync(src, path.join(compressedAlbumPath, img));
        return;
      }

      const tmpFile = path.join(os.tmpdir(), `tmp-${Date.now()}-${img}`);

      let compressOriginal;
      if (/\.(jpe?g)$/i.test(img)) {
        compressOriginal = sharp(src)
          .rotate()
          .resize({ height: 1600 })
          .jpeg({ quality: 95 })
          .toFile(tmpFile);
      } else if (/\.png$/i.test(img)) {
        compressOriginal = sharp(src)
          .rotate()
          .resize({ height: 1600 })
          .png({ quality: 95 })
          .toFile(tmpFile);
      } else {
        fs.copyFileSync(src, tmpFile);
        compressOriginal = Promise.resolve();
      }

      // Create compressed version (lower quality, always webp)
      const compressWebp = sharp(src)
        .rotate()
        .resize({ height: 1600 })
        .webp({ quality: 80 })
        .toFile(dest)
        .catch((err) => console.error("Error compressing", src, err));

      // After both compressions, overwrite the original
      Promise.all([compressOriginal, compressWebp])
        .then(() => {
          fs.copyFileSync(tmpFile, src);
          fs.unlinkSync(tmpFile);
        })
        .catch((err) => console.error("Error compressing original", src, err));
    });
  }
});

fs.writeFileSync(
  path.join(albumsDir, "manifest.json"),
  JSON.stringify(manifest, null, 2)
);

console.log("Compressed images and generated manifest:", manifest);
