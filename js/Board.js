class Board {
    constructor(){
        this.rows = 6;
        this.columns = 7;
        this.spaces = this.createSpaces();

    }

    /**
     * Generates 2D array of spaces.
     * @param   {rows}      number of horizontal rows in the board, default is this.rows
     * @param   {columns}   number of vertical columns in the board, default is this.columns
     * @return  {Array}     An array of space objects
     */
    createSpaces(rows = this.rows, columns = this.columns){
        let rtn = [];
        for (let x = 0; x < columns; x++){
            let column = [];
            for (let y = 0; y < rows; y++){
                let spc = new Space(x, y);
                column.push(spc);
            }
            rtn.push(column);
        }
        return rtn;
    }

    drawHTMLBoard(){
        for (let column of this.spaces){ //called a 'for-of' loop, similar to foreach loops in php and java.
            for (let space of column){ //syntax is to declare a new variable 'space' to represent each object in the provided array 'column'
                space.drawSVGSpace();
            }
        }
    }
}