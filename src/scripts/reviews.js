

// const reviewsAvatars = document.querySelector('.review__icons');

// reviewsAvatars.addEventListener('click', (e) =>{
//     e.preventDefault();

//     const target = e.target;
//     console.log('target', target);

//     if(target.classList.contains('review__icon')){
//         const activeListItem = document.querySelector('.review__icon--active');

//         if(activeListItem){
//             activeListItem.classList.remove('.review__icon--active')
//         }

//         const button = target.parentElement;
//         const listElemet = button.parentElement;
        
//     }
// });
const findBlock = (alias) =>{
    return $(".reviews__item").filter((ndx, item) => {
        return $(item).attr("data-linked") == alias
    });
};

$(".reviews__switcher-link").click(e =>{
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr("data-open");
    const itemToShow = findBlock(target);
    const curItem = $this.closest(".reviews__switcher-item");


    itemToShow.addClass("active").siblings().removeClass("active")
    curItem.addClass("active").siblings().removeClass("active");
})