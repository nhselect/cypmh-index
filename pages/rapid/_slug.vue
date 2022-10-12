<template>
  <div>
    <div class="nhsuk-grid-row">
      <div class="nhsuk-grid-column-two-thirds">
        <div class="nhsuk-back-link">
          <NuxtLink class="nhsuk-back-link__link" to="/">
            <svg
              class="nhsuk-icon nhsuk-icon__chevron-left"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
              height="24"
              width="24"
            >
              <path
                d="M8.5 12c0-.3.1-.5.3-.7l5-5c.4-.4 1-.4 1.4 0s.4 1 0 1.4L10.9 12l4.3 4.3c.4.4.4 1 0 1.4s-1 .4-1.4 0l-5-5c-.2-.2-.3-.4-.3-.7z"
              ></path>
            </svg>
            Find more resources in the index
          </NuxtLink>
        </div>
        <h1 class="nhsuk-heading-m">
          Children and Young People with Mental Health Needs, Autism or Learning
          Disability
        </h1>
        <h2 class="nhsuk-heading-xl">
          <span class="nhsuk-caption-xl">Rapid Access List</span>
          {{ rapid.title }}
        </h2>
      </div>
      <div class="nhsuk-grid-column-one-third">
        <div class="nhsuk-inset-text">
          <p>
            Rapidly gets you to an area of interest, learning pathway, or
            experience-appropriate content
          </p>
        </div>
      </div>
    </div>
    <div class="nhsuk-u-reading-width">
      <div v-if="rapid.profile">
        <h3>Profile:</h3>
        <nuxt-content :document="rapid.profile" />
      </div>
      <nuxt-content :document="rapid" />
      <hr />
      <h3 class="nhsuk-heading-l">Primary resources:</h3>
      <p class="nhsuk-tag nhsuk-tag--primary nhsuk-u-font-size-24">
        {{ duration }} minutes
      </p>
    </div>
    <Resources :links="items" :is-list="true" :selected="[]" />
    <div v-if="rapid.additionalResources.length > 0">
      <hr />
      <div
        v-for="(section, index) in rapid.additionalResources"
        :key="section.title"
      >
        <h3>{{ section.title }}</h3>
        <p class="nhsuk-tag nhsuk-tag--primary nhsuk-u-font-size-24">
          {{ additionalDurations[index] }} minutes
        </p>
        <nuxt-content
          :document="section.description"
          class="nhsuk-u-reading-width"
        />
        <Resources
          :links="additionalItems[index]"
          :is-list="true"
          :selected="[]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Resources from '../../components/Resources.vue'
export default {
  components: { Resources },
  async asyncData({ params, $content }) {
    const slug = params.slug || 'testy'
    let items
    const additionalItems = []
    let rapid
    let duration = 0
    const additionalDurations = []
    if (slug !== '') {
      rapid = await $content('rapid-access/' + slug).fetch()
      if (rapid.primaryResources && rapid.primaryResources.length > 0) {
        // const ids = rapid.primaryResources.map(r=>parseInt(r))
        const itemSet = await $content('resources').where({}).fetch()
        if (itemSet) {
          items = itemSet.items
            .filter((i) => rapid.primaryResources.includes(i.id))
            .sort((a, b) => {
              return (
                rapid.primaryResources.indexOf(a.id) -
                rapid.primaryResources.indexOf(b.id)
              )
            })

          duration = items
            .map((r) => r.duration)
            .reduce((t, c) => {
              return t + c
            }, 0)

          if (rapid.additionalResources.length > 0) {
            for (let i = 0; i < rapid.additionalResources.length; i++) {
              const ids = rapid.additionalResources[i].resources
              const sectionItems = itemSet.items
                .filter((r) => ids.includes(r.id))
                .sort((a, b) => {
                  return ids.indexOf(a.id) - ids.indexOf(b.id)
                })
              additionalItems[i] = sectionItems
              additionalDurations[i] = sectionItems
                .map((r) => r.duration)
                .reduce((t, c) => {
                  return t + c
                }, 0)
            }
          }
        }
      }
    }
    return {
      rapid,
      items,
      additionalItems,
      additionalDurations,
      duration,
    }
  },
}
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/inset-text/inset-text';
@import 'node_modules/nhsuk-frontend/packages/components/back-link/back-link';
@import 'node_modules/nhsuk-frontend/packages/components/tag/tag';
</style>
