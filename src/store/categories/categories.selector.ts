import { createSelector } from "reselect";

import { CategoriesState } from "./categories.reducer";
import { CategoryMap } from './categories.types'

const selectCategorySlice = (state): CategoriesState => state.categories;

export const selectCategoriesInSlice = createSelector(
  [selectCategorySlice],
  (selectCategorySlice) => selectCategorySlice.categories
);

export const selectCategories = createSelector(
  [selectCategoriesInSlice],
  (categories) : CategoryMap =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;

      return acc;
    }, {} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategorySlice],
  (selectCategorySlice) => selectCategorySlice.isLoading
);

