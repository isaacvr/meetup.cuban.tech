/**
 *  @author: Isaac Vega Rodriguez          <isaacvega1996@gmail.com>
 */
'use strict';

window.addEventListener('load', formHandler, false);

function formHandler() {

  var myForm = document.querySelector('#myForm');

  var form = new Form(myForm, 'forms/userinfo.json');

  form.on('completed', function(data) {

    var sender = new XMLHttpRequest();

    sender.open('POST', '/submitForm', true);

    console.log(data);

    var strData = new FormData();

    strData.append('data', JSON.stringify(data));

    sender.send(strData);

  });

}