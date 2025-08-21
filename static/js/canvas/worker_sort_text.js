onmessage = function(e){
    postMessage([e.data[0],  sort_text_array(e.data[1])]);
}


function sort_text_array(sorted_text_array){    
    
    sorted_text_array.sort( (a,b)=>{
        let nameA = a.font_size+a.color+a.font_family;
        let nameB = b.font_size+b.color+b.font_family;
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    })
    return sorted_text_array

}
