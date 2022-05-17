function constant (duration, range, current) {
    return duration / range;
  }
  
  //Linear easing
  function linear (duration, range, current) {
    return ((duration * 2) / Math.pow(range, 2)) * current;
  }
  
  //Quadratic easing
  function quadratic (duration, range, current) {
    return ((duration * 3) / Math.pow(range, 3)) * Math.pow(current, 2);
  }
  
  function animateValue(id, start, duration, easing) {
    var end = parseInt(document.getElementById(id).textContent, 10);
    var range = end - start;
    var current = start;
    var increment = end > start? 1 : -1;
    var obj = document.getElementById(id);
    var startTime = new Date();
    var offset = 1;
    var remainderTime = 0;
    
    var step = function() {
      current += increment;
      obj.innerHTML = current;
      
      if (current != end) {
        setTimeout(step, easing(duration, range, current));
      }
      else {
        console.log('Easing: ', easing);
        console.log('Elapsed time: ', new Date() - startTime)
        console.log('');
      }
    };
    
    setTimeout(step, easing(duration, range, start));
  }