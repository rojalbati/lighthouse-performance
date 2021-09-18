/// <reference types="Cypress" />
import 'cypress-file-upload';

describe('Run lighthouse performance audits using custom thresholds', function () {

    it('Home Page', () => {

        cy.fixture('configuration.json').then((configuration) => {

            const threshold = configuration.threshold
            const lighthouseConfig = configuration.lighthouseConfig

            cy.visit('/');
            cy.lighthouse(threshold, lighthouseConfig);

        })

    })

    it('Report', () => {

        cy.visit('https://googlechrome.github.io/lighthouse/viewer/');
        cy.get('div.viewer-placeholder-inner').attachFile('report.json', { subjectType: 'drag-n-drop' })
        cy.get('div.viewer-placeholder-inner').should('not.exist')

        cy.get('.lh-topbar').then(function ($topbar) {
            $topbar[0].setAttribute('hidden', '')
        }).should('have.attr', 'hidden')
        cy.get('.lh-scores-container').screenshot('Scores')

        cy.scrollTo('bottom')
        cy.get('.lh-sticky-header').then(function ($header) {
            $header[0].setAttribute('hidden', '')
        }).should('have.attr', 'hidden')
        cy.get('.lh-categories > :nth-child(1)').screenshot('Performance')
        cy.get('.lh-categories > :nth-child(2)').screenshot('Accessibility')

    })

})
