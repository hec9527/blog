const Router = require("@koa/router");
const path = require("path");
const fs = require("fs");

const router = new Router({ prefix: "/public" });

router.get("/(.*)", (ctx) => {
  console.log(decodeURIComponent(ctx.path));

  // const mimeTypes = ["jxl", "avif", "webp", "jpeg", "gif", "png"];
  const mimeTypes = ["jxl", "avif", "webp"];
  const fileName = decodeURIComponent(ctx.path).replace("/public", "");
  const [baseName, fileExt] = fileName.split(".");
  const staticDir = path.join(__dirname, "../h5_picture/public/");
  console.log({ baseName, fileExt });
  console.log(ctx.accepts());
  const imageAccepts = ctx.accepts().filter((accept) => /image\/\w/.test(accept));

  for (mime of mimeTypes) {
    console.log(mime);
    const _mimeType = `image/${mime}`;
    if (imageAccepts.includes(_mimeType)) {
      const _filePath = path.join(staticDir, `${baseName}.${mime}`);
      if (fs.statSync(_filePath).isFile()) {
        ctx.response.set("content-type", _mimeType);
        ctx.body = fs.createReadStream(_filePath);
      }
      return;
    }
  }

  const _filePath = path.join(staticDir, fileName);

  if (fs.statSync(_filePath).isFile()) {
    return (ctx.body = fs.createReadStream(_filePath));
  }

  return (ctx.response.status = 404);
});

module.exports = router;
