class Player {
    constructor(name, id, color, active = false){
        this.name = name;
        this.id = id;
        this.color = color;
        this.active = active;
        this.tokens = this.createTokens(21);
    }

    /**
     * Creates toke objects for player
     * @param       {integer}   num = Number of token objects to be created
     *  @returns    {array}     rtn = an array of created Token objects
     */
    createTokens(num){
        let rtn = [];
        for(let i = 0; i < num; i++){
            let tkn = new Token(this, i);
            rtn.push(tkn);
        }
        return rtn;
    }

    get unusedTokens(){
        return this.tokens.filter(token => !token.dropped);
    }

    get activeToken() {
        return this.unusedTokens[0];
    }

    /**
     * Check if a player has any undropped tokens left
     * @return {Boolean}
     */
    checkTokens(){
        return this.unusedTokens.length > 0;
    }



}