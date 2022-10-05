const img = document.getElementById('images');
// listin for the click event
let toggle= true 
img.addEventListener('click', function(){

    toggle= !toggle; 
    if(toggle){
      img.src='img\\Top10Countries_1990gdp_plot.png';
   // }elseif{
       // img.src='img\\Top10Countries_2000gdp_plot.png';
   // }elseif{
       // img.src='img\\Top10Countries_2010gdp_plot.png';
   // }elseif{
       // img.src='img\\Top10Countries_2020gdp_plot.png';
    }else{
        img.src= 'img\\Top10Countries_1990gdp_plot.png';
    }
})

