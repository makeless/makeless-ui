<template>
    <master>
        <template slot="page">
            <b-container>
                <b-row>
                    <b-col>
                        <div class="text-center" v-if="loading">
                            <b-spinner class="text-center" v-if="loading"></b-spinner>
                        </div>
                        <vue-markdown v-else :source="source[$makeless.getI18n().getLocale()]"></vue-markdown>
                    </b-col>
                </b-row>
            </b-container>
        </template>
    </master>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import VueMarkdown from 'vue-markdown';
import StaticPageUtil from '../../utils/static-page';

@Component({
  name: 'Static',
  components: {
    VueMarkdown,
  },
})
export default class Static extends Vue {
  public name!: string;
  private source: { [key: string]: string } = {};
  private loading: boolean = false;

  mounted() {
    this.loading = true;

    this.$makeless.getHttp().get(`/${this.name}.md`, {baseURL: ''}).then((data) => {
      this.source = StaticPageUtil.parse(data.data);
      this.loading = false;
    });
  }
}
</script>
