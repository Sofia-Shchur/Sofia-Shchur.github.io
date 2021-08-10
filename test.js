
if(window.location.href.indexOf("sozdat-otkrytku") >= 0){
  $(".post-content").removeClass("kg-canvas");
  var $_GET = [];
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (a, name, value) {
    $_GET[name] = value;
   });
 
   console.log("message " + typeof $_GET['message']); 
 
  console.log("we understand what is the special card page")
  
}else{
  $(".post-content").append("<div id='titleAb'></div>");
  writePhrase('test', 'titleAb', 20);
 
}
/*

window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (a, name, value) {
setTimeout(function(){
  console.log(1);
  var $_GET = [];

  
  
  
  if (typeof $_GET['mode'] !== 'undefined' && $_GET['mode']) {
    
    
  }

//get the 'index' query parameter
if (typeof $_GET['color'] !== 'undefined') {
  

  console.log('new');
console.log($_GET['color'])
  $("#myABC").html("<b>" + $_GET['color'] + "</b> <i>123</i>")
}
  
  $(".search-field").css( "border", "4px dotted green");
  
  console.log(letterA);}, 5000);
  */

