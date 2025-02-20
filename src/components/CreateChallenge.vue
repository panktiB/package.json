<template>
  <vs-popup
    title="Create Challenge"
    :active.sync="showPopup"
    icon-pack="fa5"
    icon-close="fas fa-times"
    class="create-challenge-container"
  >
    <div>
      <vs-row
        v-for="input in inputs"
        :key="input['name']"
        class="pb-5"
      >
        <component
          :is="inputMapping[input['type']]"
          v-if="input['type'] === 'text'"
          v-model="challenge[input['name']]"
          :label="input['label']"
          class="width-100"
        />
        <vs-select
          v-else
          v-model="challenge[input['name']]"
          icon-pack="fa5"
          icon="fas fa-angle-down"
          :label="input['label']"
          class="width-100"
        >
          <vs-select-item
            v-for="option in input['options']"
            :key="option"
            :text="option"
            :value="option"
          />
        </vs-select>
      </vs-row>
      <vs-row
        class="pt-5"
        vs-align="center"
      >
        <vs-col
          vs-w="8"
          class="text-danger font-smaller"
        >
          {{ error }}
        </vs-col>
        <vs-col
          vs-w="4"
          vs-type="flex"
          vs-justify="flex-end"
        >
          <vs-button
            type="border"
            :disabled="! isValid"
            class="pv-5 ph-8"
            @click="createChallenge"
          >
            Create
          </vs-button>
        </vs-col>
      </vs-row>
    </div>
  </vs-popup>
</template>

<script>
  import challengeMixin from '../mixins/challengeMixin';

  export default {
    name: 'CreateChallenge',
    mixins: [challengeMixin],
    props: {
      show: {
        type: Boolean,
        default: false
      },
      baseChallenge: {
        type: Object,
        default: null,
      }
    },
    data: function () {
      return {
        showPopup: false,
        challenge: {},
        inputs: [
          {
            name: 'name',
            label: 'Name',
            value: 'name',
            type: 'text'
          },
          {
            name: 'description',
            label: 'Description',
            value: 'description',
            type: 'text'
          },
          {
            name: 'tags',
            label: 'Tags',
            value: 'tags',
            type: 'select',
            options: []
          }
        ],
        inputMapping: {
          'text': 'vs-input',
          'select': 'vs-select'
        },
        error: '',
      };
    },
    computed: {
      isValid: function () {
        if(this.challenge && Object.keys(this.challenge).length) {
          let validationFields = ['name', 'description', 'tags'];
          return validationFields.every(field => {
            return !! this.challenge[field].length;
          });
        } else {
          return false;
        }
      }
    },
    watch: {
      show: {
        immediate: true,
        handler: function() {
          this.showPopup = this.show;
        }
      },
      showPopup: function () {
        if(! this.showPopup) {
          this.$emit('close');
        }
      },
      baseChallenge: {
        immediate: true,
        deep: true,
        handler: function () {
          this.challenge = this.baseChallenge;
        }
      }
    },
    beforeMount () {
      let tagInput = this.inputs.find(input => input['name'] === 'tags');
      tagInput['options'] = this.getExistingTags();
    },
    methods: {
      createChallenge: function () {
        if(this.validateChallenge(this.challenge)) {
          this.error = '';
          this.$emit('create-challenge', this.challenge);
        } else {
          this.error = 'Name already exists. Please rename challenge';
        }
      },
      validateChallenge: function (challenge) {
        let existingChallenges = this.getChallenges().map(challenge => {
          return challenge['name'].toLowerCase();
        });
        return existingChallenges.indexOf(challenge['name'].toLowerCase()) === -1;
      },
    }
  };
</script>

<style lang="scss">
  .create-challenge-container {
    .vs-popup {
      width: 400px;
      .vs-popup--header {
        height: 30px;
        .vs-popup--title {
          h3 {
            font-size: 16px;
            padding-top: 0;
            padding-bottom: 0;
          }
        }
        .vs-icon {
          padding: 5px;
          font-size: 15px;
        }
      }

      .vs-popup--content {
        margin: 0;
        overflow-x: hidden;
      }
    }
  }
</style>
