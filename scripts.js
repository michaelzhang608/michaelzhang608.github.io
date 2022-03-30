$(document).ready(() => {

    // Preview image hover function
    $(".preview").popover({
        trigger: "hover",
        html: true,
        content: function () {
            return '<img class="img-fluid" src="' + $(this).data('img') + '" />';
        }
    });

    // Share button copy link function
    $(".share").popover({
        content: "copied to clipboard!"
    });
    $(".share").click(function() {
        let loc = location.protocol + '//' + location.host + location.pathname + $(this).attr("href");
        console.log(loc)
        navigator.clipboard.writeText(loc)
        return false;
    })
})