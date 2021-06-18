<script>
  import Header from "./layout/Header.svelte";
  import Footer from "./layout/Footer.svelte";
  let name = "world";
  let age = 38;

  //바인드
  function assign() {
    name = "woong";
    age = 39;
  }

  let toggle = false;

  //조건문 예시
  if (toggle) {
  } else {
  }

  //반복문 예시
  let fruits = ["Apple", "Banana", "Cherry", "Orange", "Mango"];

  function deleteFruit() {
    fruits = fruits.slice(1);
  }
</script>


<main>
  <h1>Hello {name}!</h1>
  <p>{age}</p>
  <img src="" alt={name} />
  <!-- bind: 양방향 -->
  <input type="text" bind:value={name} />
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
  <ul>
    {#each fruits as fruit}
      <li>{fruit}</li>
    {/each}
  </ul>
  <button on:click={deleteFruit}> Eat it!! </button>
</main>
<Footer />

<style lang="scss">
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
    min-height: 740px;

    p {
      border: 1px solid;
    }
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
