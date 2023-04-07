
const openItem = item => {
    const container = item .closest(".crew__item");
    const contentBlock = container.find(".crew__info");
    const textBlock = contentBlock.find(".crew__info-block");
    const reqHeight = textBlock.height();


    container.addClass("active")
    contentBlock.height(reqHeight);
}

const close = container =>{
    const items = container.find('.crew__info');
    const itemContainer = container.find(".crew__item");

    itemContainer.removeClass("active");
    items.height(0);
}

$('.crew__button').click(e =>{
    const $this = $(e.currentTarget);
    const container = $this.closest(".crew");
    const elemContainer = $this.closest(".crew__item");

    if(elemContainer.hasClass("active")){
        close(container);
    } else {
        close(container);
        openItem($this); 
    }
})