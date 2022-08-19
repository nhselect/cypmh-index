<template>
  <ul class="nhsuk-grid-row nhsuk-card-group">
    <li
      v-for="resource in links"
      :key="resource.id"
      class="nhsuk-grid-column-full nhsuk-card-group__item"
    >
      <div
        class="nhsuk-card"
        :class="{
          starred: resource.starred,
          selected: selected.includes(resource) && !isList,
        }"
      >
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
              v-if="resource.attribution"
              class="nhsuk-body-s ltlc-attribution"
            >
              <FontAwesome icon="user-edit" size="1x" />
              <strong>
                {{ resource.attribution }}
              </strong>
            </p>
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
            <div v-if="resource.upload_date" class="ltlc-details__dateadded">
              <dt>Date added</dt>
              <dd class="nhsuk-tag nhsuk-tag--aqua-green">
                <FontAwesome icon="calendar-plus" />
                {{ formatDate(resource.upload_date) }}
              </dd>
            </div>
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
        <div v-if="!isList" class="ltlc__select-item">
          <div class="nhsuk-form-group">
            <div class="nhsuk-checkboxes__item">
              <input
                v-model="selectedItems"
                class="nhsuk-checkboxes__input"
                type="checkbox"
                :label="resource.id"
                :value="resource"
                :name="resource.id"
              />
              <label
                class="nhsuk-label nhsuk-checkboxes__label"
                :for="resource.id"
              >
                Add item to list
              </label>
            </div>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
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
  faUserEdit,
  faCalendarPlus,
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
  faUserCircle,
  faUserEdit,
  faCalendarPlus
)

Vue.component('FontAwesome', FontAwesomeIcon)

@Component
export default class Resources extends Vue {
  @Prop({ required: true }) readonly links!: IResource[]
  @Prop({ required: true }) readonly selected!: IResource[]
  @Prop({ required: true }) readonly isList!: boolean

  selectedItems: IResource[] = []

  addKeywordToFilter(keyword: string) {
    this.$root.$emit('addKeywordToFilter', keyword)
  }

  formatDate(dateToFormat: Date) {
    const formattedDate = new Date(
      Date.parse(dateToFormat.toString())
    ).toLocaleDateString()
    return formattedDate
  }

  @Watch('selectedItems')
  onSelectedItemsChanged() {
    this.$emit('update:selected', this.selectedItems)
  }

  @Watch('selected')
  onSelectedChanged() {
    this.selectedItems = this.selected
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
@import 'node_modules/nhsuk-frontend/packages/components/fieldset/fieldset';
@import 'node_modules/nhsuk-frontend/packages/components/checkboxes/checkboxes';
@import 'assets/scss/small-checkboxes';

.ltlc-resources {
  .nhsuk-grid-column-full {
    padding-left: 0;
  }
}

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

.nhsuk-card.selected {
  border: 1px solid $color_nhsuk-blue;
  background-color: lighten($color_nhsuk-blue, 60%);
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
  padding-bottom: 0 !important;
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

.ltlc-attribution {
  color: $color_nhsuk-grey-2;
}

.ltlc__select-item {
  @include nhsuk-responsive-padding(5);

  padding-top: 0 !important;
  float: right;

  .nhsuk-form-group {
    margin-bottom: 0;

    .nhsuk-checkboxes__item {
      padding: 0 40px 0 0;

      .nhsuk-checkboxes__input {
        left: auto;
        right: 0;
      }

      .nhsuk-checkboxes__label {
        &::before {
          left: auto;
          right: 0;
        }

        &::after {
          left: auto;
          right: 10px;
        }
      }
    }
  }
}
</style>
