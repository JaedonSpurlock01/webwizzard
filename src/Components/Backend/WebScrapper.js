
class Chunk{

    constructor(text, tag){
        this._text = text;  
        this._length = this._text.length;
        this._size_limit = 3000;
        this._tag = ""
        
    }

    __filter__(){

        if(this._text === "" || this._text === null){
            return; 
        }

        this._text = this._text.slice(this._text.indexOf('>')+1, this._text.indexOf('<'))
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
        console.log("\nnew CHUNK(): ", this._text, "\n")
        return this; 
    }

    IsEmpty(){
        return (this._length <= 0)
    }

    MergeWith(chunk){
        this.Fill(this.ToText() + chunk.ToText())
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
        var elements = document.getElementsByTagName(tagName)
        
        //IMP ROOT BUG REPORT: the above line somehow isn't actually reading the actual page. It is simply reading the UI itself. 
        //That is why when you prompt it, the chunks show up. However the it crashes since the for below is acessing 'null' values. 
        console.log("__COLLECT__ status", "elements[] len: ", elements.length)
        let chunks = [];

        for(let i = 0; i < elements.length; i++){
            chunks.push(new Chunk(elements[i].textContent, tagName));
            chunks[i].Print();
        }

        //Safety Warning....
        if(chunks.length == 0){
            console.log("PROBLEM RAISED: 0 chunks were created since 0 elements were present for tag", tagName)
            console.log("                This means that AI would have no DATA available for training")
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
        for(let i = 0; i < array.length; i++){
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