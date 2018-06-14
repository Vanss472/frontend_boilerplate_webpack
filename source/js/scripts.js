import '../css/styles.scss';

console.log('fired');

// accessibility
document.addEventListener('keydown', function(e){
  if(e.keyCode === 9) {
    document.body.classList.add('user-is-tabbing');
  }
});

document.addEventListener('mousedown', function(e){
  document.body.classList.remove('user-is-tabbing');
});
