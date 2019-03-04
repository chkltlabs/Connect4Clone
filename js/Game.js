class Game {
    constructor(){
        this.board = new Board();
        this.players = this.createPlayers();
        this.ready = false;
    }

    /**
     * Creates two player objects
     * @return  {Array}    An array of two Player objects.
     */
    createPlayers(){
        let rtn = [];
        rtn.push(new Player('Red', 1, '#e15258', true));
        rtn.push(new Player('Yellow', 2, '#e59a13'));
        return rtn;
    }

    /**
    * Creates the game!
    * */
    startGame(){
        this.board.drawHTMLBoard();
        this.activePlayer.activeToken.drawHTMLToken();
        this.ready = true;
    }

    /**
     * Returns the currently active player, can be accessed with dot notation.
     * @returns     {Player}    player who's 'active' attribute is set to 'true'
     */
    get activePlayer(){
        return this.players.find(player => player.active);
    }

    /**
     * Branches code based on user input
     * @param   {Event}     event passed from the keydown listener in app.js
     */
    handleKeydown(event){
        if(this.ready){
            switch (event.key) {
                case 'ArrowLeft':
                    this.activePlayer.activeToken.moveLeft();//Token should move left, unless it is over the leftmost column
                    break;
                case 'ArrowRight':
                    this.activePlayer.activeToken.moveRight(this.board.columns);//Token should move right, unless it is over the rightmost column
                    break;
                case 'ArrowDown':
                    this.playToken();//Token should move down, stopping before it overlaps another Token, unless it is above a column that is full
                    break;
                default:

                    break;
            }

        }
    }

    /**
     * Finds the next available space in the selected column
     * Then, if there is an available space, calls the drop() method,
     * and passes in the updateGameState() function as a callback
     */

    playToken(){
        let target = null;
        let spaces = this.board.spaces;
        let activeToken = this.activePlayer.activeToken;
        let targetColumn = spaces[activeToken.columnLocation];
        let gg = this;

        for (let space of targetColumn){
            if (space.token === null) {
                target = space;
            }
        }

        console.log(`${target} targeted`);

        if(target != null){
            gg.ready = false;
            activeToken.drop(target, function () {
                //callback function code goes here
                console.log('callback fired');
                gg.updateGameState(activeToken, target);
            });
        }


    }

    /**
     * Checks for a win based on the owner of the last played space
     * @param       {Space}     target is the Space object selected by the playToken() method
     * @returns     {boolean}   whether a Win has occurred.
     */
    checkForWin(target) {
        const owner = target.token.owner;
        const columns = this.board.columns;
        const rows = this.board.rows;
        const spaces = this.board.spaces;
        let win = false;

        //vertical
        for (let x = 0; x < columns; x++){
            for(let y = 0; y < rows - 3; y++){
                if (spaces[x][y].owner === owner &&
                    spaces[x][y+1].owner === owner &&
                    spaces[x][y+2].owner === owner &&
                    spaces[x][y+3].owner === owner ){
                    win = true;
                }
            }
        }

        //horizontal
        for (let x = 0; x < columns - 3; x++){
            for(let y = 0; y < rows; y++){
                if (spaces[x][y].owner === owner &&
                    spaces[x+1][y].owner === owner &&
                    spaces[x+2][y].owner === owner &&
                    spaces[x+3][y].owner === owner ){
                    win = true;
                }
            }
        }

        //diagonal 1
        for (let x = 3; x < columns; x++){
            for(let y = 0; y < rows - 3; y++){
                if (spaces[x][y].owner === owner &&
                    spaces[x-1][y+1].owner === owner &&
                    spaces[x-2][y+2].owner === owner &&
                    spaces[x-3][y+3].owner === owner ){
                    win = true;
                }
            }
        }

        //diagonal 2
        for (let x = 3; x < columns; x++){
            for(let y = 3; y < rows; y++){
                if (spaces[x][y].owner === owner &&
                    spaces[x-1][y-1].owner === owner &&
                    spaces[x-2][y-2].owner === owner &&
                    spaces[x-3][y-3].owner === owner ){
                    win = true;
                }
            }
        }

        return win;
    }

    /**
     * Switches active player.
     */
    switchPlayers(){
        for(let player of this.players){
            player.active = player.active !== true;
        }
    }

    /**
     * Displays game over message.
     * @param {string} message - Game over message.
     */
    gameOver(message){
        let go = document.getElementById('game-over');
        go.style.display = 'block';
        go.textContent = message;
    }

    /**
     * Updates game state after token is dropped.
     * @param   {Object}  token  -  The token that's being dropped.
     * @param   {Object}  target -  Targeted space for dropped token.
     */
    updateGameState(token, target){
        target.mark(token);
        if(this.checkForWin(target)){
            this.gameOver(`${this.activePlayer.name} wins!`);
            this.ready = false;
        } else {
            this.switchPlayers();

            if (this.activePlayer.checkTokens()) {
                this.activePlayer.activeToken.drawHTMLToken();
                this.ready = true;
            } else {
                this.gameOver(`${this.activePlayer.name} ran out of tokens!`)
            }
        }

    }
}













