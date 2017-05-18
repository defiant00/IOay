## io6

```javascript
Board {
	winStates: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    .cells;
    .states: [0, 0, 0, 0, 0, 0, 0, 0, 0];
    .currentPlayer: 0;

	new: {cells to
		this.cells: cells;

		for c in cells {
			c.onclick: {ev to
				id: ev.toElement.id.charAt(1);
				click(id);
			}
		}

		drawBoard;
	}

	.drawBoard: {
		for i in [0..9] {cells[i].className: "p{states[i]}";}
	}

	.click: {id to
		if states[id] = 0 {
			states[id]: currentPlayer + 1;
			currentPlayer: (currentPlayer + 1) % 2;
			drawBoard;
			checkWin;
		}
	}

	.checkWin: {
		for i in [0..winStates.length] {
			firstCell: states[winStates[i][0]];
			if firstCell != 0 and
				firstCell = states[winStates[i][1]] and
				firstCell = states[winStates[i][2]] {
				alert("Player {firstCell} wins!");
				win: true;
			}
		}
		if !win {
			scratch: true;
			for i in [0..9] {
				if states[i] = 0 {
					scratch: false;
					break;
				}
			}
			if scratch {alert("Tie!");}
		}
	}
}

window.onload: {
	cells: [0..9].map({i to document.getElementById("c{i}");});
	Board.new(cells);
}
```

```javascript
use System;
use System.Collections.Generic;
use System.IO;

Metro2Processor {
    Program {
        main: {args to
            Console.WriteLine("Metro 2 File Processor v1.02");

            start: DateTime.Now;

            config: Config.new(args);

            if config.isSet("?") or !config.isSet("out") {
                Console.WriteLine("Usage: Metro2Processor (file names) (arguments)");
                Console.WriteLine;
                Console.WriteLine("Available arguments:");
                Console.WriteLine("    /all9  - Update SSNs that start with 99 or 98 to all 9s.");
                Console.WriteLine("    /cdec  - Combined decorator file.");
                Console.WriteLine("    /close - Set status to 13 when there is a closed date.");
                Console.WriteLine("    /dol1  - Create L1 records.");
                Console.WriteLine("    /out   - Specify output folder.");
                Console.WriteLine("    /wait  - Waits for a keypress once the program is finished running.");
            } else {
                Console.Write("Processing...");

                outPath: config["out"];

                if !outPath.EndsWith("\\") {
                    outPath: "{outPath}\\";
                }

                replaceAll9: config.isSet("all9");
                doL1: config.isSet("dol1");
                close: config.isSet("close");

                Directory.CreateDirectory(outPath);

                try {
					log: StreamWriter.new("{outPath}log") {
						log.WriteLine("Started processing at {DateTime.Now}");
                        if config.isSet("cdec") {
                            combinedWriter: StreamWriter.new("{outPath}combined");

                            headerFooter: File.ReadAllLines(config["cdec"]);
                            if headerFooter.Length > 0 {
                                combinedWriter.WriteLine(processHeader(headerFooter[0], log));
                            } else {
                                log.WriteLine("No header in file: {config["cdec"]}");
                            }
                        }

						for fName in config.Files {
                            if File.Exists(fName) {
                                processFile(fName, outPath, replaceAll9, doL1, close, combinedWriter, log);
                            } else if Directory.Exists(fName) {
								for dirFile in Directory.GetFiles(fName) {
                                    processFile(dirFile, outPath, replaceAll9, doL1, close, combinedWriter, log);
                                }
                            }
                        }
                        if headerFooter {
                            if headerFooter.Length > 1 {
                                combinedWriter.WriteLine(headerFooter[1]);
                            } else {
                                log.WriteLine("No footer in file: {config["cdec"]}");
                            }
                        }

                        log.WriteLine("Finished processing at {DateTime.Now}");
                    }
                } finally {
                    if combinedWriter {
                        combinedWriter.Dispose();
                    }
                }
            }

            Console.WriteLine("Done");

            time: DateTime.Now - start;
            Console.WriteLine("Time taken: {time}");

            if config.isSet("wait") {
                Console.WriteLine("Press any key...");
                Console.ReadKey;
            }
        }

		processHeader: {header, logWriter to
            if header.Length > 63 {
                start: header.Substring(0, 47);
                end: header.Substring(63);
                curr: DateTime.Now;
                priorLast: curr.AddDays(-curr.Day);
				return "{start}{priorLast:MMddyyyy}{curr:MMddyyyy}{end}"
            } else {
                logWriter.WriteLine("Error, header is too short.");
            }
            return header;
        }

        processFile: {filePath, outPath, replaceAll9, doL1, close, combinedWriter, logWriter to
            logWriter.WriteLine("Processing {filePath}");
            fileName: filePath[(filePath.LastIndexOf('\\') + 1)..];
            writer: combinedWriter;
            try {
                if !combinedWriter {
                    writer = StreamWriter.new("{outPath}{fileName}");
                }
				reader: StreamReader.new(filePath) {
                    while line: reader.ReadLine() {
                        headerFooter: true;
                        if line.Length > 12 {
                            start: line[4..11];
                            if !start.StartsWith("HEADER") and !start.StartsWith("TRAILER") and line.Length > 306 {
                                headerFooter: false;
                                branch: line[36..40];

                                firstPart: line[0..42];
                                acctNum: line[42..72];
                                afterAcct: line[72..123];
                                status: line[123..125];
                                afterStatus: line[125..150];
                                specialComment: line[150..152];
                                afterSpecialComment: line[152..154];
                                currentBalance: line[154..163];
                                amountPastDue: line[163..172];
                                afterAmountPastDue: line[172..181];
                                dateOfAcctInfo: line[181..189];
                                dateOfFirstDelinq: line[189..197];
                                dateClosed: line[197..205];
                                afterDateClosed: line[205..297];
                                ssn: line[297..306];
                                lastPart: line[306..];

                                if string.IsNullOrWhiteSpace(ssn) {
                                    logWriter.WriteLine("Acct {acctNum.Trim()} has no SSN.");
                                }

                                if replaceAll9 and (ssn.StartsWith("99") or ssn.StartsWith("98")) {
                                    ssn: "999999999";
                                }

                                if close and dateClosed != "00000000" {
                                    status: "13";
                                    amountPastDue: "000000000";
                                    currentBalance: "000000000";
                                    dateOfFirstDelinq: "00000000";
                                    dateOfAcctInfo: dateClosed;
                                }

                                if status = "11" {
                                    dateOfFirstDelinq: "00000000";
                                }

                                if dateClosed = "00000000" and specialComment = "AS" {
                                    specialComment: "  ";
                                }

                                l1: "";

                                if doL1 and acctNum.StartsWith(branch) {
                                    l1: "L11{acctNum.PadRight(51)}";
                                    acctNum: "{acctNum.Trim()}01".PadRight(30);
                                }

                                line: "{firstPart}{acctNum}{afterAcct}{status}{afterStatus}{specialComment}{afterSpecialComment}{currentBalance}{amountPastDue}{afterAmountPastDue}{dateOfAcctInfo}{dateOfFirstDelinq}{dateClosed}{afterDateClosed}{ssn}{lastPart}{l1}";

                                checkLine(line, logWriter);
                            }
                        }
                        if !combinedWriter or !headerFooter {
                            writer.WriteLine(line);
                        }
                    }
                }
            } finally {
                if !combinedWriter and writer {
                    writer.Dispose;
                }
            }
        }

        checkLine: {line, logWriter to
            acctNum: line[42..72].Trim;

            missing: List<string>.new;
            addIfWhitespace(missing, line, 329, 32, "Street");
            addIfWhitespace(missing, line, 393, 20, "City");
            addIfWhitespace(missing, line, 413, 2, "State");
            addIfWhitespace(missing, line, 415, 9, "ZIP");

            if missing.Count > 0 {
                logWriter.WriteLine("{acctNum} is missing: {string.Join(", ", missing)}");
            }
        }

        addIfWhitespace: {list, line, start, size, name to
            val: line[start..(start + size)];
            if string.IsNullOrWhiteSpace(val) {
                list.Add(name);
            }
        }
    }
}
```
```javascript
use System.Collections.Generic;

Metro2Processor {
	Config {
		.flags: Dictionary<string, string>.new;
		.files: List<string>.new;

		.isSet: {flag to
			return flags.ContainsKey(flag);
		}

		.[flag].get: {return flags[flag];}
		.[flag].set: {value to flags[flag]: value;}

		new: {args to
			if args.Length > 0 {
				for a in args {
					if a[0] = "/" {
						ind: a.IndexOf(":");
						key: a;
						if ind > -1 {
							key: a[0..ind];
							val: a[(ind + 1)..];
						}
						flags[key[1..]]: val;
					} else {
						files.Add(a);
					}
				}
			}
		}
	}
}
```
