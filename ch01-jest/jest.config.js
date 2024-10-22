/** @type {import('ts-jest').JestConfigWithTsJest} **/
// ts-jest를 사용한 Jest 설정의 타입 정의를 지정합니다.
module.exports = {
  preset: 'ts-jest',                // Jest가 TypeScript 파일을 처리하도록 ts-jest 프리셋을 설정합니다.
  testEnvironment: "node",          // 테스트가 Node.js 환경에서 실행되도록 설정합니다.
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}], // .ts 및 .tsx 파일을 ts-jest로 변환합니다. 정규식을 통해 해당 파일 확장자를 매칭합니다.
  },
};