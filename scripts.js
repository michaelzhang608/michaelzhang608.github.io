

$(document).ready(() => {

    // Initialization functions
    updateScreen();


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

    // Toggle flex-nowrap at 801 px
    $(window).resize(function () {
        updateScreen();
    });
})

function updateScreen() {
    console.log($(window).width())
    if ($(window).width() <= 801 || screen.width <= 801) {
        $('.row-main').removeClass('flex-nowrap');
    } else {
        $('.row-main').addClass('flex-nowrap');
    }
}