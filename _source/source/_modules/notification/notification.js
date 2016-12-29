'use strict';

import $ from "jquery";
// import cssNotification from './css_modules_notification.json';
import Template from '../utils/templateEngine';

export default class Notification {
  constructor(options) {
    this.name = 'notification';
    console.log('Notification module');

    let defaults = {
      duration: 4200,
      status: 200, //modifier
      type: 'simple',
      cssMap: null,
    };

    this.options = $.extend(defaults, options);
  };

  Push (msg, type) {
    let templateEngine = new Template();

    const template = '<div class="' + this.options.cssMap.cNotification + ' <% this.css[\"is_m_\" + this.data.type] %>">' +
      '<div class="' + this.options.cssMap.cNotification_head + '"> ' +
        '<h6 class="' + this.options.cssMap.cTitle + ' ' + this.options.cssMap.cNotification_title + '">Alerta</h6><span class="' + this.options.cssMap.cNotification_close + '">x</span> ' +
      '</div>' +
      '<div class="' + this.options.cssMap.cNotification_body + '">' +
        '<div class="' + this.options.cssMap.cText + ' ' + this.options.cssMap.cNotification_content + '"><% this.data.msg %></div>' +
      '</div>' +
    '</div>';

    let notificationToDom = templateEngine.Render(template, {data: {msg: msg, type: type}, css: this.options.cssMap })

    $('body').prepend(notificationToDom);
    $('.' + this.options.cssMap.cNotification)
      .delay(this.options.duration)
      .fadeOut(function () {
        $(this).remove();
      });

  }
}
