weather = {
    call: (target) => {
        $.ajax({
            url: Url,
            method: "GET"
        }).done(function(response){
            console.log(response);
        })
    }
}