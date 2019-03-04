class Token {
    constructor(owner, index){
        this.owner = owner;
        this.id = `token-${index}-${owner.id}`;
        this.dropped = false;
        this.columnLocation = 0;
    }

    drawHTMLToken(){
        const div1 = document.createElement('div');
        document.getElementById('game-board-underlay').append(div1);
        div1.setAttribute('id', this.id);
        div1.setAttribute('class', 'token');
        div1.style.backgroundColor = this.owner.color;
    }

    get htmlToken(){
        return document.getElementById(this.id);
    }

    /**
     * Gets left offset of html element.
     * @return  {number}   Left offset of token object's htmlToken.
     */
    get offsetLeft(){
        return this.htmlToken.offsetLeft;
    }

    /**
     * Moves html token one column to left.
     */
    moveLeft(){
        if(this.columnLocation > 0){
            this.htmlToken.style.left = this.offsetLeft - 76;
            this.columnLocation--;
        }
    }

    /**
     * Moves html token one column to right.
     * @param   {number}    columns - number of columns in the game board
     */
    moveRight(cols){
        if(this.columnLocation < cols-1){
            this.htmlToken.style.left = this.offsetLeft + 76;
            this.columnLocation++;
        }
    }

    /**
     * Drops html token into targeted board space.
     * @param   {Object}   target - Targeted space for dropped token.
     * @param   {function} reset  - The reset function to call after the drop animation has completed.
     */
    drop(target, reset){
        this.dropped = true;
        $(this.htmlToken).animate({
            top: (target.y * target.diameter)
        }, 750, 'easeOutBounce', reset);
    }
}