/* eslint-disable react-refresh/only-export-components */
import React from 'react';

const LanguageTransitionContext = React.createContext({
  startLanguageTransition: () => {},
  finishLanguageTransition: () => {},
});

export const LanguageTransitionProvider = LanguageTransitionContext.Provider;

export function useLanguageTransition() {
  return React.useContext(LanguageTransitionContext);
}
