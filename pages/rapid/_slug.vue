<template>
  <div>
    <h1>{{ rapid.title }}</h1>
    <nuxt-content :document="rapid" />
    <Resources :links="items" :is-list="true" />
  </div>
</template>

<script>
import Resources from '../../components/Resources.vue'
export default {
  components: { Resources },
  async asyncData({ params, $content }) {
    const slug = params.slug || ''
    let rapid, items
    if (slug !== '') {
      rapid = await $content('rapid-access/' + slug).fetch()
      if (rapid.resources.length > 0) {
        items = await $content('resources').where({
          id: {
            $in: rapid.resources,
          },
        })
      }
    }
    return { rapid, items }
  },
}
</script>
