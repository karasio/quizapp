<template>
    <div>
        <b-dropdown :text="this.category.name" id="quizcats" >
            <b-dropdown-item-button
                    v-for="category in categories"
                    :key="category.id"
                    @click.prevent="getChosenCategory(category)"
            >
                {{  category.name }}
            </b-dropdown-item-button>
        </b-dropdown>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'CategoryDropdown',
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters([
      'categories',
      'category',
    ]),
  },
  methods: {
    getChosenCategory(category) {
      this.fillCategory(category);
    },
    ...mapActions([
      'fillCategory',
    ]),
  },
};
</script>

<style>
    #quizcats {
        margin-bottom: 1rem;
    }
</style>
