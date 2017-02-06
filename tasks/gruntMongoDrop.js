'use strict';

module.exports = function(grunt) {
    return grunt.registerTask('mongo-drop', 'Drop mongodb database.', function() {
        var options,
        mongoose = require('mongoose'),
        done = this.async(),
        db;

        options = this.options({
            dbname: null,
            host: 'localhost'

        });



        //grunt.verbose.writeflags(options, 'Options');


        db = mongoose.connect('mongodb://' + options.host + '/' + options.dbname, function(err) {
            if (err) {
                grunt.log.writeln('Could not connect to mongodb, check if mongo is running');
                done(err);
            } else {
                grunt.log.writeln('Open db connection (' + options.dbname + ')');
                db.connection.db.dropDatabase(function(err) {
                    if (err) {
                        grunt.log.writeln('Could not drop database (' + options.dbname + ')');

                    } else {
                        grunt.log.writeln('Database dropped (' + options.dbname + ')');

                    }

                    db.connection.close(function(err) {
                        if(err) {
                            grunt.log.writeln('Could not close connection (' + options.dbname + ')');
                        } else {
                            grunt.log.writeln('Connection closed (' + options.dbname + ')');
                        }

                        done(err);
                    });

                });
            }
        });
    });
};
