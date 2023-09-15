const Gameboard = (() => {
    const gameboard = [];

    const clear = () => {
        gameboard.splice(0, gameboard.length);

        for (let i = 0; i < 9; i++) {
            let box = document.getElementById("box" + i)
            box.innerText = "";
            box.addEventListener('click', () => {
                Game.play(i);
            }, { once: true });
        }
        document.getElementById("gameboard").style["pointer-events"] = "auto";
        document.getElementById("result").innerText = "";
    }

    const deleteBoard = () => {
        const gameboardDiv = document.getElementById("gameboard");
        while (gameboardDiv.firstChild) {
            gameboardDiv.firstChild.remove()
        }
        create();
    }

    const tickBox = (box, mark) => {
        if (typeof gameboard[box] === 'undefined') {
            gameboard[box] = mark;
            document.getElementById("box" + box).innerText = mark;
        }
        let winner = checkWin(mark);
        if (winner) {
            Game.stop(winner);
        }
        if (gameboard.filter(String).length === 9) {
            Game.stop();
        }
    }
    const create = () => {
        const gameboardDiv = document.getElementById("gameboard");
        for (let i = 0; i < 9; i++) {
            const div = document.createElement("div");
            div.setAttribute("id", "box" + i);
            div.setAttribute("class", "box");
            div.addEventListener('click', () => {
                Game.play(i);
            }, { once: true });
            gameboardDiv.appendChild(div);
        }


        const startBtn = document.getElementById("restart");
        startBtn.addEventListener('click', () => {
            Game.restart();
        });
    }

    const checkWin = (mark) => {
        if (gameboard[0] !== undefined && (gameboard[0] === gameboard[1]) && (gameboard[0] === gameboard[2]) ||
            ((gameboard[0] !== undefined) && (gameboard[0] === gameboard[3]) && (gameboard[0] === gameboard[6])) ||
            ((gameboard[0] !== undefined) && (gameboard[0] === gameboard[4]) && (gameboard[0] === gameboard[8])) ||
            ((gameboard[1] !== undefined) && (gameboard[1] === gameboard[4]) && (gameboard[1] === gameboard[7])) ||
            ((gameboard[2] !== undefined) && (gameboard[2] === gameboard[5]) && (gameboard[2] === gameboard[8])) ||
            ((gameboard[2] !== undefined) && (gameboard[2] === gameboard[4]) && (gameboard[2] === gameboard[6])) ||
            ((gameboard[3] !== undefined) && (gameboard[3] === gameboard[4]) && (gameboard[3] === gameboard[5])) ||
            ((gameboard[6] !== undefined) && (gameboard[6] === gameboard[7]) && (gameboard[6] === gameboard[8]))
        ) {
            console.log(mark + " wins");
            return Game.getPlayerByMark(mark);
        }
        return;
    }

    return { gameboard, clear, deleteBoard, tickBox, create, checkWin };
})();

const Player = (name, mark) => {
    this.mark = mark;
    this.name = name;
    return { name: this.name, mark: this.mark };
}

const Game = (() => {

    let player1, player2, currentPlayer;

    const initialize = () => {
        Gameboard.create();
        start();
    }

    const start = () => {
        player1 = Player("player1", "X");
        player1.name = document.getElementById("player1").value;
        player2 = Player("player2", "O");
        player2.name = document.getElementById("player2").value;
        currentPlayer = player1;
    }

    const restart = () => {
        Gameboard.clear();
        start();

    }
    const play = (box) => {
        Gameboard.tickBox(box, currentPlayer.mark);
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    const stop = (winner) => {
        document.getElementById("result").innerText = winner ? winner.name + " wins" : "tie";
        document.getElementById("gameboard").style["pointer-events"] = "none";
        return;
    }

    const getPlayerByMark = (mark) => {
        if (mark === "X") {
            return player1;
        }
        if (mark === "O") {
            return player2;
        }
    }

    return { initialize, start, restart, play, stop, getPlayerByMark };
})();

Game.initialize();