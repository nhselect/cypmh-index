<template>
  <details class="nhsuk-details elect-rapidaccesslist-menu">
    <summary class="nhsuk-details__summary">
      <h2 class="nhsuk-details__summary-text">
        Rapid Access Lists <span class="nhsuk-tag nhsuk-tag--pink">New</span>
        <span class="nhsuk-body-s">
          <em>
            Rapidly gets you to an area of interest, learning pathway, or
            experience-appropriate content
          </em>
        </span>
      </h2>
    </summary>
    <div class="nhsuk-details__text nhsuk-contents-list">
      <ol
        v-for="list in lists"
        :key="list.slug"
        class="nhsuk-contents-list__list"
      >
        <li class="nhsuk-contents-list__item">
          <NuxtLink :to="'/rapid/' + list.slug">
            {{ list.title }}
          </NuxtLink>
        </li>
      </ol>
    </div>
  </details>
</template>

<script>
export default {
  data() {
    return {
      lists: [],
    }
  },
  async fetch() {
    const lists = await this.$content('rapid-access')
      .only(['title', 'slug'])
      .fetch()

    if (Array.isArray(lists)) {
      this.lists = lists
    } else {
      this.list = [lists]
    }
  },
}
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/details/details';
@import 'node_modules/nhsuk-frontend/packages/components/contents-list/contents-list';
@import 'node_modules/nhsuk-frontend/packages/components/tag/tag';
</style>
