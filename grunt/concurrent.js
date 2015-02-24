// [Runs grunt tasks concurrently](https://github.com/sindresorhus/grunt-concurrent)
module.exports = {
  dev: ['nodemon', 'watch', 'node-inspector', 'notify:build'],
  options: {
    logConcurrentOutput: true
  }
};