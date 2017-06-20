document.body.onload = function(){
  var count = 2;
  setInterval(function(){
    var picN = count + ".jpg";
    console.log(picN);
    document.getElementsByClassName('backimg')[0].style.background = "url("+picN+")";
    document.getElementsByClassName('backimg')[0].style.backgroundSize = "cover";
    // document.getElementsByClassName("backimg")[0].stlye.animation = "5s myfirst infinite";
    if (count<3){
      count++;
    }
    else{
        count = 1;
    }
  },2000);
}
