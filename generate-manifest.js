const fs = require("fs");
const path = require("path");

const albumsDir = path.join(__dirname, "public/assets/albums");
const manifest = {};

fs.readdirSync(albumsDir).forEach((albumName) => {
  const albumPath = path.join(albumsDir, albumName);
  if (fs.statSync(albumPath).isDirectory()) {
    const images = fs
      .readdirSync(albumPath)
      .filter((file) => /\.(jpe?g|png|gif|webp|svg)$/i.test(file));
    manifest[albumName] = images;
  }
});

fs.writeFileSync(
  path.join(albumsDir, "manifest.json"),
  JSON.stringify(manifest, null, 2)
);

console.log("Manifest generated:", manifest);
