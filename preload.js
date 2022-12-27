const { ipcRenderer } = require("electron");

global.sendToWindow = (type, args = null) => {
  if(args == null) return ipcRenderer.sendToHost(type)
  ipcRenderer.sendToHost(type, args)
}
var isReady = true;

document.addEventListener('DOMContentLoaded', (event) => {
  if(isReady == false) return console.log("Page was already loaded once before.");
  isReady = false;
  console.log("Page loaded.");

  getRequiredScripts(window.location.href.toString())
  .then(data = (data) => {
    var script = document.createElement('script'); 
    script.className = "SimScript";
    script.innerHTML = data;
    script.onload = function() {
      this.remove();
    };
    (document.head || document.documentElement).appendChild(script);
  })
  .catch(error => console.log(error));

  window.addEventListener("message", function(event) {
    if(event.data.type == "updateDiscordActivity"){
      sendToWindow('updateDiscordActivity', event.data)
    }
    if(event.data.type == "keybind"){
      sendToWindow('keybind', event.data.key)
    }
    if(event.data.type == "clickAway"){
      sendToWindow('clickAway')
    }
    if(event.data.type == "authentication"){
      sendToWindow('authentication', event.data.token)
    }
    if(event.data.type == "logout"){
      sendToWindow('logout')
    }
  });
  //END OF LOAD
})


window.addEventListener('load', function () {
  getRequiredScriptsAfter(window.location.href.toString())
  .then(data = (data) => {
    var script = document.createElement('script'); 
    script.className = "SimEndScript";
    script.innerHTML = data;
    script.onload = function() {
      this.remove();
    };
    (document.body).insertAdjacentElement('beforeend', script);
  })
  .catch(error => console.log(error));
})




const getRequiredScripts = async (url) => {
  console.log(url)
  var script = "";
  if(url.includes('simple-mmo.com/')){
    script += `

   try {
    document.querySelector('nav.space-y-1.bg-white.mx-4.mb-8.mt-6').querySelectorAll('a')[document.querySelector('nav.space-y-1.bg-white.mx-4.mb-8.mt-6').querySelectorAll('a').length-1].remove();

   } catch (error) {
    console.log(error);
   }

    function fixLinks(){
      var links = document.getElementsByTagName('a');
      for(var i = 0; i < links.length; i++){
        if(links[i].getAttribute('target') == '_blank'){
          links[i].removeAttribute('target');
        }
      }
    }

    fixLinks();

    function keybind(key){
      var item = {
        type: "keybind",
        key: key
      }
      window.postMessage(item);
    }

    function authentication(){
      fetch('https://web.simple-mmo.com/api/token?')
      .then(response => response.json())
      .then((data) => {
        if(data.api_token != null) {
          var item = {
            type: "authentication",
            token: data.api_token
          }
          return window.postMessage(item);
        }
          
        var item = {
          type: "logout"
        }
        return window.postMessage(item);
      });

    }

    authentication();

    var keyBindListener = function (e){
      var pressedKey = "";
      if(e.type == "mousedown"){
        if(e.button != 0 && e.button != 1 && e.button != 2){
          if(e.shiftKey) pressedKey += "Shift+";
          if(e.ctrlKey) pressedKey += "Ctrl+";
          if(e.altKey) pressedKey += "Alt+";
          pressedKey += 'Mouse' + e.button;
        }
      }
      else if(e.type == "keypress"){
        if(e.shiftKey) pressedKey += "Shift+";
        if(e.ctrlKey) pressedKey += "Ctrl+";
        if(e.altKey) pressedKey += "Alt+";
        pressedKey += e.code;
      }
      else if(e.type == "keydown"){
        if(e.shiftKey) pressedKey += "Shift+";
        if(e.ctrlKey) pressedKey += "Ctrl+";
        if(e.altKey) pressedKey += "Alt+";
        pressedKey += e.code;
      }
      if (document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA" && pressedKey != '') keybind(pressedKey);
    }

    try{
      window.addEventListener('keypress', this.keyBindListener, false);
      window.addEventListener('keydown', function(e){
        if(e.ctrlKey && e.key == 'w'){
          e.preventDefault();
          self.keyBindListener(e);
        }
        if((e.key.startsWith('F') && e.key != "F") || e.key == 'Escape' || e.key == 'Backspace' || e.key.startsWith('Arrow')) self.keyBindListener(e);

      }, false);
      window.addEventListener('mousedown', function(e){
        var item = {
          type: "clickAway"
        }
        return window.postMessage(item);

        this.keyBindListener(e);
      }, false);
      
    }
    catch (error) {
      console.log(error);
    }

    `;
  }
  
  if(url.includes('simple-mmo.com/travel')){

    script += `

    function updateListingQty(val) {
      //document.getElementById('qty_listing_amount').innerHTML=val; 
    }

    function makeid(length) {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }

    function fixMissingStylesAtPopup(){
      var styles = ".smmo-switch{position:relative;display:inline-block;width:40px;height:25px}.smmo-switch input{opacity:0;width:0;height:0}.smmo-slider.round{border-radius:34px}.smmo-slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#ccc;-webkit-transition:.4s;transition:.4s}.mt-10{margin-top:10px}[type=checkbox]{border-radius:0}[type=checkbox],[type=radio]{-webkit-appearance:none;-moz-appearance:none;appearance:none;padding:0;-webkit-print-color-adjust:exact;color-adjust:exact;display:inline-block;vertical-align:middle;background-origin:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;flex-shrink:0;height:1rem;width:1rem;color:#2563eb;background-color:#fff;border-color:#737373;border-width:1px;--tw-shadow:0 0 #0000}.smmo-slider.round:before{border-radius:50%}.smmo-slider::before{background-color:var(--widget)}.smmo-slider:before{position:absolute;content:'';height:15px;width:15px;left:4px;bottom:4px;background-color:#fff;-webkit-transition:.4s;transition:.4s}";
      var styleSheet = document.createElement("style")
      styleSheet.type = "text/css"
      styleSheet.innerText = styles
      document.head.appendChild(styleSheet)

      var button = '<button type="button" onclick="marketSellItem();" class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs sm:text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Place on Market</button>';

      try {
        document.querySelector('#item-popup').querySelector('.flex.flex-wrap.justify-center.gap-2.my-4').insertAdjacentHTML('beforeend', button);
      } catch (error) {
        console.log(error);
      }
    }

    fixMissingStylesAtPopup();
    
    function marketSellItem(){

      var id = document.querySelector('#item-popup')._x_dataStack[0].item.id;
      var name = document.querySelector('#item-popup')._x_dataStack[0].item.name;
      var image = document.querySelector('#item-popup')._x_dataStack[0].item.image;
      var max_amount = document.querySelector('#item-popup')._x_dataStack[0].item.yours;

      var existing_qty = $("#item-"+id+"-qty").html();
      var new_qty = 1;
      var is_bank_payment = false;

      var existing_qty_max = existing_qty;
      if (existing_qty_max > 50)
        existing_qty_max = 50;

      var average_price = "<i class='fa fa-sync fa-spin'></i> Loading";
      var lowest_price = "<i class='fa fa-sync fa-spin'></i> Loading";
      var highest_price = "<i class='fa fa-sync fa-spin'></i> Loading";
      var average_id = makeid(5);
      var lowest_id = makeid(5);
      var highest_id = makeid(5);

      if (max_amount > 20)
        max_amount = 20;

      //Get prices
        $.ajax({
            type: "POST",
            url: '/api/market/'+id+'/prices',
            success: function( data ) {
                average_price = data.average_price;
                $("#average-price-"+id+"-"+average_id).html("<img src='/img/icons/I_GoldCoin.png' class='h-4'> "+average_price);

                lowest_price = data.lowest_price;
                $("#lowest-price-"+id+"-"+lowest_id).html("<img src='/img/icons/I_GoldCoin.png' class='h-4'> "+lowest_price);

                highest_price = data.highest_price;
                $("#highest-price-"+id+"-"+highest_id).html("<img src='/img/icons/I_GoldCoin.png' class='h-4'> "+highest_price);
            }
        });

      var previous_prices = "Average price: <span id='average-price-"+id+"-"+average_id+"'>"+average_price+"</span><br/>"+
      "Lowest price: <span id='lowest-price-"+id+"-"+lowest_id+"'>"+lowest_price+"</span><br/>"+
      "Highest price: <span id='highest-price-"+id+"-"+highest_id+"'>"+highest_price+"</span><br/>"+
      "<small>in the past 30 days</small>";


      var moneyToBank = "<div class=''><strong>Place gold in bank</strong><br><label class='smmo-switch mt-10'><input type='checkbox' name='bank_payment' id='bank_payment'><span class='smmo-slider round'></span></label><br><small>+2.5% fee</small></div>";


      Swal.fire({
        title: 'Sell '+ name,
        imageUrl: image,
        html: previous_prices+"<br/><Br/><small>All final transactions have a 3.5% fee.</small>"+
  "<br/><br/><strong>Quantity</strong><br/>"+
  "<input type='number' min='0' max='"+max_amount+"'  oninput='updateListingQty(this.value);' onchange='updateListingQty(this.value);' id='swal-input1' name='amount' class='swal2-input'><br/>"+
  "<small>You can only list 20 items at one time.</small><Br/><br/>"+
  "<strong>Amount</strong><br/><input type='text' inputmode='numeric' onkeyup='formatInputNumber(this);' id='swal-input2' name='quantity' class='gold-input-icon swal2-input'><br/>"+moneyToBank,
        showCancelButton: true,
        confirmButtonText: 'Sell item',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          new_qty = document.getElementById('swal-input1').value;
          
          if($('#bank_payment').is(':checked'))
            is_bank_payment = true;
          
          return fetch('/api/market/'+id, {
              'method': 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({_token: token, qty: document.getElementById('swal-input1').value, amount: document.getElementById('swal-input2').value, bank_payment: is_bank_payment})
            })
            .then(response => {
              if (!response.ok) {

                if(response.status == 429){
                    throw new Error("You are listing items on the market too fast. Please wait a few moments before trying again. ");
                }
                
                throw new Error(response.statusText)
              }
              return response.json()
            })
            .catch(error => {
              Swal.showValidationMessage(
                error
              )
            })
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.value) {
          Swal.fire({
            title: result.value.title,
            html: result.value.result,
            type: result.value.type
          });

          if (result.value.type == "success"){
            var new_qty_two = existing_qty - new_qty;
            if (new_qty_two < 1){
              $("#item-"+id+"-block").hide();
            }else{
              $("#item-"+id+"-qty").html(new_qty_two);
            }
          }
        }
      });
  }

    `;
    script += `

    var stepCounter = 0;

    var potions = [];

    var selected_potion = null;

    function prepare_potions(){
      var links = document.querySelector('[x-show="potions_dropdown"]').querySelectorAll('a');
      try {
        for (let i = 0; i < links.length; i++) {
          var text = links[i].querySelectorAll('div')[2].innerText;
          const potion = {
              type: text.split('%')[1].split('for')[0].split('(')[0].trim(),
              percentage: text.split('%')[0],
              value: parseInt(text.split('(')[1].split('minutes')[0].trim()),
          };
          potions.push(potion);
          var attribute = links[i].getAttribute("onclick");
          links[i].setAttribute('onclick', attribute + '; selected_potion = ' + i + ';')
        }
      } catch (error) {
        console.log(error);
      }
    }

    prepare_potions();

    function start_potion(){
      
      let item = {
        type: 'create_timer', 
        data: {
          type: 'potion',
          name: potions[selected_potion].type,
          percentage: potions[selected_potion].percentage,
        },
        value: potions[selected_potion].value,
        end: null
      }; 

      window.postMessage(item);
    }


    function prepare_sprint(){
      var button = document.querySelector('[x-show="!sprint.active"]').querySelectorAll('button')[2];
      var attribute = button.getAttribute("x-on:click");
      button.setAttribute("x-on:click", attribute + 'start_sprint();');
    }

    prepare_sprint();


    function start_sprint(){
      var value = parseInt(document.querySelector('#complete-travel-container')._x_dataStack[0].sprint.minutes);
      var current_energy = parseInt(document.querySelector('#player-popup')._x_dataStack[0].user.current_energy);

      if(value > current_energy) return console.error('You do not have enough energy to do this.');
      
      let item = {
        type: 'create_timer', 
        data: {
          type: 'sprint',
          name: ''
        },
        value: value,
        end: null
      }; 

      


      window.postMessage(item);
    }
      
    try{
      document.querySelector('#step_button').attributes['x-on:mousedown'].nodeValue = "takeStep; countTheStep();";
    }
    catch(e){
      console.log(e);
    }

    try{
      eval(showPopup.toString().replace('window.location.href=link;', "start_potion(); window.location.href=link;"));
    }
    catch(e){
      console.log(e);
    }

    try{
      anime.suspendWhenDocumentHidden = false;
      console.log('Fixing new travel');
    }
    catch(e){
      console.log(e);
    }

    function countTheStep(){
      stepCounter++;
      partyCheck();
      if(stepCounter == 9){
        stepCounter = 0;
        console.log('called');
        var item = {
          type: "updatePlayer",
        }
        window.postMessage(item);
        
      }

      var item = {
        type: "stepTaken",
      }
      window.postMessage(item);
    }

    function partyCheck(){
      if(Object.keys(document.getElementById('complete-travel-container')._x_dataStack[0].party).length > 0){
        var item = {
          type: "updateDiscordActivity",
          data: {
            state: 'Stepping in a Party [' + Object.keys(document.getElementById('complete-travel-container')._x_dataStack[0].party).length + '/4]',
          }
        }
        window.postMessage(item);
      }
      else{
        var item = {
          type: "updateDiscordActivity",
          data: {
            state: 'Stepping',
          }
        }
        window.postMessage(item);
      }
    }

    partyCheck();
    `;
  }

  if(url.includes('discussionboards/menu')){
    script += `
    var item = {
      type: "updateDiscordActivity",
      data: {
        state: 'Browsing Discussion Boards',
      }
    }
    window.postMessage(item);
    `;
  }

  if(url.includes('quests/viewall')){
    script += `
    var item = {
      type: "updateDiscordActivity",
      data: {
        state: 'Browsing Quests',
      }
    }
    window.postMessage(item);
    `;
  }

  if(url.includes('jobs/viewall')){
    script += `
    var item = {
      type: "updateDiscordActivity",
      data: {
        state: 'Browsing Jobs',
      }
    }
    window.postMessage(item);
    `;
  }


  if(url.includes('/crafting/menu')){
    script += `
    var item = {
      type: "updateDiscordActivity",
      data: {
        state: 'Browsing Crafting Recipes',
      }
    }
    window.postMessage(item);
    `;
  }

  if(url.includes('battle/menu')){
    script += `
    var item = {
      type: "updateDiscordActivity",
      data: {
        state: 'Preparing for a Battle',
      }
    }
    window.postMessage(item);
    `;
  }

  if(url.includes('user/view/')){
    script += `
    var item = {
      type: "updateDiscordActivity",
      data: {
        state: 'Viewing Profile',
      }
    }
    window.postMessage(item);
    `;
  }


  if(url.includes('quests/view/')){
    script += `
    var item = {
      type: "updateDiscordActivity",
      data: {
        state: 'Working on a Quest',
      }
    }
    window.postMessage(item);
    `;
  }

  if(url.includes('/collection/')){
    script += `
    var item = {
      type: "updateDiscordActivity",
      data: {
        state: 'Browsing Collection',
      }
    }
    window.postMessage(item);
    `;
  }

  if(url.includes('discussionboards/menu')){
    script += `
    var item = {
      type: "updateDiscordActivity",
      data: {
        state: 'Browsing Discussion Boards',
      }
    }
    window.postMessage(item);
    `;
  }


  if(url.includes('/inventory/items')){
    script += `
    var item = {
      type: "updateDiscordActivity",
      data: {
        state: 'Browsing Inventory',
      }
    }
    window.postMessage(item);
    `;
  }


  if(url.includes('/inventory/storage')){
    script += `
    var item = {
      type: "updateDiscordActivity",
      data: {
        state: 'Browsing Storage',
      }
    }
    window.postMessage(item);
    `;
  }

  if(url.endsWith('/town')){
    script += `
    var item = {
      type: "updateDiscordActivity",
      data: {
        state: 'Visiting a town',
      }
    }
    window.postMessage(item);
    `;
  }

  if(url.includes('/bank')){
    script += `
    var item = {
      type: "updateDiscordActivity",
      data: {
        state: 'Visiting a bank',
      }
    }
    window.postMessage(item);
    `;
  }

  if(url.includes('/shop/viewall')){
    script += `
    var item = {
      type: "updateDiscordActivity",
      data: {
        state: 'Visiting a shop',
      }
    }
    window.postMessage(item);
    `;
  }

  if(url.includes('/market-menu')){
    script += `
    var item = {
      type: "updateDiscordActivity",
      data: {
        state: 'Browsing Market',
      }
    }
    window.postMessage(item);
    `;
  }

  if(url.includes('/inventory/showcase')){
    script += `
    var item = {
      type: "updateDiscordActivity",
      data: {
        state: 'Browsing Showcase',
      }
    }
    window.postMessage(item);
    `;
  }

  if(url.includes('/tasks/viewall')){
    script += `
    var item = {
      type: "updateDiscordActivity",
      data: {
        state: 'Browsing Tasks',
      }
    }
    window.postMessage(item);
    `;
  }

  if(url.includes('/worldboss/all')){
    script += `
    var item = {
      type: "updateDiscordActivity",
      data: {
        state: 'Browsing World Bosses',
      }
    }
    window.postMessage(item);
    `;
  }

  if(url.includes('/worldboss/view/')){
    script += `
    var item = {
      type: "updateDiscordActivity",
      data: {
        state: 'Preparing for a World Boss',
      }
    }
    window.postMessage(item);
    `;
  }

  if(url.includes('crafting/material/gather/')){
    script += `
    var item = {
      type: "updateDiscordActivity",
      data: {
        state: 'Gathering ' + document.title,
      }
    }
    window.postMessage(item);
    `;
  }

  if(url.includes('crafting/view/')){
    script += `
    var item = {
      type: "updateDiscordActivity",
      data: {
        state: 'Crafting ' + document.title,
      }
    }
    window.postMessage(item);
    `;
  }



  if(url.includes('npcs/attack/')){
    console.log('got here!');
    script += `
    var item = {
      type: "updateDiscordActivity",
      data: {
        state: 'Slaying an NPC',
      }
    }
    window.postMessage(item);
    `;
  }

  if(url.includes('user/attack/')){
    script += `
    var item = {
      type: "updateDiscordActivity",
      data: {
        state: 'Attacking a Player',
      }
    }
    window.postMessage(item);
    `;
  }
  

  //Use Item keybind config
  if(url == 'simple-mmo.com/travel' || url.includes('simple-mmo.com/npcs/attack/')){ //where to apply
    script += `
    function useQuickItemAjax(){
      $.ajax({
        type: 'POST',
        url: window.location.origin + 'api/quickuse',
        data: {'_token': document.querySelector('[name="csrf-token"]').content},
        dataType: 'json',
        success: function (data) {
          if (data.result == "success"){
            Swal.fire({
              type: 'success',
              title: 'Success!',
              html: data.message,
            });
            }else{
            Swal.fire({
              type: 'error',
              title: 'Failure',
              text: data.message,
            });
          }
        }
      });
    } 


    function useQuickItem(){
      fetch(window.location.origin + '/api/quickuse', {
        'method': 'POST',
        body: new URLSearchParams("_token="+document.querySelector('[name="csrf-token"]').content)
      })
      .then(response => response.json())
      .then(data => {
          if (data.result == "fail") {
            Swal.fire({
              type: 'error',
              title: 'Failure',
              text: data.message,
            });
          }
          else{
            Swal.fire({
              type: 'success',
              title: 'Success!',
              html: data.message,
            });
          }
      });
    }
    `;

  }




  return script;
}


const getRequiredScriptsAfter = async (url) => {
  var script = "";
  if(url.includes('simple-mmo.com/')){
    script += `
    function app(){
      if(!this||this==window)return new app;
      var o=function(){return"thanks for calling!"};
      return o.__proto__=app.prototype,o.constructor=app,o}
      app.prototype={
        openScrollableTabPage:function(title, menu){requiredAppFunction(title, menu);},
        openFixedTabPage:function(title, menu){requiredAppFunction(title, menu);},
      __proto__:Function.prototype
    },app=new app;


    
    function requiredAppFunction(title, menu){
      try{
        console.log(JSON.parse(menu));
      }
      catch(e){
        console.log(menu);
      }
      
      let item = {
        type: "openPageWithSubMenu", 
        title: title, menu: menu
      }; 
      window.postMessage(item);
    }
    `;
  }
  return script;
}




/* Additional functions */
var multiSelect = false;

ipcRenderer.on("activateMultiselect", () => {
  try{
    var buttons = document.querySelectorAll('.text-right.text-indigo-600.text-xs.mt-2.font-medium.mr-2 span');
    if(multiSelect == false){
      multiSelect = true;
      buttons[0].click();
    }
      else{
        multiSelect = false;
        buttons[1].click();
      }
    }
    catch(e){
      console.log(e);
    }
});

ipcRenderer.on("selectAll", () => {
  try{
    var items = document.querySelectorAll('[name="multi_item[]"]');
    for (let i = 0; i < items.length; i++) {
      const element = items[i];
      element.checked = true;
    }
  }
  catch(e){
    console.log(e);
  }
});

ipcRenderer.on("deselectAll", () => {
  try{
    var items = document.querySelectorAll('[name="multi_item[]"]');
    for (let i = 0; i < items.length; i++) {
      const element = items[i];
      element.checked = false;
    }
  }
  catch(e){
    console.log(e);
  }
});


