/**
 * Created by Home on 4/25/2017.
 */

$(document).ready(function() {
    
    $("#search_text").keydown(function (e) {
        if (e.keyCode == 13) {
            var searchString = $("#search_text").val();
            if ($.trim(searchString) === "")
                return;
            $('.search_item').remove();
            $.ajax("/customer/api/search", {
                method: "GET",
                data: {keyword: searchString}
            }).success(function (res) {
                $("#search_text").val("");

                var resultList = "<ul class='search_item'>";
                res.forEach(function (customer) {
                    resultList +=
                        "<li id='" + customer.id + "'>" +
                        "   <a href='/customer?id=" + customer.id + "' target='right-frame'>" +
                        "       <span>" + customer.text + "</span>" +
                        "   </a>" +
                        "</li>";
                })
                resultList += "</ul>";

                $(".search-result-area").append(resultList);
            })
        }
    })
})