/**Script to when create a new link and gives a alert */
$(document).ready(function(){
$("#add-link").submit(function(event) {
    alert['O Link foi guardado']
})
   

/*when updating a link and passing all parameters to an array, 
extracting id url and adding to data array 
making an ajax put request*/
$("form#update_link").submit(function(event){
    event.preventDefault();
    
    var unindexed_array = $(this).serializeArray();
    var data = {}
    var urlString = (window.location.protocol + "//" + window.location.host + "/" + window.location.pathname + window.location.search)

       
    $.map(unindexed_array, function(n, i){
        data[n.name] = n.value             
    })

    let paramString = urlString.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    for(let pair of queryString.entries()) {
        console.log("Value is:" + pair[1]);
        data["id"]= pair[1]
        
    }


    var request = {
        "url" : `http://localhost:5000/api/link/${data.id}`,
        "type" : "PUT",
        "dataType":"json",
        "data" : data,
      
    }


    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
    })

})

 /*script to when deleting an link */   
if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");//catch the td element
    $ondelete.click(function(){
        var id = $(this).attr("data-id")
 
        var request = {
            "url" : `http://localhost:5000/api/links/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Tem certeza que quer apagar?")){
            $.ajax(request).done(function(response){
                alert("Apagado!");
                location.reload();
            })
        }

    })
}
})


