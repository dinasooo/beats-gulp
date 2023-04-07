const mesureWidth = item => {
    let reqItemWidth = 0;

    const screenWidth = $(window).width();
    const container = item.closest(".colors__list");
    const titlesBlocks = container.find(".colors__item-title");
    const titlesWidth = titlesBlocks.width() * titlesBlocks.length;

    const textContainer =item.find(".colors__item-container");
    const paddingLeft = parseInt(textContainer.css("padding-left"));
    const paddingRight = parseInt(textContainer.css("padding-right"));

    const isTablets = window.matchMedia('(max-width: 768px)').matches;
    const isMobile = window.matchMedia('(max-width: 480px)').matches;

    if(isTablets){
        reqItemWidth = screenWidth - titlesWidth;
    } 
    if(isMobile){
        reqItemWidth = screenWidth - titlesBlocks.width();
}
    
    if(!isTablets && !isMobile) {
        reqItemWidth=500;
    };

    return{
        container: reqItemWidth,
        textContainer: reqItemWidth - paddingRight -paddingLeft
    }
};

const closeEveryItemInContainer = container => {
    const items = container.find(".colors__item");
    const content = container.find(".colors__item-content");

    items.removeClass("active");
    content.width(0);
};

const openColorsItem = item => {
    const hiddenContent = item.find(".colors__item-content");
    const reqWidth = mesureWidth(item);
    const textBlock = item.find(".colors__item-container");

    item.addClass("active");
    hiddenContent.width(reqWidth.container);
    textBlock.width(reqWidth.textContainer);
};

$(".colors__item-title").on("click", e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const item = $this.closest(".colors__item");
    const itemOpend = item.hasClass("active");
    const container = $this.closest(".colors__list");

    if (itemOpend) {
        closeEveryItemInContainer(container);
    } else {
        closeEveryItemInContainer(container);
        openColorsItem(item);
    }
});

$(".colors__item-content").on("click", e =>{
    closeEveryItemInContainer($('.colors__list'));
})