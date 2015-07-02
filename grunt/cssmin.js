module.exports = {
 combine: { 
   files: {
     "<%= clientDest %>/assets/styles/styles.css": ["<%= commonSrc %>/styles/*.css", "<%= clientDest %>/assets/styles/main.css"]
   }
 },
 minify: {
   expand: true,
   cwd: "<%= clientDest %>/assets/styles",
   src: ["*.css"],
   dest: "<%= clientDest %>/assets/styles",
   ext: ".css"
 }
};