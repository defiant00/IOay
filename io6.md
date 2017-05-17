io6
#### Typescript
```javascript
class Board {
    cells: HTMLElement[];
    states: number[];
    currentPlayer: number;
    winStates: number[][] = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    constructor(cells: HTMLElement[]) {
        this.cells = cells;
        this.states = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.currentPlayer = 0;

        for (var i = 0; i < 9; i++) {
            this.cells[i].onclick = (ev: MouseEvent) => {
                var id: number = +(<HTMLTableCellElement>ev.toElement).id.charAt(1);
                this.click(id);
            }
        }

        this.drawBoard();
    }

    drawBoard() {
        for (var i = 0; i < 9; i++) {
            this.cells[i].className = "p" + this.states[i];
        }
    }

    click(id: number) {
        if (this.states[id] == 0) {
            this.states[id] = this.currentPlayer + 1;
            this.currentPlayer = (this.currentPlayer + 1) % 2;
            this.drawBoard();

            this.checkWin();
        }
    }

    checkWin() {
        var win: boolean = false;
        for (var i = 0; i < this.winStates.length; i++) {
            var firstCell = this.states[this.winStates[i][0]];
            if (firstCell != 0 &&
                firstCell == this.states[this.winStates[i][1]] &&
                firstCell == this.states[this.winStates[i][2]]) {
                alert("Player " + firstCell + " wins!");
                win = true;
            }
        }
        if (!win) {
            var scratch: boolean = true;
            for (var i = 0; i < 9 && scratch; i++) {
                if (this.states[i] == 0) {
                    scratch = false;
                }
            }
            if (scratch) {
                alert("Tie!");
            }
        }
    }
}

window.onload = () => {
    var cells: HTMLElement[] = [
        document.getElementById("c0"),
        document.getElementById("c1"),
        document.getElementById("c2"),
        document.getElementById("c3"),
        document.getElementById("c4"),
        document.getElementById("c5"),
        document.getElementById("c6"),
        document.getElementById("c7"),
        document.getElementById("c8")
    ];
    new Board(cells);
};
```
#### Minimal
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

		cells.each({c to
			c.onclick: {ev to
				var id: ev.toElement.id.charAt(1);
				click(id);
			}
		});

		drawBoard;
	}

	.drawBoard: {
		[0..9].each({i to cells[i].className: "p{states[i]}";});
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
		var win: false;
		[0..winStates.length].each({i to
			var firstCell: states[winStates[i][0]];
			if firstCell != 0 and
				firstCell = states[winStates[i][1]] and
				firstCell = states[winStates[i][2]] {
				alert("Player {firstCell} wins!");
				win: true;
			}
		});
		if !win {
			var scratch: true;
			[0..9].each({i to if states[i] = 0 {
				scratch: false;
				break;
			}});
			if scratch {alert("Tie!");}
		}
	}
}

window.onload: {
	var cells: [0..9].map({i to document.getElementById("c{i}");});
	Board.new(cells);
}
```
