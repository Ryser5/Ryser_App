var count = {
  addCount: function(){
    for (var i = 0; i < 10000; i++){
      i++;
      console.log(i);
    }
  }
}

count.addCount();
