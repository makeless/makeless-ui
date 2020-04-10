<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class UserLoaded extends Vue {
  public isUserLoaded: boolean = false;

  mounted() {
    window.addEventListener('user-loaded', () => {
      this.isUserLoaded = true;
    });
  }
}
</script>
