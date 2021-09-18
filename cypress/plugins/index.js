// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
// module.exports = (on, config) => {
//   // `on` is used to hook into various events Cypress emits
//   // `config` is the resolved Cypress config
// }

const { lighthouse, pa11y, prepareAudit } = require("cypress-audit");
const fs = require("fs");

module.exports = (on, config) => {
  on("before:browser:launch", (browser = {}, launchOptions) => {
    prepareAudit(launchOptions);
  });

  // 1. Configure Lighthouse CLI and invoke the lighthouse process
  // on('task', {
  //   lighthouse: lighthouse()
  // });

  // 2. Configure Lighthouse CLI, invoke the lighthouse process and access raw report
  // on('task', {
  //   lighthouse: lighthouse((lighthouseReport) => {
  //     console.log(lighthouseReport); // raw lighthouse reports
  //   })
  // });

  // 3. Configure Lighthouse CLI, invoke the lighthouse process, access raw report
  // Generate Categories and Audit Scores and stores these into respective JSON files

  // on("task", {
  //   lighthouse: lighthouse((lighthouseReport) => {
  //     const categories = lighthouseReport.lhr.categories;
  //     const audits = lighthouseReport.lhr.audits;
  //     const formattedAudit = Object.keys(audits).reduce(
  //       (metrics, curr) => ({
  //         ...metrics,
  //         [curr]: audits[curr].numericValue,
  //       }),
  //       {}
  //     );
  //     const formattedAuditsResults = {
  //       url: lighthouseReport.lhr.requestedUrl,
  //       ...formattedAudit,
  //     };
  //     const auditReportName =
  //       "./audit-" +
  //       lighthouseReport.lhr.requestedUrl.replace(
  //         /[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g,
  //         function (x) {
  //           return "";
  //         }
  //       ) +
  //       " - " +
  //       lighthouseReport.lhr.fetchTime.split("T")[0] +
  //       ".json";

  //     fs.writeFileSync(
  //       auditReportName,
  //       JSON.stringify(formattedAuditsResults, null, 2)
  //     );
  //     const formattedCategories = Object.keys(categories).reduce(
  //       (metrics, curr) => ({
  //         ...metrics,
  //         [curr]: categories[curr].score * 100,
  //       }),
  //       {}
  //     );

  //     const formattedCategoriesResults = {
  //       url: lighthouseReport.lhr.requestedUrl,
  //       ...formattedCategories,
  //     };

  //     const categoriesReportName =
  //       "./categories-" +
  //       lighthouseReport.lhr.requestedUrl.replace(
  //         /[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g,
  //         function (x) {
  //           return "";
  //         }
  //       ) +
  //       " - " +
  //       lighthouseReport.lhr.fetchTime.split("T")[0] +
  //       ".json";

  //     fs.writeFileSync(
  //       categoriesReportName,
  //       JSON.stringify(formattedCategoriesResults, null, 2)
  //     );
  //   }),
  // });

  // 4. Configure Lighthouse CLI, invoke the lighthouse process, access raw report
  // and store this whole report inside a JSON file

  on('task', {
    lighthouse: lighthouse((lighthouseReport) => {
      const newPath = './cypress/fixtures'
      fs.writeFileSync(`${newPath}/report.json`, JSON.stringify(lighthouseReport, null, 2))
    }),
  });
};
