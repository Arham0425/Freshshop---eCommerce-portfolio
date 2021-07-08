// =================
// HUMBERGER MENU
// =================
const toggleBtn = document.querySelector('.toggle-btn');
const menu = document.querySelector('.menu');

// click event 
toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('show-menu');
})

// ================
// DROPDOWN MENU
// ================
const dropdownContainer = document.querySelector('.hamburger-dropdown-container');
const dropdownContent = document.querySelector('.hamburger-dropdown-content');

// click event
dropdownContainer.addEventListener('click', () => {
    dropdownContent.classList.toggle('show-dropdown');
})

// ===================
// SEARCHING OPTION 
// ===================
const searchBtn = document.getElementById('search');
const hamburgerSearchBtn = document.getElementById('hamburger-search');
const removeBtn = document.getElementById('remove');
const searchBar = document.querySelector('.search-option');

// click event 
searchBtn.addEventListener('click', () => {
    addBar();
})

hamburgerSearchBtn.addEventListener('click', () => {
    addBar();
})

// remove search bar
removeBtn.addEventListener('click', () => {
    removeBar();
})

// add function 
function addBar() {
    if (!searchBar.classList.contains('show-search-option')) {
        searchBar.classList.add('show-search-option');
    } else {
        removeBar();
    }
}

// remove function
function removeBar() {
    searchBar.classList.remove('show-search-option');
    const textBar = searchBar.querySelector('input');
    textBar.value = '';
}

// ================
// CART
// ================
const showCart = document.querySelector('.cart-notification');
const hamburgerShowCart = document.querySelector('.hamburger-cart-notification');
const removeCart = document.querySelector('.cart-remove');
const cart = document.querySelector('.cart');

// show 
showCart.addEventListener('click', () => {
    cart.classList.add('show-cart');
})

hamburgerShowCart.addEventListener('click', () => {
    cart.classList.add('show-cart');
})

// remove 
removeCart.addEventListener('click', () => {
    cart.classList.remove('show-cart');
})

// =================
// HEADER CAROUSEL 
// =================
const headerCarousel = document.querySelector('#header-carousel');
const headerLeft = document.getElementById('header-left');
const headerRight = document.getElementById('header-right');
const headerIndicator = document.querySelectorAll('.header-indicator');
let count = 0;
const imgClass = ['backgroun-1', 'background-2', 'background-3']

// carousel left button
headerLeft.addEventListener('click', () => {
    count--
    if (count < 0) {
        count = imgClass.length - 1;
        removeHeaderClass();
        headerCarousel.classList.add(imgClass[count]);
    } else {
        removeHeaderClass();
        headerCarousel.classList.add(imgClass[count]);
    }
    
})

// carousel right button
headerRight.addEventListener('click', () => {
    addBackgroundRight();
})

// background setinterval
setInterval(addBackgroundRight, 3000)

// add background
function addBackgroundRight() {
    count++
    if (count >= imgClass.length) {
        count = 0;
        removeHeaderClass();
        headerCarousel.classList.add(imgClass[count]);
        activeIndicator(count);
    } else {
        activeIndicator(count)
        removeHeaderClass();
        headerCarousel.classList.add(imgClass[count]);
    }
}

// remove header carousel  class
function removeHeaderClass() {
    headerCarousel.classList.remove('background-1', 'background-2', 'background-3');
}

// header carousel indicator

// active indicator 
function activeIndicator(count) {
    headerIndicator.forEach((item) => {
        if (item.dataset.id === imgClass[count]) {
            item.classList.add('active');
        } else {
            item.classList.remove('active')
        }
    });
}

headerIndicator.forEach((item) => {
    item.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        removeHeaderClass();
        removeActiveClass();
        e.target.classList.add('active');
        headerCarousel.classList.add(id);
    })
})

// remove active class

function removeActiveClass() {
    headerIndicator.forEach((item) => {
        item.classList.remove('active');
    })
}

// ===============
// TAB
// ===============
const menuItems = [
    {
        id: 1,
        title: 'Best-Seller',
        img: 'images/img-pro-01.jpg',
        desc: 'Lorem ipsum dolor sit amet',
        price: '$7.79',
        badge: 'sale'
    },
    {
        id: 2,
        title: 'Top-featured',
        img: 'images/img-pro-02.jpg',
        desc: 'Lorem ipsum dolor sit amet',
        price: '$9.79',
        badge: 'new'
    },
    {
        id: 3,
        title: 'Top-featured',
        img: 'images/img-pro-03.jpg',
        desc: 'Lorem ipsum dolor sit amet',
        price: '$10.79',
        badge: 'sale'
    },
    {
        id: 4,
        title: 'Best-Seller',
        img: 'images/img-pro-04.jpg',
        desc: 'Lorem ipsum dolor sit amet',
        price: '$15.79',
        badge: 'sale'
    }
];
const fruitsCards = document.querySelector('.fruits-card');
const btnContainer = document.querySelector('.fruits-btn');

window.addEventListener('DOMContentLoaded', () => {
    // display all item 
    displayAllItem(menuItems);

    // filter items
    filterItem(menuItems);
})

// display all item  
function displayAllItem(menuItems) {
    const menu = menuItems.map((item) => {
        const {
            id,
            title,
            img,
            desc,
            price,
            badge
        } = item;
        return `<div class="fruit-single-card">
                 <div class="fruit-img">
                    <img src=${img} alt=${title}>
                    <div class="blur-box">
                       <div class="blur-left">
                          <button class="btn add-cart" data-id=${id}>Add to Cart</button>
                       </div>
                       <div class="blur-right">
                          <button class="btn view-btn">
                             <i class="fas fa-eye"></i>
                             <span class="btn view">View</span>
                          </button>
                          <button class="btn compare-btn">
                             <i class="fas fa-sync-alt"></i>
                             <span class="btn compare">Compare</span>
                          </button>
                          <button class="btn wishlist-btn">
                             <i class="far fa-heart"></i>
                             <span class="btn wishlist">Add to Wishlist</span>
                          </button>
                       </div>
                    </div>
                 </div>
                 <p>${desc}</p>
                 <span class="price">${price}</span>
                 <div class="badge">${badge}</div>
              </div>`
    }).join('');
    fruitsCards.innerHTML = menu;

    // ==============
    // ADD TO CART
    // ==============
    const addCartBtn = fruitsCards.querySelectorAll('.add-cart');
    addCartBtn.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const id = Number(e.target.dataset.id);
            const filteredCartItem = menuItems.reduce((value, item) => {
                if (item.id === id) {
                    value.push(item, ...value)
                }
                return value;
            }, [])
            console.log(filteredCartItem)
        })
    })
}

// filter items
function filterItem(menuItems) {
    const titles = menuItems.reduce((values, item) => {
        if (!values.includes(item.title)) {
            values.push(item.title);
        }
        return values
    }, ['All'])

    btns = titles.map((title) => {
        return `<button class="btn" data-id=${title}>${title}</button>`
    }).join('');

    btnContainer.innerHTML = btns;
    const fruitsBtns = btnContainer.querySelectorAll('.fruits-btn .btn');
    fruitsBtns[0].classList.add('active')
    fruitsBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            const filterItem = menuItems.filter((item) => {
                return item.title === id
            })
            if (id === 'All') {
                displayAllItem(menuItems)
            } else {
                displayAllItem(filterItem);
            }
            removeFruitsClass();
            e.target.classList.add('active');
        })
    })

    // remove active class    
    function removeFruitsClass() {
        fruitsBtns.forEach((btn) => {
            btn.classList.remove('active');
        })
    }
}

// =================
// ADD CART
// =================
const notification = document.getElementById('notification');
const cartHeader = document.querySelector('.cart-header');















    
    
    

    







