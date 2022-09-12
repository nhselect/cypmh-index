<template>
  <div>
    <a class="nhsuk-skip-link" href="#maincontent">Skip to main content</a>
    <NhsHeader />
    <div class="nhsuk-width-container-fluid">
      <main id="maincontent" class="nhsuk-main-wrapper" role="main">
        <div class="nhsuk-grid-row">
          <div class="nhsuk-grid-column-two-thirds">
            <h1>
              Children and Young People with Mental Health Needs, Autism or
              Learning Disability
              <br /><small>Searchable Index</small>
            </h1>
            <p class="nhsuk__lead">
              Use the search bar or the drop down boxes below to find specific
              resources.
            </p>
          </div>
          <div class="nhsuk-grid-column-one-third">
            <Programmes />
          </div>
        </div>
        <Matrix />
        <div class="links">
          <h2>Can't find what you are looking for?</h2>
          <p>
            Please email
            <a href="mailto:Learningnetwork@nhselect.org.uk">Learningnetwork@nhselect.org.uk</a> stating what
            you need and we will do our best to locate some suitable resources.
          </p>
        </div>
        <div>
          <h2>Install on your phone</h2>
          <p>
            You can install this as an app on your phone by accessing your
            browser settings/share settings and selecting
            <strong>Add to Home Screen</strong>
            (please note: steps vary between devices and browsers)
          </p>
        </div>
        <div>
          <Programmes />
        </div>
      </main>
    </div>
    <NhsFooter />
  </div>
</template>

<script>
import Programmes from '~/components/Programmes.vue'
import Matrix from '~/components/Matrix.vue'
import NhsFooter from '~/components/NhsFooter.vue'
import NhsHeader from '~/components/NhsHeader.vue'

export default {
  components: {
    Programmes,
    Matrix,
    NhsFooter,
    NhsHeader,
  },
  head: {
    script: [
      {
        src: 'https://kit.fontawesome.com/d321bb2fa5.js',
        crossOrigin: 'anonymous',
      },
    ],
  },
}
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/header/header';
@import 'node_modules/nhsuk-frontend/packages/components/skip-link/skip-link';
@import 'node_modules/nhsuk-frontend/packages/components/action-link/action-link';
@import 'node_modules/nhsuk-frontend/packages/components/footer/footer';

h1 small {
  color: $color_nhsuk-pink;
  font-weight: bold;
}
</style>
