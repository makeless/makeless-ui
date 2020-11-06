import {VueConstructor} from 'vue';
import StaticComponent from '../components/pages/Static.vue';

export default {
  new(name: string): VueConstructor {
    return StaticComponent.extend({
      data: () => {
        return {
          name: name,
        };
      },
    });
  },

  parse(source: string): { [key: string]: string } {
    const data: { [key: string]: string } = {};
    const regex = /\[locale:([a-z]+)]/g;
    const matches = [...source.matchAll(regex)];

    for (let i = 0; i < matches.length; i++) {
      const index: number = matches[i].index!;
      const length: number = matches[i][0].length;
      const start: number = index + length + 1;
      const locale: string = matches[i][1];

      if (i != matches.length - 1) {
        data[locale] = source.substring(start, matches[i + 1].index!);
        continue;
      }

      data[locale] = source.substring(start);
    }

    return data;
  },
};