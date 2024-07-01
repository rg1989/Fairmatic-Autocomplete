<template>
  <div class="autocomplete">
    <v-text-field
      ref="searchInputField"
      class="input"
      type="text"
      v-model="searchInput"
      prepend-inner-icon="mdi-magnify"
      single-line
      placeholder="Fairmatic"
      @input="handleChange"
      hide-details
    />
    <ul v-if="!isLoading" class="dropdown" :class="{ dropdownHidden: isDropdownHidden }">
      <li
        v-for="item in filteredData"
        :key="item"
        class="result_item pointer"
        @click="itemSelect(item)"
      >
        <span v-html="highlightedName(item)"></span>
      </li>
    </ul>
    <ul class="loader" v-if="isLoading">
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted, computed, nextTick } from "vue";

export default {
  name: "Autocomplete",
  props: {
    filteredData: {
      type: Object,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const searchInput = ref("");
    const searchInputField = ref(null);
    const isDropdownHidden = computed(() => props.filteredData.length === 0);

    onMounted(async () => {
      await nextTick();
      searchInputField.value.focus();
    });

    const handleChange = () => {
      emit("inputChange", searchInput.value);
    };

    const itemSelect = (item) => {
      searchInput.value = item + " ";
      emit("itemSelect", item);
    };

    const categorySelect = (category) => {
      emit("categorySelect", category);
    };
    const highlightedName = (name) => {
      if (!name) return name;
      //only take last word of the string for the search as required:
      const words = searchInput.value.trim().split(/\s+/);
      const last_word = words.length ? words[words.length - 1] : "";

      const index = name.toLowerCase().indexOf(last_word);
      if (index === -1) return name;
      const highlighted =
        name.slice(0, index) +
        "<mark>" +
        name.slice(index, index + last_word.length) +
        "</mark>" +
        name.slice(index + last_word.length);
      return highlighted;
    };

    return {
      searchInput,
      handleChange,
      itemSelect,
      categorySelect,
      isDropdownHidden,
      highlightedName,
      searchInputField,
    };
  },
};
</script>

<style scoped>
.autocomplete {
  width: 30%;
  margin: auto;
}
.input {
  width: 100%;
}

.dropdown {
  background-color: #e4f5fc;
  border: 1px solid #ccc;
  padding: 0.5rem;
}
.dropdownHidden {
  display: none;
}

.category {
  font-weight: bold;
}

ul {
  list-style-type: none;
  padding: 0;
}

.pointer {
  cursor: pointer;
}

.result_item:hover {
  background-color: #a9d4df;
}
.show_more_item {
  text-align: right;
  font-weight: bold;
}
.show_more_item:hover {
  background-color: #a9d4df;
}
.loader {
  text-align: center;
}
mark {
  background-color: yellow;
}
</style>
