module.exports = function (grunt) {
    grunt.registerTask('data', function () {

        var fs = require('fs');

        var dataPath = 'source/data/data.tsv';
        var outputPath = 'source/tmpl/ticker.tmpl';

        var columns = {
            name: 0,
            status: 1,
            sex: 2,
            province: 3,
            area: 4,
            dateOfDeath: 5,
            causeOfDeath: 6
        };

        var dataPassed = false;

        function makeTemplateVariable(string) {
            return string.replace(/\s+/g, '_').toLowerCase();
        }

        function generateListEntry(rowCells) {
            var markup = '';

            markup += '    <li>' + rowCells[columns.name] + ' was a ' + rowCells[columns.status].toLowerCase() + ' killed in ' + rowCells[columns.province] + ' by ' + rowCells[columns.causeOfDeath].toLowerCase() + '</li>\n';

            return markup;
        }

        function readData(dataPath) {
            var data = fs.readFileSync(dataPath, 'utf8');
            var buffer = new Buffer(data);
            var dataString = buffer.toString();
            var dataRows = dataString.split('\n').filter(Boolean);

            var markup = '';

            markup += '<ul class="ticker">\n';

            for (var row = 0; row < dataRows.length; row++) {
                var rowCells = dataRows[row].split('\t');

                markup += generateListEntry(rowCells);

                if (row === dataRows.length - 1) {
                    dataPassed = true;
                }
            }

            markup += '</ul>\n';

            return markup;
        }

        function writeData(markup, outputPath) {
            fs.writeFileSync(outputPath, markup);
            console.log('written to ' + outputPath);
        }

        var markup = readData(dataPath);
        if (dataPassed) {
            writeData(markup, outputPath);
        } else {
            console.log('error occurred when reading data');
        }
    });
};