// Karma configuration

module.exports = {
  options: {
    configFile: 'karma.config.js'
  },
  unit: {
    options: {
      files: [
        //{pattern: '<%= clientDest %>/assets/scripts/app.js', included: false},
        {pattern: '<%= clientDest %>/assets/scripts/**/*.js', included: false},
        {pattern: '<%= clientDest %>/assets/test/**/*Spec.js', included: false},

        '<%= clientDest %>/assets/test/test-main.js'
      ],
      singleRun: true,
      browsers: ['PhantomJS', 'Chrome', 'Safari'],
    }
  },
  'continuous-chrome': {
    options: {
      files: [
        //{pattern: '<%= clientDest %>/assets/scripts/app.js', included: false},
        {pattern: '<%= clientDest %>/assets/scripts/**/*.js', included: false},
        {pattern: '<%= clientDest %>/assets/test/**/*Spec.js', included: false},

        '<%= clientDest %>/assets/test/test-main.js'
      ],
      singleRun: false,
      browsers: ['Chrome'],
    }

  },
  'continuous-safari': {
    options: {
      files: [
        //{pattern: '<%= clientDest %>/assets/scripts/app.js', included: false},
        {pattern: '<%= clientDest %>/assets/scripts/**/*.js', included: false},
        {pattern: '<%= clientDest %>/assets/test/**/*Spec.js', included: false},

        '<%= clientDest %>/assets/test/test-main.js'
      ],
      singleRun: false,
      browsers: ['Safari'],
    }

  }

};
