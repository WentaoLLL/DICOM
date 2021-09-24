const router = require('koa-router')()
const multer = require('koa-multer')

router.prefix('/upload')

let upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/dicoms');
        },
        filename: function (req, file, cb) {
            var fileFormat = (file.originalname).split(".");
            var changedName = (new Date().getTime()) + "." + fileFormat[fileFormat.length - 1];
            cb(null, changedName);
        }
    })
});

router.post('/', upload.single('file'), async (ctx, next) => {
    const { filename } = ctx.req.file
    ctx.body = {
        code: 200,
        msg: "ok",
        data: {
            md5: filename
        }
    }
})

module.exports = router
