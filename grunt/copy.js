module.exports = {
  // Copys the client source code into the target folder
  client: {
    files: [
      // common images and scripts except templates and main.js
      // styles and templates get compiled in a separate task
      {
        expand: true,
        cwd: '<%= commonSrc %>',
        src: ['**', '!styles/**', '!templates/**', '!scripts/main.js', '!index.html', '!index.jsp'],
        dest: "<%= clientDest %>/assets/"
      },
      // brand images and scripts except except templates and fonts
      // styles and templates get compiled in a separate task
      {
        expand: true,
        cwd: '<%= brandSrc %>',
        src: ['**', '!styles/**', '!templates/**', '!index.html', '!index.jsp'],
        dest: "<%= clientDest %>/assets/"
      },
      //copy the index.jsp for each brand and add on the target
      {
        expand: true,
        cwd: '<%= brandSrc %>',
        src: ['index.html', 'index.jsp'],
        dest: "<%= clientDest %>/"
      },
      {
        expand: true,
        cwd: '<%= common %>/test',
        src: ['**'],
        dest: '<%= clientDest %>/assets/test'
      }
    ]
  },

  server: {
      files: [
        // copys all common server files
        {
          expand: true,
          cwd: 'server',
          src: ['**', '!**/{mcom,bcom}**'],
          dest: '<%= clientDest %>'
        },
        // renames prefixed brand files and then copys them
        {
          expand: true,
          cwd: 'server',
          src: ['**/<%= brandSrc %>**'],
          filter: 'isFile',
          dest: '<%= clientDest %>',
          rename: function(dest, src) {
            return dest + '/' + src.replace(process.env.BRAND + '_', '');
          }
        },
        {
          '<%= clientDest %>/package.json': 'package.json'
        }
      ]
    }//,
  // server: {
  //   files: [{
  //     expand: true,
  //     cwd: '.',
  //     src: ['index.js'],
  //     dest: "<%= clientDest %>/"
  //   }]
  // }
  
};