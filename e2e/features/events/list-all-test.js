const reuseables = require('../../reuseables/skip-tour.js');
const localQuerystrings = require('../../reuseables/querystrings.js');

const TIME_LIMIT = 10000;
const layersTab = '#layers-sidebar-tab';
const eventsTab = '#events-sidebar-tab';

module.exports = {
  before(client) {
    reuseables.loadAndSkipTour(client, TIME_LIMIT);
  },
  'Hide events that are not in view': function(client) {
    client.url(client.globals.url + localQuerystrings.mockEvents);
    client.waitForElementVisible(
      '#sidebar-event-EONET_3931',
      TIME_LIMIT,
      () => {
        client.click('#sidebar-event-EONET_3931');
        client.click(layersTab);
        client.waitForElementPresent(
          '#active-VIIRS_SNPP_Thermal_Anomalies_375m_Night',
          TIME_LIMIT,
          () => {
            client.click(eventsTab);
            client.expect.element('#sidebar-event-EONET_2703').to.be.visible;
            client.expect.element('ul#wv-eventscontent > li:nth-child(9)').to.be.visible;
            client.click('#events-footer-checkbox').pause(1000);
            client.expect.element('#sidebar-event-EONET_2703').to.not.be.visible;
            client.expect.element('ul#wv-eventscontent > li:nth-child(2)').to.not.be.visible;
          },
        );
      },
    );
  },
  'Show events that are not in view': function(client) {
    client.click('#events-footer-checkbox').pause(1000);
    client.expect.element('#sidebar-event-EONET_2703').to.be.visible;
    client.expect.element('ul#wv-eventscontent > li:nth-child(9)').to.be
      .visible;
  },
  after(client) {
    client.end();
  },
};
