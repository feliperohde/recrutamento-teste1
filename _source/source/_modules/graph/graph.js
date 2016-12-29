
import $ from "jquery";

import Template from '../utils/templateEngine';
import Math from '../utils/math';

export default class Graph {
  constructor(options) {
    this.name = 'Graph';
    console.log('Graph module');

    let defaults = {
      cssMap: null
    };

    this.options = $.extend(defaults, options);
  };

  Animate () {

  };

  Render (response) {

    // console.log(JSON.parse(response.data))

    let math = new Math();
    let totalBrowserAccess = math.Total(JSON.parse(response));

    //sorry this is ugly, i know.
    const graphsTemplate = '<input class="<%this.css.cInput_m_toggle%>" type="checkbox" id="tableMode_toggle">' +
      '<section class="<%this.css.oGraphs%> <%this.css.cSection%>">' +
        '<div class="<%this.css.wrapper%>">' +
          '<div class="<%this.css.oGraphs_options%>">' +
            '<label class="<%this.css.oGraphs_button%>" id="tableMode" for="tableMode_toggle">Mudar exibição</label>' +
          '</div>' +
          '<div class="<%this.css.browsersHit%> <%this.css.cSection_block%>">' +
            '<table class="<%this.css.cTable%>">' +
              '<thead class="<%this.css.cTable_head%>">' +
                '<tr class="<%this.css.cTable_row%>">' +
                  '<th class="<%this.css.browserName%> <%this.css.cTable_cell%>">Browser</th>' +
                  '<th class="<%this.css.browserUsage%> <%this.css.cTable_cell%>">Distribuição (%)</th>' +
                '</tr>' +
              '</thead>' +
              '<tbody class="<%this.css.cTable_body%>">' +

                '<%for(var index in this.data) {%>' +

                  '<tr class="<%this.css.cTable_row%>">' +
                    '<td class="<%this.css.cTable_cell%> <%this.css.cGraph_m_bar%>"><%this.data[index][0]%><span style="width:<% this.math.Percent(this.data[index][1], this.total)%>%" class="<%this.css.cGraph_bar%>"><%this.data[index][0]%>(<% this.math.Percent(this.data[index][1], this.total)%>%)</span></td>' +
                    '<td class="<%this.css.cTable_cell%>"><% this.math.Percent(this.data[index][1], this.total)%>%</td>' +
                  '</tr>' +

                '<%}%>' +

              '</tbody>' +
            '</table>' +
          '</div>' +
        '</div>' +
      '</section>';

    let templateEngine = new Template();

    let graphsToDOM = templateEngine.Render(graphsTemplate,
      {
        data: JSON.parse(response),
        css: this.options.cssMap,
        math: math,
        total: totalBrowserAccess
      }
    );

    return graphsToDOM;

  }
}
