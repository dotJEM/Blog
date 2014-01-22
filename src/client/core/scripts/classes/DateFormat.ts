module dotjem {
    export class DateFormat {
        monthshort = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        monthlong = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        dayshort = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
        daylong = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

        private patterns;
        private formatters;

        constructor (public _format: string) {
            this.patterns = [];
            this.formatters = [];

            this.patterns['d'] = (d: Date)=> { return d.getDate() + ''; };
            this.patterns['dd'] = (d: Date)=> { return ("0" + d.getDate()).slice(-2); };
            this.patterns['ddd'] = (d: Date)=> { return this.dayshort[d.getDay()]; };
            this.patterns['dddd'] = (d: Date)=> { return this.daylong[d.getDay()]; };
            this.patterns['f'] = (d: Date)=> { return ('' + d.getMilliseconds()).slice(1); };
            this.patterns['ff'] = (d: Date)=> { return ('' + d.getMilliseconds()).slice(2); };
            this.patterns['fff'] = (d: Date)=> { return ('' + d.getMilliseconds()).slice(3); };
            this.patterns['h'] = (d: Date)=> { return (d.getHours() % 12) + ''; };
            this.patterns['hh'] = (d: Date)=> { return ("0" + d.getHours() % 12).slice(-2); };
            this.patterns['H'] = (d: Date)=> { return d.getHours() + ''; };
            this.patterns['HH'] = (d: Date)=> { return ("0" + d.getHours()).slice(-2); };
            this.patterns['m'] = (d: Date)=> { return d.getMinutes() + ''; };
            this.patterns['mm'] = (d: Date)=> { return ("0" + d.getMinutes()).slice(-2); };
            this.patterns['M'] = (d: Date)=> { return (d.getMonth()+1) + ''; };
            this.patterns['MM'] = (d: Date)=> { return ("0" + (d.getMonth()+1)).slice(-2); };
            this.patterns['MMM'] = (d: Date)=> { return this.monthshort[d.getMonth()]; };
            this.patterns['MMMM'] = (d: Date)=> { return this.monthlong[d.getMonth()]; };
            this.patterns['s'] = (d: Date)=> { return d.getSeconds() + ''; };
            this.patterns['ss'] = (d: Date)=> { return ("0" + d.getSeconds()).slice(-2); };
            this.patterns['yy'] = (d: Date)=> { return ("0" + (d.getFullYear() % 100)).slice(-2); };
            this.patterns['yyyy'] = (d: Date)=> { return d.getFullYear() + ''; };
            this.buildFormat(0, '');
        }

        private extractLiteral(index: number, seperator: string, idx) {
            var literalString = "";
            do {
                var char = this._format[index];
                if (char == seperator) {
                    idx(index);
                    return literalString;
                }
                literalString += char;
            } while (index++ < this._format.length)
            return null;
        }

        private buildFormat(index: number, part: string) {
            if (index > this._format.length)
                return;

            if (part == "'" || part == '"') {
                var literal = this.extractLiteral(index, part, (i)=>index = i);
                this.formatters.push((d: Date) => { return literal; });
                this.buildFormat(index+1, '');
                return;
            }

            var char = this._format[index];
            if (part.length == 0 || part[0] == char) {
                this.buildFormat(index + 1, part + char);
                return;
            }

            if (part in (<any>this.patterns)) {
                this.formatters.push(this.patterns[part]);
                this.buildFormat(index + 1, char);
                return;
            }

            this.formatters.push((d: Date) => { return part; });
            this.buildFormat(index + 1, char);
        }

        public format(date: Date): string {
            var output = '';
            for (var i = 0; i < this.formatters.length; i++)
                output += this.formatters[i](date);
            return output;
        }

        public static format(date: Date, format: string): string {
            return new DateFormat(format).format(date);
        }
    }
}