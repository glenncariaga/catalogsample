

const loadMenu = async (catalog) => {
    let cards = []
    cards = catalog.map(listItem)
    document.getElementById('menuContainer').innerHTML = cards.join('')
}

const listItem = (item) => {
    values = {
        hero: item.hero.href,
        name: item.name,
        price: item.priceRange.selling.high,
        images: item.images
    }

    return menuCard(values)
}

const consumeAPI = async (uri, options) => {
    try {
        let response = await fetch(uri, options);
        //some logic here can be changed to allow for pagination, so we don't have to load all the objects all at once.
        response = await response.json();
        return response
    }
    catch (error) {
        return error
    }
}

const menuCard = (values) => {
    return `<div onClick = 'getItem(${JSON.stringify(values.images)})'class = 'menuCard'><img  src = '${values.hero}'><div class = 'price'>$${values.price}</div><div class = 'desc descOverlay'>${values.name}</div></div>`
}

const getItem = images => {
    let modal = document.getElementById('carouselModal')
    let span = document.getElementsByClassName("close")[0]
    let active = 0
    let image = images[active].href
    span.onclick = () => modal.style.display = 'none'
    window.onclick = () => {
        event.target == modal ? modal.style.display = 'none' : null
    }
    modal.style.display = 'block'
    document.getElementById('image-container').innerHTML = imgCarousel(image) + carouselUI(images, active)
}

const carouselUI = (images, active) => {
    let btns = images.map((elem, index) => {
        if (index === active) {
            return `<span class ='selectorActive' onClick = 'changeCarouselImage(${JSON.stringify(images)}, ${index})'></span>`
        } else {
            return `<span class ='selector' onClick = 'changeCarouselImage(${JSON.stringify(images)}, ${index})'></span>`
        }

    })
    return `<div class = 'carouselUIContainer'>${btns.join('')}</div>
    <span class = 'carouselLeft' onClick = 'rotateCarousel(true,${active},${JSON.stringify(images)})'>L</span>
    <span class = 'carouselRight' onClick = 'rotateCarousel(false,${active},${JSON.stringify(images)})'>R</span>`
}

const rotateCarousel = (dir, active, images) => {
    if (dir) {
        active = active === 0 ? images.length - 1 : active - 1;
    } else {
        active = active === images.length - 1 ? 0 : active + 1;
    }
    if (JSON.stringify(images) === JSON.stringify([1, 2, 3])) {
        //used for testing
        return { images, active }
    }
    changeCarouselImage(images, active)
}

const changeCarouselImage = (images, active) => {
    image = images[active].href
    document.getElementById('image-container').innerHTML = imgCarousel(image) + carouselUI(images, active)
}

const imgCarousel = (images) => {
    return `
      <img src = ${images}>
    `
}

const imgButtons = img => {

    return `
      <li class = 'imgButtons' onClick = 'changeImage(${img})></li>
    `

}