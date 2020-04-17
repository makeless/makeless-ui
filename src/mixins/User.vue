<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class User extends Vue {
  public userLoaded: boolean = false;

  created() {
    this.userLoaded = this.$saas.getSecurity().getUser() !== null;

    window.addEventListener('user-loaded', () => {
      this.userLoaded = true;
    });
  }
}
</script>
