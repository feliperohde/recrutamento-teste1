// Main javascript entry point
// Should handle bootstrapping/starting application

import $ from 'jquery';
// import Link from '../_modules/link/link';
import Debounce from '../_modules/utils/debounce';
import Throttle from '../_modules/utils/throttle';
import Xhr from '../_modules/utils/xhr';
import Notification from '../_modules/notification/notification';
import Math from '../_modules/utils/math';
import Template from '../_modules/utils/templateEngine';
import Graph from '../_modules/graph/graph';

import css from '../_styles/css_modules_all.json';

'use strict';
$(() => {

  var throttled = new Throttle(function() {
    console.log('throttled');
  }, 300);

  var debounced = new Debounce(function(e) {
    console.log('debounced');
  }, 300);

  var xhr = new Xhr();

  var newUserForm = $('#newuserform');

  newUserForm.on('submit', function (e) {

    e.preventDefault(); // for this time;

    var data = {
      "email": $('#email').val(),
      "password": $('#password').val(),
      "fullName": $('#fullName').val(),
      "birthDate": $('#birthDate').val(),
      "zipCode": $('#zipCode').val(),
      "streetName": $('#streetName').val(),
      "number": $('#number').val(),
      "complement": $('#complement').val(),
      "neighbourhood": $('#neighbourhood').val(),
      "country": $('#country').val(),
      "state": $('#state').val(),
      "city": $('#city').val()
    };

    xhr.Post({data: JSON.stringify(data)}, function (data) {
      var notification = new Notification({cssMap: css});
      notification.Push(data.msg, data.status);

      if (data.status === 200 ) {
        xhr.Post({data: data.data, url: 'http://www.improving.com.br/api/test/hits-by-browser' }, function (response) {

          let graph =  new Graph({cssMap: css});
          //todo: create var or receive a param
          $('#results-section').html(graph.Render(response.data));
        });
      }

    });


  } );

  ///for testing
  // var data = {
  //     "email": "fr.rohde@gmail.com",
  //     "password": '',
  //     "fullName": '',
  //     "birthDate": '',
  //     "zipCode": '',
  //     "streetName": '',
  //     "number": '',
  //     "complement": '',
  //     "neighbourhood": '',
  //     "country": '',
  //     "state": '',
  //     "city": ''
  //   };

  // xhr.Post({data: JSON.stringify(data)}, function (data) {
  //     var notification = new Notification({cssMap: css});
  //     notification.Push(data.msg, data.status);

  //     if (data.status === 200 ) {
  //       xhr.Post({data: data.data, url: 'http://www.improving.com.br/api/test/hits-by-browser' }, function (response) {

  //         let graph =  new Graph({cssMap: css});
  //         //todo: create var or receive a param
  //         $('#results-section').html(graph.Render(response.data));
  //       });
  //     }

  //   });

});
