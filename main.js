const SHA256=require('crypto-js/sha256');
class Block
{

    constructor(index,timestamp,data,previousHash='')
    {
        this.index=index;
        this.timestamp=timestamp;
        this.data=data;
        this.previousHash=previousHash;
        this.Hash=this.calculatHas();
    }

    calculatHas()
    {
        return SHA256(this.index+this.previousHash+this.timestamp+JSON.stringify(this.data)).toString();
    }
}

class BlockChain
{
    constructor()
    {
        this.chain=[this.createGenesisBlock()];
    }

    createGenesisBlock()
    {
        return new Block(0,"01/01/2019","Gensis block","0");
    }
}