const runTests = async () => {
    console.log(listItemTest());
    console.log(await consumeAPITest())
    console.log(carouselUITest())
    console.log(rotateCarouselTest())
}

const listItemTest = () => {
    let msg = 'listItem failed'
    let item = {
        hero: { href: 'test html' },
        name: 'test name',
        priceRange: { selling: { high: '123' } },
        images: ['a', 'b', 'c']
    }
    answer = `<div onClick = 'getItem(["a","b","c"])'class = 'menuCard'><img  src = 'test html'><div class = 'price'>$123</div><div class = 'desc descOverlay'>test name</div></div>`
    result = JSON.stringify(listItem(item));
    answer = JSON.stringify(answer)

    if (result === answer) {
        msg = 'listItem passed'
    } else {
        msg = 'listItem unexpected returns'
    }

    if (!result) {
        msg = 'listItem cannot be empty'
    }
    return msg
}

const consumeAPITest = async () => {
    let msg = 'consumeAPITest failed'
    let uri = '\index.json'
    let option = {
        method: 'get'
    }
    result = await consumeAPI(uri, option)
    if (!result) {
        msg = 'consumeAPI cannot be empty'
    }

    if (result.constructor === {}.constructor) {
        msg = 'consumeAPI returned an object,'
    }

    uri = 'fail'
    result = await consumeAPI(uri, option)

    if (result) {
        msg += 'error check works'
    } else {
        msg += 'error check not working'
    }

    return msg
}

const carouselUITest = () => {
    let active = 1
    let images = [1, 2]
    let msg = 'carouselUI failed'
    let expected = `<div class = 'carouselUIContainer'><span class ='selector' onClick = 'changeCarouselImage([1,2], 0)'></span><span class ='selectorActive' onClick = 'changeCarouselImage([1,2], 1)'></span></div>
    <span class = 'carouselLeft' onClick = 'rotateCarousel(true,1,[1,2])'>L</span>
    <span class = 'carouselRight' onClick = 'rotateCarousel(false,1,[1,2])'>R</span>`

    result = carouselUI(images, active)
    if (result === expected) {
        msg = 'carouselUI passed'
    }

    if (!result) {
        msg = 'carouselUI cannot be empty'
    }
    return msg
}

const rotateCarouselTest = () => {
    let msg = 'rotateCarousel failed'
    let dir = true;
    let active = 1;
    let images = [1, 2, 3];

    resultLeft = rotateCarousel(dir, active, images)
    resultRight = rotateCarousel(!dir, active, images)

    if (!result) {
        msg = 'rotateCarousel cannot be empty'
    }

    if (resultLeft.active === 0) {
        msg = 'rotateCarousel goes left'
    } else {
        msg = 'rotateCarousel does not go left'
    }

    if (resultRight.active === 2) {
        msg += ' and it goes right'
    } else {
        msg += ' but it does not right'
    }

    return msg
}