# 퀴즈 만들기
https://vinivin153.github.io/OJT-quiz/


## 설명
- SVG와 Fabric.js를 활용해 캔버스 상에서 사용자와 상호작용할 수 있는 기능을 구현하고, 이를 바탕으로 간단한 퀴즈 게임을 제작한 프로젝트입니다.


## 기술스택
<img width="869" alt="image" src="https://github.com/user-attachments/assets/6d8f6433-53fb-461a-9f96-9009f659be8c" />


## 홈화면
![image](https://github.com/user-attachments/assets/5d2f938a-419c-4b73-a4d3-dc86a8c1adc1)
- 노트에 아이디어를 정리하며 프로젝트를 구상하던 중, 노트의 디자인이 SVG로 구현하기 간단하고 배경으로 활용하기에도 적합해 적용.


## 선택
![선택 1](https://github.com/user-attachments/assets/2d90600c-4f30-4f7c-b823-9d1131db197b)
- canvas에 동적인 애니메이션(물음표)을 적용하기 위해 다양한 방법 시도.
- 해결1(실패): FabricImage에 gif 파일 적용시 첫 프레임만 렌더링(실패).
- 해결2(미적용 - 복잡): gif를 파싱하는 라이브러리를 사용해 각 프레임을 추출하고 FabricImage에 넣고 여러차례 업데이트 시키는 방법.
- 해결3(성공): lottie 파일을 canvas에 적용하고 프레임에 맞게 렌더링(해결 2 적용).


## 드래그
![드래그 1](https://github.com/user-attachments/assets/fa2d554a-88e7-4458-b126-7036aa7ab8b1)
- threshold를 설정하고, 라인 주변인지 확인해 각 단어박스 그룹을 x축 기준으로 재정렬


## 매칭
![매칭 1](https://github.com/user-attachments/assets/c90b4837-8bff-4826-9344-4507be71f25d)
- 일대일 매칭을 유지하기 위해서, 연결된 선의 정보를 useState을 활용해 Map 객체로 관리하는 과정에서 문제.
- 문제: 이벤트 리스너를 등록하는 과정에서 해당 시점의 렉시컬 환경을 클로저로 기억해 매번 초기 상태를 참조.
- 해결1(실패): 함수형 업데이트로 react 내부적으로 최신 상태를 가져와서 적용했지만, setter 함수는 비동기적으로 동작하고 batch update를 통해 일괄적으로 처리하기 때문에 코드의 흐름을 파악하기 쉽지 않음.
- 해결2(성공): useState대신 useRef를 활용하고 이를 커스텀 훅으로 로직을 분리해 DOM을 직접 조작하다 발생할 수 있는 오류 가능성 최소화.
