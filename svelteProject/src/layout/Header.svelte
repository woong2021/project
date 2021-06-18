<script>

</script>
<header>
    <section>
        <h1><a href="">What to do!?</a></h1>
        <nav id="menuList">
            <div><a href="">Svelte 1</a></div>
            <div><a href="">Svelte 2</a></div>
            <div><a href="">Svelte 3</a></div>
            <div><a href="">Svelte 4</a></div>
            <div><a href="">Svelte 5</a></div>
            <div><a href="">Svelte 6</a></div>
            <div><a href="">Svelte 7</a></div>
        </nav>
    </section>
</header>
<style lang="scss">
/* Header */
header {
    position: sticky;
    border: 1px solid;
    background: white;
    top: 0;
    height: 100px;

    section{
        margin: 0 auto;
        width: 1000px;
        height: 100px;
        line-height: 100px;

        h1{
            display:inline-block;
        }
        nav{
            &#menuList{
                display:flex;
                width: 70%;
                float: right;
    
                div{
                    width: 120px;
                    text-align: center;
                }
            }
        }

        aside{
            &.Quick{
                position: fixed;
                border: 1px solid;
                width: 100px;
                height: 200px;
                bottom: 0;
                right: 0;
            }
        }
    }
}
</style>