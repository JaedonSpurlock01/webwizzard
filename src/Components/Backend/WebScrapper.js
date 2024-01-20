const { MdTungsten } = require("react-icons/md");

function Collector(tagName){
    
    const elements = document.getElementsByTagName(tagName)
   
    let chunks = [];

    for(let i = 0; i < elements.length - 1; i++){
        chunks.push(new Chunk(elements.item(i)));
        chunks[i].Print();
    }

    return chunks; 
}


class Chunk{

    constructor(text, tag){
        this._text = text;
        console.log("ATTENTION::::", typeof this._text)   //BUG HERE, idk if this is a string or not
        this._length = this._text.length;
        this._size_limit = 3000;
        this._tag = ""
    }

    Slice(index1, index2){

        if(index1 < 0 || index2 > this._length){
            return null; 
        }

        this._text = this._text.slice(index1, index2);
        return this; 
    }

    ToText(){
        return this._text;
    }

    Fill(data){

         //Slice the data at index 400 and store that
        if(data.length > this._size_limit){
            this._text = data.slice(0, this._size_limit)
            this._max_length = this._text.length;
            return this; 
        }

        this._text = data; 
        this._max_length = this._text.length; 
        return this;
    }
    
    GiveTag(tag){
        this._tag = tag; 
    }

    SetSizeLimit(lim){
        this._size_limit = lim;
        return this; 
    }

    Print(){
        console.log("\nYAA", this._text, "\n");
        return this; 
    }

    IsEmpty(){
        return (this._length <= 0)
    }

    MergeWith(chunk){
        this.Fill(chunk.ToText())
        return this; 
    }

    GetSizeLimit(){
        return this._size_limit; 
    }

    GetLength(){
        return this._length; 
    }

    
}


class WebScrapper{

    constructor(){
        this.P_ELEMS = []
        this.H_ELEMS = []
    }

    __COLLECT__(tagName){
        const elements = document.getElementsByTagName(tagName)
        
        let elem_string = "";

        let chunks = [];

        for(let i = 0; i < elements.length - 1; i++){
            chunks.push(new Chunk(elements.item(i), tagName));
            chunks[i].Print();
        }

        return chunks; 
    }

    CollectData(){
        this.P_ELEMS = this.__COLLECT__('p')
        this.H_ELEMS = this.__COLLECT__('h')
    }


    getElementsByTagName(tag){

        if(tag === 'p'){
            return this.P_ELEMS;
        }

        if(tag === 'h'){
            return this.H_ELEMS;
        }
    }  
    
    PrintElementsOfArray(array, name){

        console.log("Array:- ", name)
        for(let i = 0; i < array.length - 1; i++){
            console.log(array[i].Print(), "\n")
        }

        console.log("______End of ", name, "_______")
    }


    PrintElementsOfTag(tag){

        if(tag === 'p'){
            this.PrintElementsOfArray(this.P_ELEMS, "Paragraph")
            return this; 
        }

        if(tag === 'h'){
            this.PrintElementsOfArray(this.H_ELEMS, "Heading");
            return this;
        }

    }

    PrintAll(){
        this.PrintElementOfTag('p');
        this.PrintElementOfTag('h');
    }
}


module.exports = {
    WebScrapper: WebScrapper,
    Chunk: Chunk
}