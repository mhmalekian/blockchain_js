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
        this.nonce=0;
    }

    calculateHash()
    {
        return SHA256(this.index+this.previousHash+this.timestamp+JSON.stringify(this.data)+this.nonce).toString();
    }

    mineBlock(difficulty)
    {
        while(this.Hash.substring(0,difficulty)!== Array(difficulty + 1).join("0"))
        {
            this.nonce++;
            this.Hash=this.calculateHash();
        }

        console.log("Block mined:" + this.Hash );
    }
}

class BlockChain
{
    constructor()
    {
        this.chain=[this.createGenesisBlock()];
        this.difficulty=5;
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
        //newBlock.Hash=newBlock.calculateHash();
        newBlock.mineBlock(this.difficulty);
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
console.log("Mining Block 1 ....");
mhmCoin.addBlock(new Block(1,"02/01/2019",{amont: 4}));

console.log("Mining Block 2 ....");

mhmCoin.addBlock(new Block(2,"02/03/2019",{amont: 6}));

console.log("Mining Block 3 ....");

mhmCoin.addBlock(new Block(3,"05/04/2019",{amont: 8}));

//console.log(JSON.stringify(mhmCoin,null,4));
//console.log("mhmCoin BlockChain is valid? "+mhmCoin.isChainValid());
//-----try to change block in blockChain but it works amazing against changes!!!!
//mhmCoin.chain[1].data={amount: 8};
//mhmCoin.chain[1].Hash=mhmCoin.chain[1].calculateHash();

//console.log("mhmCoin BlockChain is valid? "+mhmCoin.isChainValid());