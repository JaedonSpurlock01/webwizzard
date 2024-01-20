
function scrape(tagName){
    const ps = document.getElementsByTagName(tagName)
    console.log(ps.item(0))

    let elements = [];

    var limit = 3600; 
    var total_size = 0; 
    var len = 0; 

    for(let i = 0; i < ps.length() -1; i++){

        if(total_size >= 3600){
            return elements; 
        }

        elements.push(ps.item(i))
        total_size += elements[i].length();
        console.log("element: ", elements[i])

    }

    return elements; 
}

module.exports = {
    scrape
}