<script>
  export let name;
  let age = 38;

  //바인드
  function assign() {
    name = "woong";
    age = 39;
  }

  let toggle = false;

  //조건문
  if (toggle) {
  } else {
  }
</script>

<main>
  <h1>Hello {name}!</h1>
  <p>{age}</p>
  <img src="" alt={name} />
  <input type="text" bind:value={name} />
  <!-- bind: 양방향 -->
  <button on:click={assign}> Assign </button>
  <button
    on:click={() => {
      toggle = !toggle;
    }}
  >
    Toggle
  </button>
  {#if toggle}
    <div>Hello {name}!</div>
  {:else}
    <div>No name!!</div>
  {/if}
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
