module.exports = {
  options: {
    force: true,
    sassDir: "<%= brandSrc %>/styles/",
    cssDir: "<%= clientDest %>/assets/styles",
    imagesDir: "<%= brandSrc %>/images/",
    raw: 'generated_images_dir="<%= brandSrc %>/images/";http_generated_images_path="../../assets/images"'
  },
  dev: {},
  dist: {
    options: {
      outputStyle: 'compressed'
    }
  }
};