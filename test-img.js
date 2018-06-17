const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');

imagemin(['basicimages/img/*.{jpg}'], 'images', {
    use: [
        imageminWebp({quality: 60})
    ]
}).then(() => {
    console.log('Images optimized');
});