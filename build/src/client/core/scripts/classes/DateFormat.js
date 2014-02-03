var dotjem;
(function (dotjem) {
    var DateFormat = (function () {
        function DateFormat(_format) {
            var _this = this;
            this._format = _format;
            this.monthshort = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
            this.monthlong = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            this.dayshort = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
            this.daylong = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
            this.patterns = [];
            this.formatters = [];

            this.patterns['d'] = function (d) {
                return d.getDate() + '';
            };
            this.patterns['dd'] = function (d) {
                return ("0" + d.getDate()).slice(-2);
            };
            this.patterns['ddd'] = function (d) {
                return _this.dayshort[d.getDay()];
            };
            this.patterns['dddd'] = function (d) {
                return _this.daylong[d.getDay()];
            };
            this.patterns['f'] = function (d) {
                return ('' + d.getMilliseconds()).slice(1);
            };
            this.patterns['ff'] = function (d) {
                return ('' + d.getMilliseconds()).slice(2);
            };
            this.patterns['fff'] = function (d) {
                return ('' + d.getMilliseconds()).slice(3);
            };
            this.patterns['h'] = function (d) {
                return (d.getHours() % 12) + '';
            };
            this.patterns['hh'] = function (d) {
                return ("0" + d.getHours() % 12).slice(-2);
            };
            this.patterns['H'] = function (d) {
                return d.getHours() + '';
            };
            this.patterns['HH'] = function (d) {
                return ("0" + d.getHours()).slice(-2);
            };
            this.patterns['m'] = function (d) {
                return d.getMinutes() + '';
            };
            this.patterns['mm'] = function (d) {
                return ("0" + d.getMinutes()).slice(-2);
            };
            this.patterns['M'] = function (d) {
                return (d.getMonth() + 1) + '';
            };
            this.patterns['MM'] = function (d) {
                return ("0" + (d.getMonth() + 1)).slice(-2);
            };
            this.patterns['MMM'] = function (d) {
                return _this.monthshort[d.getMonth()];
            };
            this.patterns['MMMM'] = function (d) {
                return _this.monthlong[d.getMonth()];
            };
            this.patterns['s'] = function (d) {
                return d.getSeconds() + '';
            };
            this.patterns['ss'] = function (d) {
                return ("0" + d.getSeconds()).slice(-2);
            };
            this.patterns['yy'] = function (d) {
                return ("0" + (d.getFullYear() % 100)).slice(-2);
            };
            this.patterns['yyyy'] = function (d) {
                return d.getFullYear() + '';
            };
            this.buildFormat(0, '');
        }
        DateFormat.prototype.extractLiteral = function (index, seperator, idx) {
            var literalString = "";
            do {
                var char = this._format[index];
                if (char == seperator) {
                    idx(index);
                    return literalString;
                }
                literalString += char;
            } while(index++ < this._format.length);
            return null;
        };

        DateFormat.prototype.buildFormat = function (index, part) {
            if (index > this._format.length)
                return;

            if (part == "'" || part == '"') {
                var literal = this.extractLiteral(index, part, function (i) {
                    return index = i;
                });
                this.formatters.push(function (d) {
                    return literal;
                });
                this.buildFormat(index + 1, '');
                return;
            }

            var char = this._format[index];
            if (part.length == 0 || part[0] == char) {
                this.buildFormat(index + 1, part + char);
                return;
            }

            if (part in this.patterns) {
                this.formatters.push(this.patterns[part]);
                this.buildFormat(index + 1, char);
                return;
            }

            this.formatters.push(function (d) {
                return part;
            });
            this.buildFormat(index + 1, char);
        };

        DateFormat.prototype.format = function (date) {
            var output = '';
            for (var i = 0; i < this.formatters.length; i++)
                output += this.formatters[i](date);
            return output;
        };

        DateFormat.format = function (date, format) {
            return new DateFormat(format).format(date);
        };
        return DateFormat;
    })();
    dotjem.DateFormat = DateFormat;
})(dotjem || (dotjem = {}));
