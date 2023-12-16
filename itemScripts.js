document.addEventListener('DOMContentLoaded', function () {

  // variables

    let iconCart = document.querySelector('.icon-cart');
    let closeBtn = document.querySelector('.Cartheader i');
    let body = document.querySelector('body');
    let overlay;
    let ListProductsHTML = document.querySelector('.cartList');
    let ItemAdd = document.querySelector('.add-to-cart');
   
  
    let ListCartHTML = document.querySelector('.cartList');
    let carts = [];
    let ListProducts = [];

    let profileIcon = document.querySelector('.accountIcon');

    if (profileIcon) {
      profileIcon.addEventListener('click', () => {


        console.log("you clicked the profile icon.")

        

      });
    }

  // Adjust to product Id Section

    const addDataToHTML = () => {
      console.log('Adds html of items');
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
                           <span class="item-price-price">${product.currency} ${product.price}</span>
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
          console.log("finished adding item to cart.");
          ListProductsHTML.appendChild(newProduct);
        })
      }
    }

    // End of Adjust to product Id Section

    // Add to Cart Function Section

    ItemAdd.addEventListener('click', (event) => {
      let positionClick = event.target;
      if (positionClick.classList.contains('add-to-cart')) {
        let product_id = positionClick.parentElement.dataset.id;
         
        addToCart(product_id);

      }
    });  

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
      addCartToMemory();
      console.log(carts)
    };

    // End of Add to Cart Function Section

    const addCartToMemory = () => {
      localStorage.setItem('cart', JSON.stringify(carts));
    }

    // Add to Cart HTML Section

    const addCartToHTML = () => {
      console.log('adds items to cart');
      ListCartHTML.innerHTML = '';
      console.log('before calc func');
      calculateTotalAmount();
      console.log('after calc func');
      if (carts.length > 0) {
        carts.forEach(cart => {
          let product = ListProducts.find(p => p.id == cart.product_id);
    
          if (product) {
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cart.product_id;
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
                      <span class="item-price-price">₱ ${product.price}</span>
                    </div>
                  </div>
                  <div class="qtySelctor">
                    <button class="minus">-</button>
                    <ul>${cart.quantity}</ul>
                    <button class="add"> + </button>
                    <p class="removeBTN" > Remove </p>
                  </div>
                </div>
              </div>
            `;
            console.log('Finished adding to cart.');
            ListCartHTML.appendChild(newCart);
          }
        });
         // Display the total amount in the HTML
         let totalSection = document.querySelector('.totalSection');
         totalSection.textContent = `Total: ₱${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      }
    };

    // End of Add to Cart HTML Section

    let totalAmount = 0; // Initialize the total amount

    function calculateTotalAmount() {
      totalAmount = 0;
      carts.forEach(cart => {
        const product = ListProducts.find(p => p.id == cart.product_id);
        if (product) {
          totalAmount += cart.quantity * parseFloat(product.price); // Assuming price is a string, convert it to a number
        }
      });
    }

    ListCartHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if (positionClick.classList.contains('minus') || positionClick.classList.contains('add')) {
            let product_id = positionClick.parentElement.parentElement.parentElement.parentElement.dataset.id;
            console.log([product_id]);
            let type = 'minus';
            if(positionClick.classList.contains('add')){
                type = 'add';
            }
            changeQuantityCart(product_id, type);
        }
    })
    
    const changeQuantityCart = (product_id, type) => {
        let positionItemInCart = carts.findIndex((value) => value.product_id == product_id);
        if (positionItemInCart >= 0) {
            switch (type) {
                case 'add':
                    carts[positionItemInCart].quantity = carts[positionItemInCart].quantity + 1;
                    break;
                case 'remove':
                    // Remove the entire item from the cart
                    carts.splice(positionItemInCart, 1);
                    break;
                default:
                    let valueChange = carts[positionItemInCart].quantity - 1;
                    if (valueChange > 0) {
                        carts[positionItemInCart].quantity = valueChange;
                    } else {
                        carts.splice(positionItemInCart, 1);
                    }
                    break;
            }
        }
        addCartToMemory();
        addCartToHTML();
    }
    
    ListCartHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if (positionClick.classList.contains('removeBTN')) {
            let product_id = positionClick.parentElement.parentElement.parentElement.parentElement.dataset.id;
            console.log([product_id]);
    
            let type = 'remove';
            changeQuantityCart(product_id, type);
        } else if (positionClick.classList.contains('add')) {
            let product_id = positionClick.parentElement.parentElement.dataset.id;
            let type = 'add';
            changeQuantityCart(product_id, type);
        } else if (positionClick.classList.contains('minus')) {
            let product_id = positionClick.parentElement.parentElement.dataset.id;
            let type = 'minus';
            changeQuantityCart(product_id, type);
        }
    });
    

    
    const initApp = () => {
      // get data from json.
      fetch('homePrac.json')
      .then(response => response.json())
      .then(data => {
        ListProducts = data;
       // to show data ahead of time addDataToHTML();
        console.log(ListProducts);
      
        addDataToHTML();

        if(localStorage.getItem('cart')){
          carts = JSON.parse(localStorage.getItem('cart'));
          addCartToHTML();
        }

      })
    }
    initApp();

    // Carousel Section

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

    // End of Carousel Section

    // Shadow Overlay Section

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

  // End of Shadow Overlay Section

  // Variant Picker Section


  // Colors:
  let grayB = document.querySelector('.grayBox');
  let blackB = document.querySelector('.blackBox');
  let greenB = document.querySelector('.fgreenBox')
  let creamB = document.querySelector('.beigeBox')
  let whiteB = document.querySelector('.whiteBox');

  // Sizes:
  let sizeS = document.querySelector('.small');
  let sizeM = document.querySelector('.medium');
  let sizeL = document.querySelector('.large');
  let sizeXL = document.querySelector('.xl');
  let sizeXXL = document.querySelector('.xxl');

  let itemId= document.querySelector('.add-to-cart_header')

  // Change to Different Sizes

// Color Gray

  function changeToGS() {
    itemId.setAttribute('data-id', 'icsgs');
    console.log("changing data Id.")
  }

  function changeToGM() {
    itemId.setAttribute('data-id', 'icsgm');
    console.log("changing data Id.")
  }

  function changeToGL() {
    itemId.setAttribute('data-id', 'icsgl');
    console.log("changing data Id.")
  }

  function changeToGXL() {
    itemId.setAttribute('data-id', 'icsgxl')
  }

  function changeToGXXL() {
    itemId.setAttribute('data-id', 'icsgxxl')
  }

// Color Black

function changeToBS() {
  itemId.setAttribute('data-id', 'icsbs');
  console.log("changing data Id.")
}

function changeToBM() {
  itemId.setAttribute('data-id', 'icsbm');
  console.log("changing data Id.")
}

function changeToBL() {
  itemId.setAttribute('data-id', 'icsbl');
  console.log("changing data Id.")
}

function changeToBXL() {
  itemId.setAttribute('data-id', 'icsbxl')
}

function changeToBXXL() {
  itemId.setAttribute('data-id', 'icsbxxl')
}

// Color Green

function changeToGRS() {
  itemId.setAttribute('data-id', 'icsgrs');
  console.log("changing data Id.")
}

function changeToGRM() {
  itemId.setAttribute('data-id', 'icsgrm');
  console.log("changing data Id.")
}

function changeToGRL() {
  itemId.setAttribute('data-id', 'icsgrl');
  console.log("changing data Id.")
}

function changeToGRXL() {
  itemId.setAttribute('data-id', 'icsgrxl')
}

function changeToGRXXL() {
  itemId.setAttribute('data-id', 'icsgrxxl')
}

// Color Cream

function changeToCS() {
    itemId.setAttribute('data-id', 'icscs')
    console.log("changing data Id.")
}

function changeToCM() {
    itemId.setAttribute('data-id', 'icscm')
}

function changeToCL() {
    itemId.setAttribute('data-id', 'icscl')
}

function changeToCXL() {
    itemId.setAttribute('data-id', 'icscxl')
}

function changeToCXXL() {
    itemId.setAttribute('data-id', 'icscxxl')
}

// Color White

function changeToWS() {
    itemId.setAttribute('data-id', 'icsws')
    console.log("changing data Id.")
}

function changeToWM() {
    itemId.setAttribute('data-id', 'icswm')
}

function changeToWL() {
    itemId.setAttribute('data-id', 'icswl')
}

function changeToWXL() {
    itemId.setAttribute('data-id', 'icswxl')
}

function changeToWXXL() {
    itemId.setAttribute('data-id', 'icswxxl')
}

// Color Click Listener

  function getColorGray() {
    grayB.addEventListener('click', function() {
      removeColorSelectedStatus();
      grayB.classList.toggle('SELECTED');
      console.log(grayB); 
      checkSelection(); 
    })
  } 

  function getColorBlack() {
    blackB.addEventListener('click', function() {
      removeColorSelectedStatus();
      blackB.classList.toggle('SELECTED');
      console.log(blackB); 
      checkSelection(); 
    })
  } 

  function getColorGreen() {
    greenB.addEventListener('click', function() {
      removeColorSelectedStatus();
      greenB.classList.toggle('SELECTED');
      console.log(greenB); 
      checkSelection(); 
    })
  } 

  function getColorCream() {
    creamB.addEventListener('click', function() {
      removeColorSelectedStatus();
      creamB.classList.toggle('SELECTED');
      console.log(creamB);
      checkSelection();
    })
  } 

  function getColorWhite() {
    whiteB.addEventListener('click', function() {
      removeColorSelectedStatus();
      whiteB.classList.toggle('SELECTED');
      console.log(whiteB);
      checkSelection();
    })
  } 

  // Size Click Listener

  function getSizeS() {
    sizeS.addEventListener('click', function() {
      removeSizeSelectedStatus();
      sizeS.classList.toggle('SELECTED');
      console.log(sizeS);
      checkSelection();
    });
  }

  function getSizeM() {
    sizeM.addEventListener('click', function() {
      removeSizeSelectedStatus();
      sizeM.classList.toggle('SELECTED');
      console.log(sizeM);
      checkSelection();
    })
  }

  function getSizeL() {
    sizeL.addEventListener('click', function() {
      removeSizeSelectedStatus();
      sizeL.classList.toggle('SELECTED');
      console.log(sizeL);
      checkSelection();
    })
  }

  function getSizeXL() {
    sizeXL.addEventListener('click', function() {
      removeSizeSelectedStatus();
      sizeXL.classList.toggle('SELECTED');
      console.log(sizeXL);
      checkSelection();
    })
  }

  function getSizeXXL() {
    sizeXXL.addEventListener('click', function() {
      removeSizeSelectedStatus();
      sizeXXL.classList.toggle('SELECTED');
      console.log(sizeXXL);
      checkSelection();
    })
  }

  //Remove Color Selected Status

  function removeColorSelectedStatus() {
    // Remove selected status for all elements
    grayB.classList.remove('SELECTED');
    blackB.classList.remove('SELECTED');
    greenB.classList.remove('SELECTED');
    creamB.classList.remove('SELECTED');
    whiteB.classList.remove('SELECTED');
  }

  // Remove Size Selected Status 

  function removeSizeSelectedStatus() {
    sizeS.classList.remove('SELECTED');
    sizeM.classList.remove('SELECTED');
    sizeL.classList.remove('SELECTED');
    sizeXL.classList.remove('SELECTED');
    sizeXXL.classList.remove('SELECTED');
  }

  // Change Product Id

  function checkSelection() {

    // Gray Color Check

    if (grayB.classList.contains('SELECTED') && sizeS.classList.contains('SELECTED')) {
      changeToGS(); 
    }

    if(grayB.classList.contains('SELECTED') && sizeM.classList.contains('SELECTED')) {
      changeToGM();
    } 

    if(grayB.classList.contains('SELECTED') && sizeL.classList.contains('SELECTED')) {
      changeToGL();
    } 

    if(grayB.classList.contains('SELECTED') && sizeXL.classList.contains('SELECTED')) {
      changeToGXL();
    } 

    if(grayB.classList.contains('SELECTED') && sizeXXL.classList.contains('SELECTED')) {
      changeToGXXL();
    } 
    
    // Black Color Check

    if (blackB.classList.contains('SELECTED') && sizeS.classList.contains('SELECTED')) {
      changeToBS(); 
    }

    if(blackB.classList.contains('SELECTED') && sizeM.classList.contains('SELECTED')) {
      changeToBM();
    } 

    if(blackB.classList.contains('SELECTED') && sizeL.classList.contains('SELECTED')) {
      changeToBL();
    } 

    if(blackB.classList.contains('SELECTED') && sizeXL.classList.contains('SELECTED')) {
      changeToBXL();
    } 

    if(blackB.classList.contains('SELECTED') && sizeXXL.classList.contains('SELECTED')) {
      changeToBXXL();
    } 

    // Green Color Check

    if (greenB.classList.contains('SELECTED') && sizeS.classList.contains('SELECTED')) {
      changeToGRS(); 
    }

    if(greenB.classList.contains('SELECTED') && sizeM.classList.contains('SELECTED')) {
      changeToGRM();
    } 

    if(greenB.classList.contains('SELECTED') && sizeL.classList.contains('SELECTED')) {
      changeToGRL();
    } 

    if(greenB.classList.contains('SELECTED') && sizeXL.classList.contains('SELECTED')) {
      changeToGRXL();
    } 

    if(greenB.classList.contains('SELECTED') && sizeXXL.classList.contains('SELECTED')) {
      changeToGRXXL();
    } 

    // Cream Color Check

    if (creamB.classList.contains('SELECTED') && sizeS.classList.contains('SELECTED')){
        changeToCS();
    }

    if (creamB.classList.contains('SELECTED') && sizeM.classList.contains('SELECTED')){
        changeToCM();
    }

    if (creamB.classList.contains('SELECTED') && sizeL.classList.contains('SELECTED')){
        changeToCL();
    }

    if (creamB.classList.contains('SELECTED') && sizeXL.classList.contains('SELECTED')){
        changeToCXL();
    }

    if (creamB.classList.contains('SELECTED') && sizeXXL.classList.contains('SELECTED')){
        changeToCXXL();
    }

    // White Color Check

    if (whiteB.classList.contains('SELECTED') && sizeS.classList.contains('SELECTED')){
        changeToWS();
    }

    if (whiteB.classList.contains('SELECTED') && sizeM.classList.contains('SELECTED')){
        changeToWM();
    }

    if (whiteB.classList.contains('SELECTED') && sizeL.classList.contains('SELECTED')){
        changeToWL();
    }

    if (whiteB.classList.contains('SELECTED') && sizeXL.classList.contains('SELECTED')){
        changeToWXL();
    }

    if (whiteB.classList.contains('SELECTED') && sizeXXL.classList.contains('SELECTED')){
        changeToWXXL();
    }

  }
  

  // Getting Sizes:
  getSizeS();
  getSizeM();
  getSizeL();
  getSizeXL();
  getSizeXXL();

  // Getting Colors:
  getColorGray();
  getColorBlack();
  getColorGreen();
  getColorCream();
  getColorWhite();

  // Updating Item ID:
  checkSelection();


  // End of Variant Picker Section

  // Function to handle quantity change
const handleQuantityChange = (cartIndex, action) => {
  if (action === 'decrement') {
    // Handle decrement logic
    if (carts[cartIndex].quantity > 1) {
      carts[cartIndex].quantity--;
    }
  } else if (action === 'increment') {
    // Handle increment logic
    carts[cartIndex].quantity++;
  }
  addCartToHTML(); // Update the cart HTML after changing the quantity
};
