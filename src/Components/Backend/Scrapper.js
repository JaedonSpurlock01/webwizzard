
function scrape(tagName){
    const ps = document.getElementsByTagName(tagName)
    console.log(ps.item(0))

    let elements = [];

    let limit = 3600; 
    let total_size = 0; 
    let len = 0; 

    for(let i = 0; i < ps.length -1; i++){

        if(total_size >= 3600){
            return elements; 
        }
        elements.push(ps.item(i))
        total_size += elements[i].length;
        console.log("element: ", elements[i])
    }

    return elements; 
}



class DataObject{

    constructor(){
        this.__element_name = "some_element"
        this.__array = []
    }

    print(){

    }

    get_array(){

    }

    read(){

    }
}


class WebScrapper{


    constructor(){
        this.__P_ELEM = [];
        this.__H_ELEM = [];
    }

    read(){
        this.__data.p_elements = scrape('p')
        this.__data.h_elements = scrape('h')
    }

    __print_elements(array, elem_name){
        for(let i = 0; i < array.length - 1; i++){
            console.log(elem_name + " array : ", array[i]);
        }
    }

    print(tagName){
        
        if(tagName === 'p'){
            this.__print_elements(this.__P_ELEM, "Paragraph")
        }

        else if(tagName === 'h'){
            this.__print_elements(this.__H_ELEM, "Heading")
        }
    }

    print_all(tagName){
        this.print('p')
        this.print('h')
    }

    get_element_data(tagName){
        
        if(tagName === 'p'){
            return this.__P_ELEM;
        }

        if(tagName === 'h'){
            return this.__H_ELEM;
        }
    }

};


module.exports = {
    WebScrapper: WebScrapper
}