# party-matching-app-test

### Member

- 권민재
- 김세연
- 김혜주
- 최재원

## Git 브랜치 전략

<details>
<summary>자세히 보기</summary>
<div markdown="1">
    <a href="https://techblog.woowahan.com/2553/">참고) 우아한 형제들 기술 블로그 - 우린 Git-flow를 사용하고 있어요</a>
    <p>
      <div>모든 브랜치는 각 issue 번호를 기준으로 <code>[branch name]-[issue number]/example</code>의 형식으로 작성
      </div>
      <div>Ex) <code>feature-2/example</code></div>
    <ul>
        <li><code>main</code> : 배포시 사용하는 브랜치. 모든 버그 수정 시 배포</li>
        <li><code>develop</code> : 다음 출시 버전을 개발하는 브랜치<ul>
                <li>다음 릴리즈를 위해 언제든 배포될 수 있는 상태</li>
                <li>하나의 기능 구현이 끝나면, develop 브랜치로 병합할 것</li>
            </ul>
        </li>
        <li><code>feature</code> : 기능을 개발하는 브랜치<ul>
                <li>기능을 완성할 때 까지 유지하며, 완성시 <code>develop</code>브랜치로 merge</li>
            </ul>
        </li>
        <li><code>release</code> : 릴리즈를 준비하는 브랜치(QA)</li>
        <li><code>hotfix</code> : 배포 버전에서 생긴 문제로 긴급한 트러블 슈팅이 필요할 때 개발이 진행되는 브랜치</li>
    </ul>
    <p align="center">
        <img src="https://user-images.githubusercontent.com/46064193/124911385-a74b2c00-e027-11eb-982d-a96e6c40d5b3.png" alt="Branch Strategy" width="500">
    </p>
</div>

</details>

## Commit Message 컨벤션

<details>
<summary>자세히 보기</summary>
<div markdown="1">
    <ul>
        <li><code>Add</code> : 클래스, 설정파일 등의 새로운 파일 추가</li>
        <li><code>Feat</code> : 새로운 기능 추가</li>
        <li><code>Docs</code> : 문서 수정</li>
        <li><code>Test</code> : 테스트 코드 작성</li>
        <li><code>Chore</code> : 기타 변경 사항(빌드 스크립트 수정 등)</li>
        <li><code>Fix</code> : 올바르지 않은 코드를 고친 경우</li>
        <li><code>Update</code> : 수정, 추가, 보완(주로 코드가 아닌 버전 업데이트)</li>
        <li><code>Refactor</code> : 코드의 리팩토링</li>
        <li><code>Remove</code> : 코드의 삭제</li>
    </ul>
    ex) Feat: jwt 토큰 발행 기능
</div>
</details>

## Code Convention

### Naming

<div>
  <ul>
    <li>직관적으로 의미를 파악할 수 있도록 이름을 짓습니다 (약어 금지)</li>
    <li>변수 및 함수명은 camelCase를 사용합니다.</li>
    <li>배열의 경우 접미사로 list를 붙입니다.</li>
    <li>private 변수는 _ 를 접두사로 선언합니다.</li>
    <li>props로 전달되는 핸들러 함수는 on으로 시작합니다.</li>
    <li>동사와 명사가 함께 쓰이는 경우 동사 + 명사 형식으로 작성합니다.</li>
    <li>컴포넌트는 항상 PascalCase로 선언합니다.</li>
    <li>inline style은 가능한 지양합니다.</li>
  </ul>
</div>

# Tech Stack

<div>
  <ul>
    <li>chore: React Native</li>
    <li>styling: styled-component</li>
    <li>package manager: npm</li>
  </ul>
</div>
