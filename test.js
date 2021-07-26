setTimeout(function(){
  console.log(1);
  var $_GET = [];
window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (a, name, value) {
    $_GET[name] = value;
});

//get the 'index' query parameter
if (typeof $_GET['color'] !== 'undefined') {
  console.log('new');
console.log($_GET['color'])
  $("#myABC").html("<b>" + $_GET['color'] + "</b> <i>123</i>")
}
  
  $(".search-field").css( "border", "4px dotted green");
  console.log(letterA);}, 5000);

