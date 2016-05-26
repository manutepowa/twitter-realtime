module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('./package.json'),
		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: './public/stylesheets/',
					src: ['*.css', '!*.min.css'],
					dest: './public/dist/stylesheets/',
					ext: '.min.css'
				}]
			}
		},

		uglify: {
			js: {
				files: {
					'./public/dist/scripts/controllers/stream.js': ['./public/scripts/controllers/stream.js'],
					'./public/dist/scripts/controllers/graficos.js': ['./public/scripts/controllers/graficos.js'],
					'./public/dist/scripts/appAngular.js': ['./public/scripts/appAngular.js'],
					'./public/dist/javascripts/main.js': ['./public/javascripts/main.js']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['cssmin', 'uglify']);
}
