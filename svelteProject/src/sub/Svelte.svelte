<script>

</script>

 <main>
    <section id="container">
        <section>
            <h2>Svelte</h2>
            <h3>Svelte 특징</h3>
            <article class="explanation-box">
                <ol>
                    <li>
                        <p>Diffing 이나  Overhead 가 일어나지 않아 처리속도 가 빠르다.</p>
                        <ul>
                            <li>diffing : "가상돔(Virtual DOM)"을 생성하고 비교하는 행위</li>
                            <li>Overhead : 어떤 처리를 위해 들어가는, 간접적인 시간이나 메모리</li>
                        </ul>
                    </li>
                    <li>애플리케이션 상태의 변화가 DOM에 자동으로 반영 (반응성)</li>
                </ol>
            </article>
            <h3>Svelte 단점</h3>
            <article class="explanation-box">
                <ul>
                    <li>작은 생태계 (2019년 4월 3릴리즈)</li>
                    <li>runtime으로 동작하지 않기 때문에 CDN 미제공</li>
                    <li>IE 미지원</li>
                </ul>
            </article>
            <h3>Svelte 명령어</h3>
            <table class="default-table">
                <colgroup>
                    <col style="width: 25%" />
                    <col style="width: 75%" />
                </colgroup>
                <tbody>
                    <tr>
                        <th scope="row">npx degit sveltejs/template [프로젝트명]</th>
                        <td>프로젝트 생성및 설치</td>
                    </tr>
                    <tr>
                        <th scope="row">code .</th>
                        <td>현재 프로젝트 열기</td>
                    </tr>
                    <tr>
                        <th scope="row">npm i</th>
                        <td>프로젝트 모듈 설치</td>
                    </tr>
                    <tr>
                        <th scope="row">npm run dev</th>
                        <td>프로젝트 실행</td>
                    </tr>
                </tbody>
            </table>
            <h3>선언적 랜더링</h3>
            <table class="default-table">
                <colgroup>
                    <col style="width: 25%" />
                    <col style="width: 75%" />
                </colgroup>
                <tbody>
                    <tr>
                        <th scope="row">바인딩(One-way)</th>
                        <td>&lt; input type="text" value=<span class="bold">{name}</span> /&gt; </td>
                    </tr>
                    <tr>
                        <th scope="row">바인딩(Bidirectional)</th> 
                        <td>&lt; input type="text" <span class="bold">bind:</span>value={name} /&gt; </td>
                    </tr>
                </tbody>
            </table>
        </section>
    </section>
</main>

<style lang="scss">
    body, table, div, p {
        font-family:'Nanum Gothic';
        font-size: 16px;
    }

    /* H tag */
    h1{
        font-size: 32px;
    }
    h2{
        margin-bottom: 15px;
        padding: 15px 0;
        border-bottom: 2px solid $black;

        font: {
            size: 30px;
            weight: 600;
        }
    }
    h3{
        display: inline-block;
        margin: 5px 0;
        padding: 10px 20px;
        background: $h3;
        font-size: 18px;
        color: $white;
    }
    h4{
        font-size: 26px;
    }
    h5{
        font-size: 24px;
    }
    h6{
        font-size: 22px;
    }

    ol{
        position: relative;
        left: 30px;
        list-style: decimal-leading-zero;  
    }

    xmp,
    .explanation-box{
        margin: 15px 0;
        padding: 10px 20px;
        border: 1px solid;
        width: 100%;
        box-sizing: border-box;
    }

    .bold{font-weight: 900;color: brown;}

/* Table */
.default-table{
    margin-top: 15px;
    margin-bottom: 20px;
    border: 1px solid;
    width: 100%;

    tr{
        th, td{
            padding: 10px;
            border: 1px solid;
            vertical-align: middle;
            white-space: nowrap;
        }

        th{
            background: $gray;
            font-weight: 400;
        }
    }
}
</style>