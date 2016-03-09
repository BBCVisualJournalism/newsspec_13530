module.exports = function (grunt) {
    grunt.registerTask('split_data', function () {

        var fs = require('fs');

        function splitData(inputPath, outputDirectoryPath) {
            var lines = readData(inputPath);
            var dataArray = getDataArray(lines);
            var dataChunks = makeDataChunks(dataArray);
            for (var i = 0; i < dataChunks.length; i++) {
                var outputFilePath = outputDirectoryPath + i + '.js'
                var fileString = makeFileString(dataChunks[i]);
                fs.writeFileSync(outputFilePath, fileString);
                console.log('written to ' + outputFilePath);
            }
        }

        function readData(inputPath) {
            var inputFile = fs.readFileSync(inputPath, 'utf8');
            var bufferString = new Buffer(inputFile).toString();
            var lines = bufferString.split('\n').filter(Boolean);

            return lines;
        }

        function getDataArray(lines) {
            var dataArray = [];
            for (var i = 0; i < lines.length; i++) {
                if (/\["/.test(lines[i])) {
                    var line = lines[i].trim();
                    if (/,$/.test(line)) {
                        line = line.slice(0, -1);
                    }
                    dataArray.push(line);
                }
            }
            return dataArray;
        }

        function makeDataChunks(dataArray) {
            var dataChunks = [];
            var chunkSize = 30;
            for (var i = 0; i < dataArray.length; i += chunkSize) {
                dataChunks.push(dataArray.slice(i, i + chunkSize));
            }
            return dataChunks;
        }

        function makeFileString(dataChunk) {
            var fileString = 'define(function () {return [';
            for (var i = 0; i < dataChunk.length; i++) {
                fileString += dataChunk[i];
                if (i !== dataChunk.length - 1) {
                    fileString += ',';
                }
            }
            fileString += '];});';
            return fileString;
        }

        splitData('data/english.js', 'data/english/');
        splitData('data/arabic.js', 'data/arabic/');
    });
};