export default {
  removeFocus(): void {
    if (document.activeElement !== undefined) {
      const element = document.activeElement as HTMLElement;
      element.blur();
    }
  },
};
