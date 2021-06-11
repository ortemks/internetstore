let productsInformationArray = JSON.parse(`
[
    {
        "image":"images/boot.png",
        "name":"ботинок",
        "price":"350",
        "description":"да, он один"
    },
    {
        "image":"images/display.png",
        "name":"монитор",
        "price":"12000",
        "description":"этот монитор точно обеспечит вас полным спектром лгбт гаммы"
    },
    {
        "image":"images/fortynine.png",
        "name":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero voluptate atque nemo quo, magnam quam ",
        "price":"57",
        "description":"8 гривен за хостинг"
    },
    {
        "image":"images/nightstand.png",
        "name":"тумбочка сапфировая",
        "price":"530835",
        "description":"очень редкая и очень дорогая"
    },
    {
        "image":"images/obama.png",
        "name":"Барак Александрович",
        "price":"2",
        "description":"сейчас не 18 век, но все же..."
    },
    {
        "image":"images/pan.png",
        "name":"кастрюля",
        "price":"990",
        "description":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero voluptate atque nemo quo, magnam quam eligendi sit necessitatibus possimus saepe, amet illo, non cumque nam adipisci eius! Illo, recusandae ea."
    }
]
    `);
productsInformationArray.forEach(function(product, number) {
    document.querySelector('.containerforproducts').insertAdjacentHTML(
        `afterbegin`,
        `<div class="productcontainer">
            <div class="borderundervisible">
                <div class="visibleproduct" onclick="productPopup()">
                    <div class="imagecontainer">
                        <img src="">
                    </div>
                    <div class="spaceinproduct"></div>
                    <div class="productname">
                        <span></span>
                    </div>
                    <div class="productdescription"></div>
                    <div class="productprice">
                        <span class="descriptioninmainproduct">цена:</span>
                        <span class="priceinmainproduct"></span>
                    </div>
                </div>
            </div>
        </div>`
    )
    document.querySelector('.imagecontainer').querySelector('img').setAttribute('src', product.image);
    document.querySelector('.productname').querySelector('span').innerHTML = product.name;
    document.querySelector('.productdescription').innerHTML = product.description;
    document.querySelector('.priceinmainproduct').innerHTML = product.price;
    document.querySelector('.visibleproduct').setAttribute('id', number+1);
    }
);
if (localStorage.getItem('basket') === null) {
    localStorage.setItem('basket', `
    <div class="basketbackground">
        <div class="basketvisiblecontainer">
            <div class="basketmenucontainer">
                <div class="basketheader">
                    <div class="titleinbasket">
                        <span>Корзина</span>
                    </div>
                    <div class="buttonsatbasketheader">
                        <div class="cleanbasketbuttoncontainer">
                            <button class="cleanbasketbutton" onclick="cleanBasket()">Очистить</button>
                        </div>
                        <div class="exitbuttoninbasketcontainer">
                            <button class="exitinbasket" onclick="hideProductBasket()">
                                <div class="firstline"></div>
                                <div class="secondline"></div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="totalamountcontainer">
                <span class="totalamountabout">Общая стоимость:</span>
                <span class="totalamount"></span>
            </div>
        </div>
    </div>
    `);
};
function showProductBasket(){
    if (document.querySelector('.basketbackground') === null) {
        document.body.insertAdjacentHTML(
            `afterbegin`,
            localStorage.getItem('basket')
        );
    }
    if (document.querySelector('.productinbasketcontainer') === null && document.querySelector('.emptyimagecontainer') === null){
        document.querySelector('.basketheader').insertAdjacentHTML(
            'afterend',
            `<div class="emptyimagecontainer">
                <img src="images/emptybasket.png">
            </div>`
        ) 
    } else if (document.querySelector('.productinbasketcontainer') === null) {

    } else if (document.querySelector('.productinbasketcontainer') && document.querySelector('.emptyimagecontainer') === null){
     
    } else {
        document.querySelector('.emptyimagecontainer').remove();
    }
    let i = 0;
    for (product of document.querySelectorAll('.productinbasketcontainer')) {
        i+= product.querySelector('.amountbasket').getAttribute('value') * +product.querySelector('.priceinbasket').innerHTML;
        product.querySelector('.amountbasket').setAttribute('id', product.querySelector('.amountbasket').getAttribute('value') * +product.querySelector('.priceinbasket').innerHTML);
    }
    document.querySelector('.totalamount').innerHTML = i;
}
function cleanBasket(){
    while (document.querySelector('.productinbasketcontainer')) {
        document.querySelector('.productinbasketcontainer').remove();
    };
    document.querySelector('.totalamount').innerHTML = 0;
    if (document.querySelector('.emptyimagecontainer') === null) {
        document.querySelector('.basketheader').insertAdjacentHTML(
        'afterend',
        `<div class="emptyimagecontainer">
            <img src="images/emptybasket.png">
        </div>`
    )
    };
    localStorage.setItem('basket', document.querySelector('.basketbackground').outerHTML);
}
function hideProductBasket(){
    document.querySelector('.basketbackground').remove();
}
function productPopup(){
    clickedObjectmain = event.target.closest('.productcontainer');
    document.body.insertAdjacentHTML(
        `afterbegin`,
        `<div class="popupbackground" onclick="document.querySelector('.popupbackground').remove();">
             <div class="popupvisible">
                 <div class="popupcontent">
                     <div class="imageinpopupcontainer">
                         <img src="">
                     </div>
                     <div class="divideinpopup"></div>
                     <div class="fillingblockinpopup"></div>
                     <div class="textinpopupcontainer">
                         <div class="productnameinpopup">
                             <span></span>
                         </div>
                         <div class="productdescriptioninpopup">
                             <span></span>
                         </div>
                         <div class="productpriceinpopup">
                             <div class="staticinpopup">Цена:</div>
                             <span></span>
                         </div>
                         <div class="buybuttoncontainer">
                             <button onclick="buyInPopup()">Купить</button>
                         </div>
                     </div>
                 </div>
             </div>
         </div>`
    )
    document.querySelector('.popupvisible').setAttribute('id', clickedObjectmain.querySelector('.visibleproduct').getAttribute('id'));
    document.querySelector('.imageinpopupcontainer').querySelector('img').setAttribute('src', clickedObjectmain.querySelector('img').getAttribute('src'));
    document.querySelector('.productnameinpopup>span').innerHTML = clickedObjectmain.querySelector('.productname>span').innerHTML;
    document.querySelector('.productdescriptioninpopup>span').innerHTML = clickedObjectmain.querySelector('.productdescription').innerHTML;
    document.querySelector('.productpriceinpopup>span').innerHTML = clickedObjectmain.querySelector('.priceinmainproduct').innerHTML;
}
function buyInPopup(){
    clickedObject = event.target.closest('.popupbackground');
    document.body.insertAdjacentHTML(
        `afterbegin`,
        localStorage.getItem('basket')
    );
    if (document.querySelector('.productinbasketcontainer') === null) {
        document.querySelector('.basketheader').insertAdjacentHTML(
            'afterend',
            `<div class="productinbasketcontainer">
                <div class="imageinbasketshell">
                    <img src="">
                </div>
                <div class="textinbasketcontainer">
                    <div class="nameinbasket">
                       <span></span>
                    </div>
                    <div class="priceinbasketcontainer">
                        <span class="staticdescription">цена:</span>
                        <span class="priceinbasket"></span>
                    </div>
                    <div class="productamount">
                        <span>количество:</span>
                        <input value="0" class="amountbasket" onchange="
                        k = +this.closest('.basketbackground').querySelector('.totalamount').innerHTML - +this.getAttribute('id') + +this.closest('.productinbasketcontainer').querySelector('.priceinbasket').innerHTML * +this.value ;
                        this.closest('.basketbackground').querySelector('.totalamount').innerHTML = k;
                        this.setAttribute('id', +this.closest('.productinbasketcontainer').querySelector('.priceinbasket').innerHTML * +this.value);
                        this.closest('.productinbasketcontainer').querySelector('.amountbasket').setAttribute('value', this.value);
                        localStorage.setItem('basket', document.querySelector('.basketbackground').outerHTML);
                        " type="number">
                    </div>
                </div>
            </div>`
        );
        document.querySelector('.productinbasketcontainer').setAttribute('id', clickedObject.querySelector('.popupvisible').getAttribute('id'));
        document.querySelector('.productamount>input').setAttribute('value', +document.querySelector('.amountbasket').getAttribute('value') + 1);
        document.querySelector('.imageinbasketshell').querySelector('img').setAttribute('src', clickedObject.querySelector('.imageinpopupcontainer>img').getAttribute('src'));
        document.querySelector('.nameinbasket>span').innerHTML = clickedObject.querySelector('.productnameinpopup>span').innerHTML;
        document.querySelector('.priceinbasket').innerHTML = clickedObject.querySelector('.productpriceinpopup>span').innerHTML;
        document.querySelector('.popupbackground').remove();
        localStorage.setItem('basket', document.querySelector('.basketbackground').outerHTML);
        document.querySelector('.basketbackground').remove();
    }   else {
            let dontdothis;
            for (product of document.querySelectorAll('.productinbasketcontainer')) {
                if (product.getAttribute('id') == clickedObject.querySelector('.popupvisible').getAttribute('id')) {
                    product.querySelector('.amountbasket').setAttribute('value', +product.querySelector('.amountbasket').getAttribute('value') + 1);
                    dontdothis = true;
                }   else {}
                }
                if (dontdothis != true){
                    document.querySelector('.basketheader').insertAdjacentHTML(
                        'afterend',
                        `<div class="productinbasketcontainer">
                            <div class="imageinbasketshell">
                                <img src="">
                            </div>
                            <div class="textinbasketcontainer">
                                <div class="nameinbasket">
                                   <span></span>
                                </div>
                                <div class="priceinbasketcontainer">
                                    <span class="staticdescription">цена:</span>
                                    <span class="priceinbasket"></span>
                                </div>
                                <div class="productamount">
                                    <span>количество:</span>
                                    <input value="0" class="amountbasket" onchange="
                                    k = +this.closest('.basketbackground').querySelector('.totalamount').innerHTML - +this.getAttribute('id') + +this.closest('.productinbasketcontainer').querySelector('.priceinbasket').innerHTML * +this.value ;
                                    this.closest('.basketbackground').querySelector('.totalamount').innerHTML = k;
                                    this.setAttribute('id', +this.closest('.productinbasketcontainer').querySelector('.priceinbasket').innerHTML * +this.value);
                                    this.closest('.productinbasketcontainer').querySelector('.amountbasket').setAttribute('value', this.value);
                                    localStorage.setItem('basket', document.querySelector('.basketbackground').outerHTML);
                                    " type="number">
                                </div>
                            </div>
                        </div>`
                    );
                    document.querySelector('.productinbasketcontainer').setAttribute('id', clickedObject.querySelector('.popupvisible').getAttribute('id'));
                    document.querySelector('.productamount>input').setAttribute('value', +document.querySelector('.amountbasket').getAttribute('value') + 1);
                    document.querySelector('.imageinbasketshell').querySelector('img').setAttribute('src', clickedObject.querySelector('.imageinpopupcontainer>img').getAttribute('src'));
                    document.querySelector('.nameinbasket>span').innerHTML = clickedObject.querySelector('.productnameinpopup>span').innerHTML;
                    document.querySelector('.priceinbasket').innerHTML = clickedObject.querySelector('.productpriceinpopup>span').innerHTML;
                    localStorage.setItem('basket', document.querySelector('.basketbackground').outerHTML);
                }
                document.querySelector('.popupbackground').remove();
                localStorage.setItem('basket', document.querySelector('.basketbackground').outerHTML);
                document.body.querySelector('.basketbackground').remove();      
            }
}




