<template>
	<div class="dropdown">
		<div
			class="active"
			:class="{selectedImg : !textOnly, 'focused' : focused}"
			@focus="getFocus($event)"
			@blur="loseFocus($event)"
			@click="showDropdown($event)"
			tabindex="0"
			@keydown.down="focusFirstItem()"
		>
			&nbsp;
			<transition name="active-fade" mode="out-in">
				<span
					v-if="!textOnly"
					:key="currentlySelected.tag"
				>
					<img :src="imagePath(currentlySelected)" :alt="currentlySelected.name" >
				</span>
				<span
					v-if="!imageOnly"
					:key="currentlySelected ? currentlySelected.tag : dropdownName"
					>
						{{currentlySelected || dropdownName}} <slot name="dropdownSymbol"></slot>
				</span>
			</transition>
			&nbsp;
		</div>
		<transition name="menu-fade">
			<div class="dropdownMenu" v-if="isDropdownVisible">
				<div v-bar>
					<ul>
						<li
							v-for="(item,index) in dropdownList"
							:key="index"
							tabindex="-1"
							@keydown.up.down.left.right.prevent="navigate(index, $event)"
							@keydown.enter="itemWasSelected(item, $event)"
							@click="itemWasSelected(item, $event)"
							@blur="hideList($event)"
							:class="{hasImage: !textOnly,
								active: keepOnclick && activeList.includes(item), 'focused': index === currentItem}"
						>
							<span v-if="!textOnly">
								<img :src="imagePath('${item.tag}tol')" :alt="item.name" />
							</span>
							<span v-if="!imageOnly">
								{{filter ? camelCaseToTitleCase(propToDisplay ? item[propToDisplay] : item) : propToDisplay ? item[propToDisplay] : item}}
							</span>
						</li>
					</ul>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	name: "Dropdown",
	props: {
		currentlySelected: {
			default: null
		},
		dropdownName: {
			type: String,
			default: ""
		},
		dropdownList: {
			required: true
		},
		imageOnly: {
			default: false
		},
		textOnly: {
			default: false
		},
		keepOnclick: {
			default: false
		},
		filter: {
			default: false
		},
		propToDisplay: {
			type: String,
			default: ""
		}
	},
	data() {
		return {
			isDropdownVisible: false,
			activeList: [],
			focused: false,
			navigating: true,
			currentItem: -1,
			wasClicked: false
		};
	},
	methods: {
		showDropdown(event) {
			this.isDropdownVisible = !this.isDropdownVisible;
		},
		itemWasSelected(item, event) {
			this.$emit("selectingItem", item);
			if (!this.keepOnclick) this.isDropdownVisible = false;
			else {
				this.activeList.includes(item)
					? this.activeList.splice(this.activeList.indexOf(item), 1)
					: this.activeList.push(item);
			}
		},
		camelCaseToTitleCase(value) {
			var newValue = value.replace(/([A-Z]+)*([A-Z][a-z])/g, "$1 $2");
			return newValue.charAt(0).toUpperCase() + newValue.slice(1);
		},
		getFocus(event) {
			this.focused = true;
			let wasClicked;
			if (
				event.relatedTarget === null ||
				event.explicitOriginalTarget.nodeName === "#text"
			)
				wasClicked = true;
			else if (
				event.relatedTarget !== null ||
				event.explicitOriginalTarget.firstChild !== null
			)
				wasClicked = false;
			this.$nextTick().then(
				() =>
					(this.isDropdownVisible = !wasClicked
						? true
						: this.isDropdownVisible)
			);
		},
		loseFocus(event) {
			this.focused = false;
			this.$nextTick().then(() => {
				if (
					event.relatedTarget !== null &&
					event.relatedTarget.nodeName === "LI"
				)
					return;
				else if (this.currentItem === -1)
					this.isDropdownVisible = false;
			});
		},
		focusFirstItem() {
			this.isDropdownVisible = true;
			this.$nextTick().then(() => {
				this.$el.querySelector("li:first-of-type").focus();
				this.currentItem = 0;
				this.navigating = true;
			});
		},
		navigate(index, event) {
			let newIndex = 0;
			let actualIndex = index + 1;
			if (event.key === "ArrowDown") {
				newIndex = this.isMainSearch
					? actualIndex + 3
					: actualIndex + 1;
			} else if (event.key === "ArrowUp") {
				newIndex = this.isMainSearch
					? actualIndex - 3
					: actualIndex - 1;
			} else if (event.key === "ArrowRight") {
				newIndex = this.isMainSearch ? actualIndex + 1 : actualIndex;
			} else if (event.key === "ArrowLeft") {
				newIndex = this.isMainSearch ? actualIndex - 1 : actualIndex;
			}
			if (
				newIndex === -1 ||
				newIndex === -2 ||
				(newIndex === 0 && (!this.isMainSearch || actualIndex === 3))
			) {
				this.$el.querySelector(".active").focus();
				return;
			}
			if (newIndex === 0 && this.isMainSearch && actualIndex !== 3)
				newIndex = this.dropdownList.length;
			if (
				newIndex === this.dropdownList.length + 1 ||
				newIndex === this.dropdownList.length + 3
			)
				newIndex = 1;
			if (this.$el.querySelector(`li:nth-of-type(${newIndex})`) === null)
				return;
			this.$el.querySelector(`li:nth-of-type(${newIndex})`).focus();
			this.currentItem = newIndex - 1;
		},
		hideList(event) {
			if (event.key === null || !event.relatedTarget === null) return;
			if (event.key === "Escape") {
				this.$el.querySelector(".active").focus();
				return;
			}
			if (
				event.relatedTarget === null ||
				event.relatedTarget.parentElement === null ||
				event.relatedTarget.parentElement.parentElement === null ||
				!event.relatedTarget.parentElement.parentElement.classList.contains(
					"dropdownMenu"
				)
			) {
				this.currentItem = -1;
				this.isDropdownVisible =
					event.relatedTarget === this.$el.querySelector(".active")
						? this.isDropdownVisible
						: false;
				return;
			}
		}
	}
};
</script>

<style lang="scss">
// @import "~@/style/websiteTheme.scss";
/*
	Transitions
*/

.active-fade-enter-active {
	transition: opacity 0.25s ease-out;
}

.active-fade-enter {
	opacity: 0.15;
}

.active-fade-leave-active {
	transition: opacity 0.3s ease-out;
	opacity: 0;
}

.menu-fade-enter-active {
	transition: opacity 0.2s ease-out;
}

.menu-fade-enter {
	opacity: 0;
}

.menu-fade-leave-active {
	transition: opacity 0.3s ease-out;
	opacity: 0;
}

/*
	Styling
*/

.dropdown {
	position: relative;
	display: flex;
	align-items: center;

	.active {
		cursor: pointer;
		border: 1px solid transparent;
		outline: none;
		width: 100%;
		max-height: 100%;
		display: flex;
		justify-content: center;

		&.focused {
			// border: 1px solid rgba($mainTextColor, 0.5);
			box-sizing: border-box;
			outline: none;
		}

		&.selectedImg {
			align-items: center;

			span {
				display: flex;
				max-height: 100%;
				align-items: center;
			}
		}
	}

	.dropdownMenu {
		position: absolute;
		top: 100%;
		width: 100%;
		text-align: center;
		border-radius: 1px;

		ul,
		li {
			list-style: none;
			margin: 0;
			padding: 0;
		}

		li {
			margin: auto;
			margin-top: 1.5%;
			cursor: pointer;
			outline: none;
			border: 1px solid transparent;
			box-sizing: border-box;

			&.focused {
				// border: 1px solid rgba($mainTextColor, 0.5);
				box-sizing: border-box;
				outline: none;
			}

			&.hasImage {
				width: 66%;
			}
		}
	}
}
</style>
