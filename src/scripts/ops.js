const section = $("section");
const display = $(".maincontent");
const sideMenu = $(".fixed-menu");
const menuItems = sideMenu.find(".fixed-menu__item");
const activeClass = "active";

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

let inScroll = false;

section.first().addClass("active");

const countSectionPosition = (sectionEq) => {
    const position = sectionEq * -100;
    if (isNaN(position)) {
        console.error("передано неверное значение в countSectionPosition");
        return 0;
    }

    return position;
};

const resetActiveClassForItem = (items, itemEq, activeClass) => {
    items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
};

const performeTransition = (sectionEq) => {
    if (inScroll) return;

    // const transitionOver = 1000;
    // const mouseInertionOver = 300;

    inScroll = true;
    const position = countSectionPosition(sectionEq);

    display.css({
        transform: `translateY(${position}%)`,
    });

    resetActiveClassForItem(section, sectionEq, "active");

    setTimeout(() => {
        inScroll = false;
        resetActiveClassForItem(menuItems, sectionEq, "fixed-menu__item--active");
     }, 800);
     
    //  transitionOver + mouseInertionOver);
};

const viewportScroller = () => {
    const activeSection = section.filter(".active");
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    return {
        next() {
            if (nextSection.length) {
                performeTransition(nextSection.index());
            }
        },
        prev() {
            if (prevSection.length) {
                performeTransition(prevSection.index());
            }
        },
    };
};

$(window).on("wheel", e => {
    const deltaY = e.originalEvent.deltaY;
    const scroller = viewportScroller();

    if (deltaY > 0) {
        scroller.next();
    }

    if (deltaY < 0) {
        scroller.prev();
    }
});

$(window).on("keydown", e => {
    const tagName = e.target.tagName.toLowerCase();
    const userTypingInputs = tagName == "input" || tagName == "textarea";
    const scroller = viewportScroller();

    if (userTypingInputs) return;

    switch (e.keyCode) {
        case 38:
            scroller.prev();
            break;

        case 40:
            scroller.next();
            break;
    }
});

$(".wrapper").on("touchmove", e => e.preventDefault());

$("[data-scroll-to]").click((e) => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr("data-scroll-to");
    const reqSection = $(`[data-section-id=${target}]`);

    performeTransition(reqSection.index());
});

if (isMobile) {
    // https://github.com/mattbryson/TouchSwipe-Jquery-Plugin?ysclid=lg0xc6tbvd653738197

    $("body").swipe({
        swipe: function (event, direction) {
            const scroller = viewportScroller();
            let scrollDirection = "";

            if (direction == "up") scrollDirection = "next";
            if (direction == "down") scrollDirection = "prev";
            if(!scrollDirection) return;

            scroller[scrollDirection]();
        },
    });
};


