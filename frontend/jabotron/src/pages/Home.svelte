<script>
    import SoloAnalise from '../components/SoloAnalise.svelte';
    import Tempo from '../components/Tempo.svelte';
    import Umidade from '../components/Umidade.svelte';
  </script>
  
  <div class="row">
    <div class="col-md-6">
      <Tempo />
    </div>
    <div class="col-md-6">
      <SoloAnalise />
    </div>
  </div>
  <div class="row">
    <div class="col-md-4">
        <Umidade/>
    </div>

  </div>