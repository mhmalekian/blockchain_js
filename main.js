const SHA256=require('crypto-js/sha256');
class Block
{

    constructor(index,timestamp,data,previousHash='')
    {
        this.index=index;
        this.timestamp=timestamp;
        this.data=data;
        this.previousHash=previousHash;
        this.Hash=this.calculateHash();
    }

    calculateHash()
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
        return new Block(0,"01/01/2019","Genesis block","0");
    }

    getLastBlock()
    {
        return this.chain[this.chain.length -1];

    }

    addBlock(newBlock)
    {
        newBlock.previousHash=this.getLastBlock().Hash;
        newBlock.Hash=newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid()
    {
        for(let i=1;i<this.chain.length ; i++)
        {
            const currentBlock=this.chain[i];
            const previousBlock=this.chain[i-1];

            if(currentBlock.Hash!==currentBlock.calculateHash())
            {
                return false;
            }

            if(currentBlock.previousHash!==previousBlock.Hash)
            {
                return false;
            }
        }

        return true;
    }
}


let mhmCoin = new BlockChain();
mhmCoin.addBlock(new Block(1,"02/01/2019",{amont: 4}));
mhmCoin.addBlock(new Block(2,"02/03/2019",{amont: 6}));
mhmCoin.addBlock(new Block(1,"05/04/2019",{amont: 8}));

//console.log(JSON.stringify(mhmCoin,null,4));

console.log("mhmCoin BlockChain is valid? "+mhmCoin.isChainValid());