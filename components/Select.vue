<style lang="scss">
  @import '../scss/vue-select.scss';
</style>

<template>
  <div :dir="dir" class="v-select" :class="stateClasses">
    <slot name="header" v-bind="scope.header" />
    <div :id="`vs${uid}__combobox`" ref="toggle" @mousedown="toggleDropdown($event)" class="vs__dropdown-toggle" role="combobox" :aria-expanded="dropdownOpen.toString()" :aria-owns="`vs${uid}__listbox`" aria-label="Search for option">

      <div class="vs__selected-options" ref="selectedOptions">
        <slot v-for="option in selectedValue"
              name="selected-option-container"
              :option="normalizeOptionForSlot(option)"
              :deselect="deselect"
              :multiple="multiple"
              :disabled="disabled">
          <span :key="getOptionKey(option)" class="vs__selected">
            <slot name="selected-option" v-bind="normalizeOptionForSlot(option)">
              {{ getOptionLabel(option) }}
            </slot>
            <button v-if="multiple" :disabled="disabled" @click="deselect(option)" type="button" class="vs__deselect" :title="`Deselect ${getOptionLabel(option)}`" :aria-label="`Deselect ${getOptionLabel(option)}`" ref="deselectButtons">
              <component :is="childComponents.Deselect" />
            </button>
          </span>
        </slot>

        <slot name="search" v-bind="scope.search">
          <input class="vs__search" v-bind="scope.search.attributes" v-on="scope.search.events">
        </slot>
      </div>

      <div class="vs__actions" ref="actions">
        <button
          v-show="showClearButton"
          :disabled="disabled"
          @click="clearSelection"
          type="button"
          class="vs__clear"
          title="Clear Selected"
          aria-label="Clear Selected"
          ref="clearButton"
        >
          <component :is="childComponents.Deselect" />
        </button>

        <slot name="open-indicator" v-bind="scope.openIndicator">
          <component :is="childComponents.OpenIndicator" v-if="!noDrop" v-bind="scope.openIndicator.attributes"/>
        </slot>

        <slot name="spinner" v-bind="scope.spinner">
          <div class="vs__spinner" v-show="mutableLoading">Loading...</div>
        </slot>
      </div>
    </div>
    <transition :name="transition">
      <ul ref="dropdownMenu" v-if="dropdownOpen" :id="`vs${uid}__listbox`" :key="`vs${uid}__listbox`" class="vs__dropdown-menu" role="listbox" @mousedown.prevent="onMousedown" @mouseup="onMouseUp" v-append-to-body>
        <slot name="list-header" v-bind="scope.listHeader" />
        <li
          role="option"
          v-for="(option, index) in filteredOptions"
          :key="getOptionKey(option)"
          :id="`vs${uid}__option-${index}`"
          class="vs__dropdown-option"
          :class="{ 'vs__dropdown-option--selected': isOptionSelected(option), 'vs__dropdown-option--highlight': index === typeAheadPointer, 'vs__dropdown-option--disabled': !selectable(option) }"
          :aria-selected="index === typeAheadPointer ? true : null"
          @mouseover="selectable(option) ? typeAheadPointer = index : null"
          @mousedown.prevent.stop="selectable(option) ? select(option) : null"
        >
          <slot name="option" v-bind="normalizeOptionForSlot(option)">
            {{ getOptionLabel(option) }}
          </slot>
        </li>
        <li v-if="filteredOptions.length === 0" class="vs__no-options">
          <slot name="no-options" v-bind="scope.noOptions">Sorry, no matching options.</slot>
        </li>
        <slot name="list-footer" v-bind="scope.listFooter" />
      </ul>
      <ul v-else :id="`vs${uid}__listbox`" role="listbox" style="display: none; visibility: hidden;"></ul>
    </transition>
    <slot name="footer" v-bind="scope.footer" />
  </div>
</template>