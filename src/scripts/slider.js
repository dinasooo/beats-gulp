const slider = $(".slider__content").bxSlider({
    pager: false,
    controls: false,
});

$('.slider__link--prev').click(e =>{
    e.preventDefault();
    slider.goToPrevSlide();
})
$('.slider__link--next').click(e =>{
    e.preventDefault();
    slider.goToNextSlide();
})