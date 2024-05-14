
import {InstagramScrapper} from './InstagramScrapper.js';
class Chunk{

    constructor(text, tag){
        this._text = text;  
        this._length = this._text.length;
        this._size_limit = 3000;
        this._tag = tag
        
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

         //Slice the data at index 3000 and store that
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
        console.log("\nnew CHUNK('",this._tag, "'): ", this._text, "\n")
        return this; 
    }

    IsEmpty(){
        return (this._length <= 0)
    }

    CombineWith(chunk){
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
        this.data = {};
        this.instagramScrapper = new InstagramScrapper();
    }

    __COLLECT__(tagName) {
        var elements = document.getElementsByTagName(tagName);
        console.log("__COLLECT__ status", "elements[] len: ", elements.length);
        let chunks = [];

        for (let i = 0; i < elements.length; i++) {
            chunks.push(new Chunk(elements[i].textContent, tagName));
            chunks[i].Print();
        }

        if (chunks.length == 0) {
            console.log("PROBLEM RAISED: 0 chunks were created since 0 elements were present for tag", tagName);
            console.log("This means that AI would have no DATA available for training");
        }
        return chunks;
    }

    extractDetailsFromSite(element) {
        // Lógica para extrair informações relevantes do site
        const name = element.querySelector('.product-name').textContent.trim();
        const price = element.querySelector('.product-price').textContent.trim();
        const storeName = element.querySelector('.store-name').textContent.trim();
        
        return {
            name: name,
            price: price,
            storeName: storeName,
            // Se necessário, você também pode adicionar outras informações relevantes aqui
        };
    }

    async CollectData() {
        const siteElements = this.__COLLECT__('div.product');
        const siteDetails = siteElements.map(chunk => this.extractDetailsFromSite(chunk));

        const lat = -5.0892;  // Substitua por valores reais
        const lon = -42.8016; // Substitua por valores reais
        const radius = 1000;  // Substitua por valores reais

        const instagramData = await this.instagramScrapper.getInstagramData(lat, lon, radius);

        const mergedData = [...siteDetails, ...instagramData];

        this.data['merged'] = mergedData;
    }

    getElementsByTagName(tag) {
        return this.data[tag] || [];
    }

    PrintElementsOfArray(array, name) {
        console.log("Array:- ", name);
        for (let i = 0; i < array.length; i++) {
            console.log(array[i].Print(), "\n");
        }
        console.log("______End of ", name, "_______");
    }

    PrintElementsOfTag(tag) {
        const elements = this.getElementsByTagName(tag);
        this.PrintElementsOfArray(elements, tag);
    }

    PrintAll() {
        Object.keys(this.data).forEach(tag => {
            this.PrintElementsOfTag(tag);
        });
    }
}


module.exports = {
    WebScrapper: WebScrapper,
    Chunk: Chunk
}