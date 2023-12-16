document.addEventListener('DOMContentLoaded', function () {
    let iconCart = document.querySelector('.icon-cart');
    let closeBtn = document.querySelector('.Cartheader i');
    let body = document.querySelector('body');
    let overlay;
    let ListProductsHTML = document.querySelector('.cartList');
    let ItemAdd = document.querySelector('.add-to-cart');
   
  
    let ListCartHTML = document.querySelector('.cartList')
    let carts = [];
    let ListProducts = [];
    
    let profileIcon = document.querySelector('.accountIcon')

    if (profileIcon) {
      profileIcon.addEventListener('click', () => {


        
        alert("YOU CLICKED ME");

        

      });
    }

    const addDataToHTML = () => {
      ListProductsHTML.innerHTML = '';
      if (ListProducts.length > 0){
        ListProducts.forEach(product => {
          let newProduct = document.createElement('div');
          newProduct.classList.add('item');
          newProduct.dataset.id = product.id;
          newProduct.innerHTML = `
            <div class="item">
                <div class="image">
                <img src="${product.image}" alt="">
                </div>
                <div class="itemInfo">
                    <h1>${product.name}</h1>
                    <div class="metaHeading">
                        <p class="Item-Variant">Bone / Large</p>
                        <div class="itemPricelist">
                            <span class="item-price-price">${product.price}</span>
                        </div>
                    </div>

                    <div class="qtySelctor">
                        <ul>-</ul>
                        <ul>2</ul>
                        <ul>+</ul>
                    </div>
                </div>
            </div>
        `;
          ListProductsHTML.appendChild(newProduct);
        })
      }
    }



    // adds items to cart.

    const addToCart = (product_id) => {
      let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    
      if (carts.length <= 0) {
        carts = [{
          product_id: product_id,
          quantity: 1
        }];
        console.log(carts);
      } else if (positionThisProductInCart < 0) {
        carts.push({
          product_id: product_id,
          quantity: 1
        });
      } else {
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
      }
      addCartToHTML();
      console.log(carts)
    };

    const addCartToHTML = () => {
      ListCartHTML.innerHTML = '';
      if (carts.length > 0) {
        carts.forEach(cart => {
          let product = ListProducts.find(p => p.id == cart.product_id);
    
          if (product) {
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.innerHTML = `
              <div class="item">
                <div class="image">
                  <img src="${product.image}" alt="">
                </div>
                <div class="itemInfo">
                  <h1>${product.name}</h1>
                  <div class="metaHeading">
                    <p class="Item-Variant">${product.variant}</p>
                    <div class="itemPricelist">
                      <span class="item-price-price">${product.price}</span>
                    </div>
                  </div>
                  <div class="qtySelctor">
                    <ul>-</ul>
                    <ul>${cart.quantity}</ul>
                    <ul>+</ul>
                  </div>
                </div>
              </div>
            `;
            ListCartHTML.appendChild(newCart);
          }
        });
      }
    };
    

  
    const buttons = document.querySelectorAll("[data-carousel-button]")

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1
        const slides = button
          .closest("[data-carousel]")
          .querySelector("[data-slides]")
    
        const activeSlide = slides.querySelector("[data-active]")
        let newIndex = [...slides.children].indexOf(activeSlide) + offset
        if (newIndex < 0) newIndex = slides.children.length - 1
        if (newIndex >= slides.children.length) newIndex = 0
    
        slides.children[newIndex].dataset.active = true
        delete activeSlide.dataset.active
      })
    })

    iconCart.addEventListener('click', openOverlay);
    closeBtn.addEventListener('click', toggleOverlay);
  
    function openOverlay() {
      overlay = document.createElement('div');
      overlay.classList.add('overlay', 'addOverlay');
      document.body.appendChild(overlay);
  
      // Add a delay before adding the event listener to ensure transition is properly applied
      setTimeout(() => {
        document.addEventListener('click', checkOverlayClick);
      }, 0);
  
      body.classList.add('showCart');
    }
  
    function toggleOverlay(event) {
      if (event && event.stopPropagation) {
        event.stopPropagation();
      }
  
      if (overlay) {
        overlay.classList.remove('addOverlay');
        document.removeEventListener('click', checkOverlayClick);
        overlay.addEventListener('transitionend', removeOverlay, { once: true });
      }
  
      body.classList.toggle('showCart');
    }
  
    function checkOverlayClick(event) {
      if (body.classList.contains('showCart') && overlay && overlay.contains(event.target)) {
        toggleOverlay();
      }
    }
  
    function removeOverlay() {
      if (overlay) {
        overlay.remove();
        overlay = null;
      }
    }
  });
  