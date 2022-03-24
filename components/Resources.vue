<template>
  <ul class="nhsuk-grid-row nhsuk-card-group">
    <li
      v-for="resource in links"
      :key="resource.id"
      class="nhsuk-grid-column-full nhsuk-card-group__item"
    >
      <div class="nhsuk-card" :class="{ starred: resource.starred }">
        <div v-if="resource.starred" class="resource__starred">
          <FontAwesome icon="star" size="xl" class="resource__starred" />
        </div>
        <div class="nhsuk-card__content ltlc-card__content">
          <div class="nhsuk-card__content-frame">
            <h3 class="nhsuk-card__heading nhsuk-heading-s">
              <a :href="resource.url" target="_blank">
                {{ resource.title }}
              </a>
            </h3>
            <p
              class="nhsuk-card__description nhsuk-body-s"
              :title="resource.description"
            >
              {{ resource.description | trimDescription }}
            </p>
            <ul class="ltlc-keywords nhsuk-body-s">
              <li v-for="keyword in resource.keywords" :key="keyword" class="">
                <a href="#" @click="addKeywordToFilter(keyword)">
                  {{ keyword }}
                </a>
              </li>
            </ul>
          </div>
          <dl class="ltlc-resource-details">
            <div v-if="resource.format != ''" class="ltlc-details__format">
              <dt>Format</dt>
              <dd class="nhsuk-tag nhsuk-tag--blue">
                <FontAwesome
                  v-if="resource.format == 'Video'"
                  icon="video"
                  size="1x"
                />
                <FontAwesome
                  v-if="resource.format == 'Audio'"
                  icon="file-audio"
                  size="1x"
                />
                <FontAwesome
                  v-if="resource.format == 'Infographic'"
                  icon="file-pdf"
                  size="1x"
                />
                <FontAwesome
                  v-if="resource.format == 'Text'"
                  icon="file-alt"
                  size="1x"
                />
                <FontAwesome
                  v-if="resource.format == 'Slides'"
                  icon="file-powerpoint"
                  size="1x"
                />
                <FontAwesome
                  v-if="resource.format == 'Website'"
                  icon="external-link-square-alt"
                  size="1x"
                />
                <FontAwesome
                  v-if="resource.format == 'Interactive'"
                  icon="hand-paper"
                  size="1x"
                />
                {{ resource.format }}
              </dd>
            </div>
            <div v-if="resource.duration > 0" class="ltlc-details__duration">
              <dt>Estimated duration</dt>
              <dd class="nhsuk-tag nhsuk-tag--grey">
                <FontAwesome icon="clock" />
                {{ resource.duration }} min
              </dd>
            </div>
            <div
              v-if="resource.lived_experience > 0"
              class="ltlc-details__duration nhsuk-body-s"
            >
              <dt>Lived Experience</dt>
              <dd class="nhsuk-tag nhsuk-tag--green">
                <FontAwesome icon="user-circle" />
                Lived Experience
              </dd>
            </div>
            <div
              v-if="resource.easy_read > 0"
              class="ltlc-details__duration nhsuk-body-s"
            >
              <dt>Easy Read</dt>
              <dd class="nhsuk-tag nhsuk-tag--green">
                <FontAwesome icon="book-reader" />
                Easy Read
              </dd>
            </div>
            <div
              v-if="resource.certifiable > 0"
              class="ltlc-details__duration nhsuk-body-s"
            >
              <dt>Certification</dt>
              <dd class="nhsuk-tag nhsuk-tag--green">
                <FontAwesome icon="graduation-cap" />
                Certification
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import {
  faVideo,
  faFileAudio,
  faFilePdf,
  faFilePowerpoint,
  faFileAlt,
  faExternalLinkSquareAlt,
  faHandPaper,
  faStar,
  faClock,
  faGraduationCap,
  faBookReader,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { IResource } from '~/interfaces'

config.autoAddCss = false

library.add(
  faVideo,
  faFileAudio,
  faFilePdf,
  faFilePowerpoint,
  faFileAlt,
  faExternalLinkSquareAlt,
  faHandPaper,
  faStar,
  faClock,
  faGraduationCap,
  faBookReader,
  faUserCircle
)

Vue.component('FontAwesome', FontAwesomeIcon)

@Component
export default class Resources extends Vue {
  @Prop({ required: true }) readonly links!: IResource[]

  addKeywordToFilter(keyword: string) {
    this.$root.$emit('addKeywordToFilter', keyword)
  }
}

Vue.filter('trimDescription', (desc: string) => {
  if (desc != null && desc.length > 0) {
    return desc.substring(0, 350).trim() + (desc.length > 350 ? '...' : '')
  }
  return ''
})
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/button/button';
@import 'node_modules/nhsuk-frontend/packages/components/card/card';
@import 'node_modules/nhsuk-frontend/packages/components/tag/tag';
@import 'node_modules/nhsuk-frontend/packages/components/details/details';

h3.nhsuk-heading-s {
  margin-bottom: 8px;
}

.nhsuk-card-group__item .nhsuk-card {
  margin-bottom: 16px;
}

.nhsuk-card__heading > small {
  font-weight: normal;
}

.nhsuk-header {
  border-bottom: 10px solid $color_nhsuk-pink;
}

.resource__starred {
  position: absolute;
  left: 3px;
  top: 6px;
  color: $color_nhsuk-orange;
}

.nhsuk-card.starred {
  border: 1px solid $color_nhsuk-orange;
}

.ltlc-keywords {
  list-style: none;
  padding: 0;
  font-weight: $nhsuk-font-bold;

  li {
    display: inline-block;
    margin-right: 12px;
    margin-bottom: 2px;
  }
}

.ltlc-card__content {
  display: flex;
  justify-content: space-between;

  .nhsuk-tag {
    margin-bottom: 0;
    // font-size: 0.75em;
  }
}

.nhsuk-card__content-frame {
  flex-grow: 1;
}

.ltlc-resource-details {
  float: right;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  margin-left: 16px;
  margin-right: -40px;
  white-space: nowrap;

  dt {
    display: none;
  }

  > div {
    margin-bottom: 4px;
  }
}

.ltlc-objectives {
  p {
    font-weight: bold;
    font-size: 0.8em;
    margin-bottom: 8px;
  }

  li {
    font-size: 0.8em;
    margin-bottom: 8px;
  }
}
</style>
