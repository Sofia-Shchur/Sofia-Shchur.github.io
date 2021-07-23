setTimeout(function(){
  console.log(1);
  var $_GET = [];
window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (a, name, value) {
    $_GET[name] = value;
});

//get the 'index' query parameter
if (typeof $_GET['color'] !== 'undefined') {
console.log($_GET['color'])
  $("#myABC").html($_GET['color'])
}
  
  $(".search-field").css( "border", "4px dotted green");
  console.log(letterA);}, 5000);
