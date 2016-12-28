// Main javascript entry point
// Should handle bootstrapping/starting application

import $ from 'jquery';
// import Link from '../_modules/link/link';
import Debounce from '../_modules/utils/debounce';
import Throttle from '../_modules/utils/throttle';
import Xhr from '../_modules/utils/xhr';
import Notification from '../_modules/notification/notification';
import Math from '../_modules/utils/math';

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
        xhr.Post({data: data.data, url: 'http://www.improving.com.br/api/test/hits-by-browser' }, function (reponse) {
          let math = new Math();

          math.Total(reponse.data);
        });
      }

    });


  } );

  ///for testing
  var data = {
      "email": "fr.rohde@gmail.com",
      "password": '',
      "fullName": '',
      "birthDate": '',
      "zipCode": '',
      "streetName": '',
      "number": '',
      "complement": '',
      "neighbourhood": '',
      "country": '',
      "state": '',
      "city": ''
    };

  xhr.Post({data: JSON.stringify(data)}, function (data) {
      var notification = new Notification({cssMap: css});
      notification.Push(data.msg, data.status);

      if (data.status === 200 ) {
        xhr.Post({data: data.data, url: 'http://www.improving.com.br/api/test/hits-by-browser' }, function (reponse) {
          let math = new Math();
          let totalBrowserAccess = math.Total(JSON.parse(reponse.data));

          let grapsTemplate = '<section class="_cSection" id="results-section">' +
    '<input class="_cInput_m_toggle" type="checkbox" id="tableMode_toggle">' +
    '<section class="_oGraphs _cSection">' +
      '<div class="_wrapper">' +
        '<div class="_oGraphs_options">' +
          '<label class="_oGraphs_button" id="tableMode" for="tableMode_toggle">Mudar exibição</label>' +
        '</div>' +
        '<div class="_browsersHit _cSection_block">' +
          '<table class="_cTable">' +
            '<thead class="_cTable_head">' +
              '<tr class="_cTable_row">' +
                '<th class="browser-name _cTable_cell">Browser</th>' +
                '<th class="_browserUsage _cTable_cell">Distribuição (%)</th>' +
              '</tr>' +
            '</thead>' +
            '<tbody class="_cTable_body">' +
              '<tr class="_cTable_row">' +
                '<td class="_cTable_cell _cGraph_m_bar">Chrome<span class="_cGraph_bar">21%</span></td>' +
                '<td class="_cTable_cell">21%</td>' +
              '</tr>' +
              '<tr class="_cTable_row">' +
                '<td class="_cTable_cell _cGraph_m_bar">Chrome<span class="_cGraph_bar">21%</span></td>' +
                '<td class="_cTable_cell">21%</td>' +
              '</tr>' +
              '<tr class="_cTable_row">' +
                '<td class="_cTable_cell _cGraph_m_bar">Chrome<span class="_cGraph_bar">21%</span></td>' +
                '<td class="_cTable_cell">21%</td>' +
              '</tr>' +
            '</tbody>' +
          '</table>' +
        '</div>' +
      '</div>' +
    '</section>' +
  '</section>';

          console.log(totalBrowserAccess);
        });
      }

    });

});
