import { createSelector } from "reselect";

const selectCategorySlice = (state) => state.categories;

export const selectCategoriesInSlice = createSelector(
  [selectCategorySlice],
  (selectCategorySlice) => selectCategorySlice.categories
);

export const selectCategories = createSelector(
  [selectCategoriesInSlice],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;

      return acc;
    }, {})
);
