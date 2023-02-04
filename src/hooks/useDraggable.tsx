
////// Remember to place this in component: 

//     isTouchDevice();


let initialX = 0
let initialY = 0

let zIndex = 1
let zIndex0 = -1
let moveElement = false;
let reset = true

//Detect touch device
export const isTouchDevice = () => {
    try {
        //Try to create TouchEvent (fails for desktops and throws error)
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
}


export function start(e: TouchEvent | MouseEvent | PointerEvent | React.TouchEvent | React.MouseEvent | React.PointerEvent) {
    e.stopPropagation();
    if (!isTouchDevice()) e.preventDefault();

    initialX = !isTouchDevice() ? (e as PointerEvent).clientX : (e as TouchEvent).touches[0].clientX;
    initialY = !isTouchDevice() ? (e as PointerEvent).clientY : (e as TouchEvent).touches[0].clientY;

    moveElement = true;
    (e.target as HTMLElement).classList.add("drag");
    (e.target as HTMLElement).style.setProperty("z-index", `${zIndex}`);
    (e.target as HTMLElement).setAttribute("aria-grabbed", "true");
    //increase z-index
    zIndex += 1;
    (e.target as HTMLElement).focus()
}

//Handle mousemove and touchmove
export function movement(e: TouchEvent | MouseEvent | PointerEvent | React.TouchEvent | React.MouseEvent | React.PointerEvent) {
    e.stopPropagation()

    if (moveElement) {
        //e.preventDefault();
        let newX = !isTouchDevice() ? (e as PointerEvent).clientX : (e as TouchEvent).touches[0].clientX;
        let newY = !isTouchDevice() ? (e as PointerEvent).clientY : (e as TouchEvent).touches[0].clientY;
        (e.target as HTMLElement).style.top = (e.target as HTMLElement).offsetTop - (initialY - newY) + "px";
        (e.target as HTMLElement).style.left = (e.target as HTMLElement).offsetLeft - (initialX - newX) + "px";
        initialX = newX;
        initialY = newY;

        // getPosition(e.target as HTMLElement)
    }
}

//Handle mouse up and touch end, check for element overlap
export const stopMovementCheck = (e: TouchEvent | MouseEvent | PointerEvent | React.TouchEvent | React.MouseEvent | React.PointerEvent) => {

    e.stopPropagation()

    moveElement = false;
    (e.target as HTMLElement).classList.remove("drag");
    (e.target as HTMLElement).setAttribute("aria-grabbed", "false");
    //getPosition(e.target as HTMLElement);
    (e.target as HTMLElement).blur()
}

//Handle mouse leave
export const stopMoving = (e: MouseEvent | React.MouseEvent | PointerEvent | React.PointerEvent) => {

    e.stopPropagation()
    moveElement = false;
    (e.target as HTMLElement).classList.remove("drag");
    (e.target as HTMLElement).setAttribute("aria-grabbed", "false");
    //getPosition(e.target as HTMLElement);
    (e.target as HTMLElement).blur()
}

//on blob blur
export function blurred(draggable: HTMLElement) {
    draggable.classList.remove("drag");
    draggable.setAttribute("aria-grabbed", "false")
    //dragWrap.current?.setAttribute("aria-activedescendant", "")
    //getPosition(draggable)
}

//on focused blob
export function focused(draggable: HTMLElement) {
    draggable.classList.add("drag");
    draggable.setAttribute("aria-grabbed", "true");
    //dragUl0.current?.setAttribute("aria-activedescendant", `${draggable.id}`)
    // draggable.addEventListener('keydown', keyDown);
    return () => {
        // draggable.removeEventListener('keydown', keyDown);
        draggable.classList.remove("drag");
        draggable.setAttribute("aria-grabbed", "false")
        //dragWrap.current?.setAttribute("aria-activedescendant", "")
        // getPosition(draggable)
    }
}

//Mousewheel use
export function wheel(draggable: HTMLElement) {
    draggable.addEventListener('wheel', zoom, { passive: false });
    return () => {
        draggable.removeEventListener('wheel', zoom);
    }
}
export function zoom(e: WheelEvent) {
    //e.preventDefault();
    let value = (e.target as HTMLElement).style.getPropertyValue("--i");
    let scale = parseFloat(value)

    scale += e.deltaY * -0.005;
    // Restrict scale
    scale = Math.min(Math.max(2, scale), 10);
    // Apply
    (e.target as HTMLElement).style.setProperty('--i', `${scale}`)
    //increase z-index
    zIndex += 1;
}

// Keyboard use
export function keyDown(e: KeyboardEvent | React.KeyboardEvent<HTMLLIElement>, target: HTMLElement) {
    const movePx = 8;

    let value = (target).style.getPropertyValue("--i");
    let scale = parseFloat(value)

    let attrLeft = window.getComputedStyle(target).getPropertyValue("left");
    let attrTop = window.getComputedStyle(target).getPropertyValue("top");

    switch (e.key) {
        case 'ArrowLeft':
            e.preventDefault();
            (target).style.left = parseFloat(attrLeft) - Number(movePx) + "px";
            attrLeft = window.getComputedStyle(target).getPropertyValue("left");
            break;
        case 'ArrowRight':
            e.preventDefault();
            (target).style.left = parseFloat(attrLeft) + Number(movePx) + "px";
            attrLeft = window.getComputedStyle(target).getPropertyValue("left");
            break;
        case 'ArrowUp':
            e.preventDefault();
            (target).style.top = parseFloat(attrTop) - Number(movePx) + "px";
            attrTop = window.getComputedStyle(target).getPropertyValue("top");
            break;
        case 'ArrowDown':
            e.preventDefault();
            (target).style.top = parseFloat(attrTop) + Number(movePx) + "px";
            attrTop = window.getComputedStyle(target).getPropertyValue("top");
            break;
        case 'Escape':
            e.stopPropagation()
            e.preventDefault();
            (target).blur()
            break;
        case '0': //Move blob to the bottom of the z-index pile
            e.stopPropagation()
            e.preventDefault();
            if (reset) {
                reset = false;
                (target).style.setProperty("z-index", `${zIndex0}`)
                //Reset z-index
                zIndex0 -= 1;
                const cooldown = () => { reset = true }
                setTimeout(cooldown, 100);
            }
            break;
        case '1': //make blob smaller
            e.stopPropagation()
            e.preventDefault();
            if (reset) {
                reset = false;
                scale -= 1;
                scale = Math.min(Math.max(2, scale), 10);
                (target).style.setProperty('--i', `${scale}`)

                const cooldown = () => { reset = true }
                setTimeout(cooldown, 100);
            }
            break;
        case '2': //make blob larger
            e.stopPropagation()
            e.preventDefault();
            if (reset) {
                reset = false;
                scale += 1;
                scale = Math.min(Math.max(2, scale), 10);
                (target).style.setProperty('--i', `${scale}`)

                const cooldown = () => { reset = true }
                setTimeout(cooldown, 100);
            }
            break
        default:
            e.stopPropagation()
    }
}




// useEffect(() => {
//     // // Getting the width of the browser on load
//     widthResize()

//     window.addEventListener('resize', widthResize)

//     return () => {
//         window.removeEventListener('resize', widthResize)
//     }
// }, [])

// export const widthResize = () => {
//     //place these items every time the window is resized
//     if (makeLarger0.current && dragWrap.current) place(makeLarger0.current, 100 - ((makeLarger0.current.offsetWidth / dragWrap.current.offsetWidth) * 100), 0)

//     if (colorBlockYellowLime0.current && dragWrap.current) place(colorBlockYellowLime0.current, 100 - ((colorBlockYellowLime0.current.offsetWidth / dragWrap.current?.offsetWidth) * 100), 18)
//     if (colorBlockCyanYellow0.current && dragWrap.current) place(colorBlockCyanYellow0.current, 100 - ((colorBlockCyanYellow0.current.offsetWidth / dragWrap.current?.offsetWidth) * 100), 38)
//     if (colorBlockCyanPink0.current && dragWrap.current) place(colorBlockCyanPink0.current, 100 - ((colorBlockCyanPink0.current.offsetWidth / dragWrap.current?.offsetWidth) * 100), 58)
//     if (colorBlockPinkYellow0.current && dragWrap.current) place(colorBlockPinkYellow0.current, 100 - ((colorBlockPinkYellow0.current.offsetWidth / dragWrap.current?.offsetWidth) * 100), 78)

//     if (makeSmaller0.current && dragWrap.current) place(makeSmaller0.current, 100 - ((makeSmaller0.current.offsetWidth / dragWrap.current.offsetWidth) * 100), 95)
// }
// export function place(element: HTMLElement, x_pos: number, y_pos: number) {
//     if (element && dragWrap.current) {
//         element.style.left = dragWrap.current.offsetWidth / 100 * x_pos + 'px';
//         element.style.top = dragWrap.current.offsetHeight / 100 * y_pos + 'px';
//     }
// }


// export const getPosition = (draggable: HTMLElement) => {
//     const blobID = draggable.id
//     const blobNumber = draggable.id.replace(/^\D+/g, '')//replace non-numbers with empty
//     const blobI = window.getComputedStyle(draggable).getPropertyValue("--i");
//     const blobX = window.getComputedStyle(draggable).getPropertyValue("left");
//     const blobY = window.getComputedStyle(draggable).getPropertyValue("top");
//     const blobZ = window.getComputedStyle(draggable).getPropertyValue("z-index");
//     const blobColor1 = window.getComputedStyle(draggable).getPropertyValue("background");
//     const blobDisplay = window.getComputedStyle(draggable).getPropertyValue("display");

//     const blobDraggables: Draggable = {
//         id: blobID,
//         number: parseInt(blobNumber),
//         i: parseFloat(blobI),
//         x: blobX,
//         y: blobY,
//         z: blobZ,
//         display: blobDisplay,
//         ariaGrabbed: false,
//         draggable: true,
//         tabIndex: 0,
//         background: blobColor1
//     }

//     draggables[d][blobDraggables.number - 1] = blobDraggables
//     saveDraggables()
// }