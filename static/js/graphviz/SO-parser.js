

function get_nodes_and_edges(string){

    var nodes = {}, edges = {};
    var lines = string.split(';');
    
    for (var i=0; i< lines.length-1; i++){
		
		if (!lines[i]) continue
        var [type, label, res]  = parse_line(lines[i])
        if (type=='node'){
            nodes[label] =  {attrs: res}
        }else{
            edges[label] = [{attrs:res, edge:label.split('->').map(d=>d.trim())}]
        }
    }
    var graphs = []
    var graph = {nodes, edges, graphs}    
    return graph
}


function parse_line(line){
    var [label, data] = line.split('[')
    
    var type = (label.indexOf('->') == -1)? 'node' : 'edge';
    label =label.trim();
    data = data.trim().slice(0,-1);

    data = data.split(/,\s+/).map(d=>d.split('=').map(e=> e.replace(/"/g,'').trim()  ))
    
    var res = {}
    if (type=='node'){
        var p = data.find(d=>d[0] =='pos');
		p[1] = p[1].split(',').map(e=>parseFloat(e)); 
		var p = data.find(d=>d[0] =='width');
		p[1] = parseFloat(p[1]) * 72;
		var p = data.find(d=>d[0] =='height');
		p[1] = parseFloat(p[1]) * 72;

    }else{

    }
    data.forEach(d=>res[d[0]] =  d[1]);
    
    return [type, label, res]
}

t1 = 	'javascript \t [_draw_="c 7 -#000000 C 7 -#d3d3d3 P 4 300.45 -284.6 231.45 -284.6 231.45 -307.6 300.45 -307.6 ",\
		_ldraw_="F 14 11 -Times-Roman c 7 -#000000 T 265.95 -299.8 0 53 10 -javascript ",\
		height=0.31944,\
		pos="265.95,-296.1",\
        width=0.95833]'
        
t2=     'javascript -> jquery \t [_draw_="c 9 -#00ff0000 B 4 246.27 -307.72 186.14 -336.91 4.37 -411.4 -73.01 -438.9 ",\
		_hdraw_="S 5 -solid c 9 -#00ff0000 C 9 -#00ff0000 P 3 -72.19 -442.32 -82.79 -442.31 -74.5 -435.71 ",\
		len=8.477121254719663,\
        pos="e,-82.787,-442.31 246.27,-307.72 186.14,-336.91 4.3739,-411.4 -73.015,-438.9"]'
        

var s = ''
fetch('./static/data/t5.xdot').then(function(response) {
	return response.text();
}).then(function(myBlob) {
 	s = myBlob;
});