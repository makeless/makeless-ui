export default {
  clone(obj: any): any | null {
    if (!obj) {
      return null;
    }

    return Object.assign({}, obj);
  },
};
