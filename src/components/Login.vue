<template>
  <div class="bg-lightgrey height-100 width-100">
    <vs-row
      vs-justify="center"
      vs-align="center"
      class="height-100"
    >
      <vs-col
        vs-w="12"
        class="fixed-width-300 background-white p-20 border-radius-8"
      >
        <vs-row class="pb-10">
          <vs-input
            v-model="employeeID"
            label="Enter Employee ID"
            class="width-100"
          />
          <span
            v-if="errorMessage"
            class="text-danger font-small"
          >
            {{ errorMessage }}
          </span>
        </vs-row>
        <vs-row vs-justify="center">
          <vs-button
            class="width-100 pv-7"
            :disabled="! isValid"
            @click="login()"
          >
            <span class="test-login">
              Login
            </span>
          </vs-button>
        </vs-row>
        <vs-row>
          <div class="font-medium pt-10">
            Don't have an account?
            <span
              class="text-underline pointer-cursor ph-3 hover:text-primary test-goto-register"
              @click="goToRegister"
            >
              Register
            </span>
          </div>
        </vs-row>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
  import employeeMixin from '../mixins/employeeMixin';
  import { EventBus } from '../eventBus';

  export default {
    name: 'Login',
    mixins: [employeeMixin],
    data: function () {
      return {
        employeeID: null,
        errorMessage: '',
        existingEmployees: [],
      };
    },
    computed: {
      isValid: function () {
        let pattern = /^[1-9]\d{5}$/;
        return pattern.test(this.employeeID);
      }
    },
    mounted () {
      this.existingEmployees = this.deepCopy(this.getEmployees());
    },
    methods: {
      login: function () {
        if(this.existingEmployees.indexOf(this.employeeID) > -1) {
          EventBus.$emit('set-logged-in', this.employeeID);
          this.routeTo('LandingPage');
        } else {
          this.errorMessage = 'Please register yourself';
        }
      },
      goToRegister: function () {
        this.routeTo('Register');
      }
    }
  };
</script>
