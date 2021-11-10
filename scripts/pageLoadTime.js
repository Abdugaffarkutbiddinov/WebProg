const findLoadTime = (function() {
    document.getElementsByClassName("load_time")[0].innerHTML = 'Page Load Time is: ' +
      (window.performance.timing.domContentLoadedEventEnd -
        window.performance.timing.navigationStart) + ' ms';
  });
  
  window.addEventListener('load', (event) => {
    findLoadTime();
  });
