

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

    // Form submission function
    $("#suggestion-form").submit(e=>{
        let data = new FormData(e.target);
        obj = {
            "name": data.get("name"),
            "message": data.get("message"),
        };
        $.post(
            "https://script.google.com/macros/s/AKfycbwpsZWux5pxNfzk4oOjp_22rnkfeneuHtUA6QfU1WDKssJJqVXe9A53hiLFRUmlauqixw/exec",
            JSON.stringify(obj)
        );
        $("#most-recent-idea").text("");
        $("#most-recent-name").text("");
        $("#submission-loading").show();
        setTimeout(() => {
            $("#most-recent-idea").text(obj["message"]);
            $("#most-recent-name").text(" by " + obj["name"]);
            $("#submission-loading").hide();
        }, 400)
        
        e.preventDefault();
    })

    // Load in most recent submission
    url = "https://script.google.com/macros/s/AKfycbyRluxeT6Jhcjo-i_kAuuKQMls6kRLxYsbtVBPT8AJjIBR6ZWqczJVI0DOHFbG8SXevWw/exec"
    $.get(url, j => {
        $("#submission-loading").hide();
        $("#most-recent-idea").text(j["idea"]);
        $("#most-recent-name").text(" by " + j["name"]);
    })

    // Animate on intersection
    let options = {
        root: document.querySelector('#scrollArea'),
        rootMargin: '80px',
        threshold: 1.0
    }
    var scrolled_in = false;
    let callback = entries => {
        entries.forEach((entry) => {
          // Each entry describes an intersection change for one observed
          // target element:
          //   entry.boundingClientRect
          //   entry.intersectionRatio
          //   entry.intersectionRect
          //   entry.isIntersecting
          if (entry.isIntersecting && !scrolled_in) {
            $("#submission-form").css("opacity", 1)
            $("#submission-form").addClass("animate__animated animate__bounceInLeft");
          }
          //   entry.rootBounds
          //   entry.target
          //   entry.time
        });
      };
    let observer = new IntersectionObserver(callback, options);
    observer.observe(document.querySelector("#submission-form"));

})

function updateScreen() {
    // console.log($(window).width())
    if ($(window).width() <= 801 || screen.width <= 801) {
        $('.row-main').removeClass('flex-nowrap');
    } else {
        $('.row-main').addClass('flex-nowrap');
    }
}