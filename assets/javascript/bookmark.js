$(document).on("click",".bookmark",function(){
    var dataUrl = $(this).attr("data-url");
    var itemBookmarked = dataUrl.split(",");
    if(itemBookmarked){
        if(itemBookmarked[0]==="article"){
            console.log("article");
        }
        else if(itemBookmarked[0]==="event"){
            console.log("event");
        }
    }
    


});