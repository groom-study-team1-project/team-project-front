# 컴포넌트 구조

- **Common Components**: 여러 곳에서 재사용되는 공통 컴포넌트들 (e.g., 버튼, 입력 필드 등)
- **Feature-Specific Components**: 특정 기능이나 페이지에만 사용되는 컴포넌트들
- **Layout Components**: 페이지 레이아웃을 구성하는 컴포넌트들 (e.g., Header, Footer, Sidebar 등)
- **Pages**: 각 페이지별로 사용되는 컴포넌트들을 해당 페이지 폴더 안에 넣어 관리

# 브랜치 전략

## Format

`branch-type/#issue-id`

## Rule

- 적절한 브랜치 생성
- 작업 후 해당 브랜치를 생성했던 브랜치로 PR
- 작업 완료된 브랜치는 삭제

## Branch Type - Github Flow

![image](https://github.com/dnd-side-project/dnd-10th-9-backend/assets/50333168/1dc87948-57cf-4b1e-94ab-13c691c2cf76)

- `main` : 제품 배포
- `feat` : 기능 개발
- `fix` : 버그 수정

# 커밋 메시지

| 타입     | 설명                                                         |
| -------- | ------------------------------------------------------------ |
| feat     | (#이슈번호) 새로운 기능 추가                                 |
| fix      | (#이슈번호) 버그 수정                                        |
| docs     | (#이슈번호) 문서 수정                                        |
| style    | (#이슈번호) 공백, 세미콜론 등 스타일 수정                    |
| refactor | (#이슈번호) 코드 리팩토링                                    |
| perf     | (#이슈번호) 성능 개선                                        |
| test     | (#이슈번호) 테스트 추가                                      |
| chore    | (#이슈번호) 빌드 과정 또는 보조 기능(문서 생성 기능 등) 수정 |
| design   | (#이슈번호) 기능 수정 없이 스타일(CSS)만 수정                |

## Example

```
git commit -am 'feat (#189) : 게시판 작성 기능 구현'
```
