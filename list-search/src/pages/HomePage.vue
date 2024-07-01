<template>
  <div>
    <h1 class="display-1">Autocomplete:</h1>
    <Autocomplete
      ref="autocompleteRef"
      :filteredData="searchResults"
      :isLoading="isLoading"
      @inputChange="inputChange"
      @itemSelect="itemSelect"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import Autocomplete from "../components/CustomAutocomplete.vue";
import { debounce } from "lodash";
import { useStore } from "vuex";

export default {
  name: "HomePage",
  components: {
    Autocomplete,
  },
  setup() {
    const isLoading = ref(false);
    const searchResults = ref([]);

    const store = useStore();

    const inputChange = async (inputValue) => {
      updateResults(inputValue);
    };

    const itemSelect = (selectedValue) => {
      updateResults(selectedValue);
    };

    const updateResults = async (inputValue) => {
      if (inputValue.length > 0) {
        isLoading.value = true;
        //only take last word of the string for the search as required:
        const words = inputValue.trim().split(/\s+/);
        const last_word = words.length ? words[words.length - 1] : "";

        const newResults = await store.dispatch("fetchSuggestions", last_word);
        if (newResults?.length > 0) {
          searchResults.value = newResults;
        } else {
          searchResults.value = [];
        }
        isLoading.value = false;
      } else {
        searchResults.value = [];
      }
    };

    const debouncedInputChange = debounce(inputChange, 200);

    return {
      isLoading,
      searchResults,
      inputChange: debouncedInputChange,
      itemSelect,
    };
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}
</style>
