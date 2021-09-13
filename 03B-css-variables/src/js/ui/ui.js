/**
 * @param {Object} cssVars
 */
export const setRootVariables = (cssVars) => {
  for (const variable in cssVars) {
    document.documentElement.style.setProperty(variable, cssVars[variable]);
  }
};
